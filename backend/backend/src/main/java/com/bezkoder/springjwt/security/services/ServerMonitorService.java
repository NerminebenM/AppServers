package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;
import java.util.List;

@Service
@Slf4j
public class ServerMonitorService {

    private final ServerRepo serverRepo;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    public ServerMonitorService(ServerRepo serverRepo, UserRepository userRepository, NotificationService notificationService) {
        this.serverRepo = serverRepo;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(fixedRate = 600000000) // Vérifie toutes les 60 secondes
    public void checkServers() {
        List<Server> servers = serverRepo.findAll();
        for (Server server : servers) {
            try {
                if (!isReachable(server.getIpAddress())) {
                    if (!server.isAlertSent()) {
                        //sendAlert(server);
                        server.setAlertSent(true);
                        serverRepo.save(server);
                    }
                } else {
                    server.setAlertSent(false);
                    serverRepo.save(server);
                }
            } catch (IOException e) {
                log.error("Error checking server status", e);
            }
        }
    }

    private boolean isReachable(String ipAddress) throws IOException {
        return InetAddress.getByName(ipAddress).isReachable(10000);
    }

   /* private void sendAlert(Server server) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            notificationService.sendNotification(user, "The server " + server.getName() + " is down.");
        }
    }*/
}
