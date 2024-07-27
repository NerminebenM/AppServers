package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.enumeration.Status;
import com.bezkoder.springjwt.models.RecentActivity;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.repository.RecentActivityRepo;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.security.AuthenticationFacade;
import com.bezkoder.springjwt.security.services.NotificationService;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import com.bezkoder.springjwt.security.services.ServerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.NetworkIF;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import static com.bezkoder.springjwt.enumeration.Status.SERVER_DOWN;
import static com.bezkoder.springjwt.enumeration.Status.SERVER_UP;
import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public  class ServerServiceImpl implements ServerService {
    @Autowired
    private ServerRepo serverRepo;
    @Autowired
    private RecentActivityRepo recentActivityRepo;

    @Autowired
    private ServerHistoryService serverHistoryService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthenticationFacade authenticationFacade;
    private static final int MAX_PING_FAILURES = 5;
    private final Map<Long, Integer> pingFailuresMap = new ConcurrentHashMap<>();


    /* @Value("${email.recipient}")
     private String emailRecipient;

     @Value("${email.host}")
     private String smtpHost;

     @Value("${email.port}")
     private int smtpPort;

     @Value("${email.username}")
     private String emailUsername;

     @Value("${email.password}")
     private String emailPassword;
 */
    private Status previousStatus;

    /* protected PasswordAuthentication getPasswordAuthentication() {
         return new PasswordAuthentication(emailUsername, emailPassword);
     }*/
    private void saveRecentActivity(String description) {
        RecentActivity recentActivity = new RecentActivity();
        recentActivity.setDescription(description);
        recentActivity.setTimestamp(LocalDateTime.now());
        recentActivityRepo.save(recentActivity);
    }
    @Override
    public Server create(Server server) {
       /* if (!authenticationFacade.isAdmin()) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à créer un serveur");
        }*/
        log.info("Saving new server: {}", server.getName());
        server.setImageUrl(setServerImageUrl());
        Server savedServer = serverRepo.save(server);


        ServerHistory historyEntry = new ServerHistory();
        historyEntry.setServer(savedServer);
        historyEntry.setDescription("Server created");
        historyEntry.setModificationTime(LocalDateTime.now());
        serverHistoryService.addHistoryEntry(historyEntry);
        saveRecentActivity("Server created: " + server.getName());
        notificationService.sendNotification("New Server Added", "A new server named " + server.getName() + " has been added.");

        return savedServer;
    }
    @Override
    public List<RecentActivity> getRecentActivities() {
        return recentActivityRepo.findAll();
    }
    @Override
    public List<ServerHistory> getServerHistory(Long serverId) {
        Server server = serverRepo.findById(serverId).orElseThrow(() -> new IllegalArgumentException("Server not found"));
        return server.getHistory();
    }

    @Override
    public Map<String, Object> getServerStatistics() {
        List<Server> servers = serverRepo.findAll();
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalServers", servers.size());
        stats.put("averageCpuUsage", servers.stream().mapToDouble(Server::getCpuUsage).average().orElse(0));
        stats.put("averageMemoryUsage", servers.stream().mapToDouble(Server::getMemoryUsage).average().orElse(0));
        stats.put("totalNetworkBandwidth", servers.stream().mapToDouble(Server::getNetworkBandwidth).sum());
        return stats;
    }
    @SneakyThrows
    @Override
    public Server ping(String address) throws IOException {
        log.info("Pinging server: {}", address);
        Server server = serverRepo.findByIpAddress(address);
        if (server == null) {
            server = serverRepo.findByDomain(address);
        }

        if (server == null) {
            throw new IllegalArgumentException("Server with IP or domain " + address + " not found");
        }

        InetAddress inetAddress = InetAddress.getByName(address);
        Status currentStatus = inetAddress.isReachable(10000) ? SERVER_UP : SERVER_DOWN;

        if (server.getStatus() != currentStatus) {
            ServerHistory historyEntry = new ServerHistory();
            historyEntry.setServer(server);
            historyEntry.setPreviousStatus(server.getStatus());
            historyEntry.setCurrentStatus(currentStatus);
            historyEntry.setDescription("Server status changed");
            historyEntry.setModificationTime(LocalDateTime.now());
            serverHistoryService.addHistoryEntry(historyEntry);

            pingFailuresMap.put(server.getId(), 0); // Reset ping failures on status change
        } else if (currentStatus == SERVER_DOWN) {
            pingFailuresMap.put(server.getId(), pingFailuresMap.getOrDefault(server.getId(), 0) + 1); // Increment ping failures on failure
            if (pingFailuresMap.get(server.getId()) >= MAX_PING_FAILURES) {
                notificationService.sendNotification("Server Down", "Server " + server.getName() + " has been down for " + MAX_PING_FAILURES + " consecutive pings.");
                pingFailuresMap.put(server.getId(), 0); // Reset after sending notification
            }
        } else {
            pingFailuresMap.put(server.getId(), 0); // Reset ping failures on success
        }

        SystemInfo si = new SystemInfo();
        CentralProcessor processor = si.getHardware().getProcessor();
        GlobalMemory memory = si.getHardware().getMemory();
        List<NetworkIF> networkIFs = si.getHardware().getNetworkIFs();

        long[] prevTicks = processor.getSystemCpuLoadTicks();
        double cpuLoad = processor.getSystemCpuLoadBetweenTicks(prevTicks) * 100;
        long totalMemory = memory.getTotal();
        long availableMemory = memory.getAvailable();
        double memoryUsage = ((double) (totalMemory - availableMemory) / totalMemory) * 100;

        double totalBandwidth = 0;
        for (NetworkIF net : networkIFs) {
            totalBandwidth += net.getSpeed();
        }

        server.setCpuUsage(cpuLoad);
        server.setMemoryUsage(memoryUsage);
        server.setNetworkBandwidth(totalBandwidth);

        server.setStatus(currentStatus);
        serverRepo.save(server);

        return server;
    }

    @Override
    public List<Server> list(int limit) {
        log.info("Fetching all servers");
        return serverRepo.findAll(of(0, limit)).toList();
    }

    /*  @Override
      public Collection<Server> list(int limit) {
          log.info("Fetching all servers");
          return serverRepo.findAll(of(0, limit)).toList();
      }
  */
   /*public List<Server> getAllServer(){
        return serverRepo.findAll();
    }*/
    @Override
    public Server get(Long id) {
        log.info("Fetching server by id: {}", id);
        return serverRepo.findById(id).orElse(null);
    }

    @Override
    public Server update(Server server) {
        // if (!authenticationFacade.isAdmin()) {
        //   throw new AccessDeniedException("Vous n'êtes pas autorisé à mettre à jour un serveur");
        // }

        log.info("Updating server: {}", server.getName());

        Server updatedServer = serverRepo.save(server);

        // Enregistrer l'historique de mise à jour
        ServerHistory historyEntry = new ServerHistory();
        historyEntry.setServer(updatedServer);
        historyEntry.setDescription("Server updated");
        historyEntry.setModificationTime(LocalDateTime.now());
        serverHistoryService.addHistoryEntry(historyEntry);
        saveRecentActivity("Server updated: " + server.getName());

        return updatedServer;
    }

    @Override
    public Boolean delete(Long id) {
       /* if (!authenticationFacade.isAdmin()) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à supprimer un serveur");
        }*/

        log.info("Deleting server By ID: {}", id);
        saveRecentActivity("Server deleted: ID " + id);

        serverRepo.deleteById(id);
        return TRUE;
    }

    @Override
    public Long countTotalServers() {
        log.info("Counting total servers");
        return serverRepo.count();
    }

    @Override
    public Long countServersByStatus(String status) {
        log.info("Counting servers with status: {}", status);
        Status serverStatus = Status.valueOf(status);
        return serverRepo.countByStatus(serverStatus);
    }

    private String setServerImageUrl() {
        String[] imageNames = {""};
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/server/image/" + imageNames[new Random().nextInt(imageNames.length)]).toUriString();
    }

    private boolean isReachable(String ipAddress, int port, int timeOut) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(ipAddress, port), timeOut);
            return true;
        } catch (IOException exception) {
            return false;
        }
    }

   /* public void sendAlertEmail(String subject, String body) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.port", smtpPort);

        javax.mail.Session session = javax.mail.Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailUsername, emailPassword);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(emailUsername));
            message.setRecipient(RecipientType.TO, new InternetAddress(emailRecipient));
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            log.info("Alert email sent successfully to {}", emailRecipient);
        } catch (MessagingException e) {
            log.error("Error sending alert email", e);
        }
    }*/
}
