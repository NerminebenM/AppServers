package com.bezkoder.springjwt.resource;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.security.services.ClusterService;
import com.bezkoder.springjwt.security.services.IndexService;
import com.bezkoder.springjwt.security.services.ServerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.bezkoder.springjwt.enumeration.Status.SERVER_UP;
import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
@RestController
@RequestMapping("/server")
@RequiredArgsConstructor
public class ServerResource {
    private final ServerService serverService;
    private final IndexService indexService;
    private final ClusterService clusterService;
    @GetMapping("/statisticss")
    public ClusterStatistics getClusterStatistics() {
        return clusterService.getClusterStatistics();
    }
    @GetMapping("/recent-activities")
    public ResponseEntity<List<RecentActivity>> getRecentActivities() {
        List<RecentActivity> recentActivities = serverService.getRecentActivities();
        return ResponseEntity.ok(recentActivities);
    }
    @GetMapping("/health")
    public ClusterHealth getClusterHealth() {
        return clusterService.getClusterHealth();
    }
    @GetMapping("/index")
    public ResponseEntity<List<Index>> listIndices() {
        return ResponseEntity.ok(indexService.listIndices());
    }

    @PostMapping("/index")
    public ResponseEntity<Index> createIndex(@RequestBody Index index) {
        Index savedIndex = indexService.createIndex(index);
        return ResponseEntity.ok(savedIndex);
    }

    @PostMapping("/index/close/{id}")
    public ResponseEntity<?> closeIndex(@PathVariable Long id) {
        try {
            indexService.closeIndex(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/index/{id}")
    public ResponseEntity<Void> deleteIndex(@PathVariable Long id) {
        indexService.deleteIndex(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countServers(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(serverService.countServersByStatus(status));
        } else {
            return ResponseEntity.ok(serverService.countTotalServers());
        }
    }
    @GetMapping("/servers/metrics")
    public ResponseEntity<List<Server>> getServerMetrics() {
        List<Server> servers = serverService.list(100);
        return ResponseEntity.ok(servers);
    }



    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getServerStatistics() {
        Map<String, Object> stats = serverService.getServerStatistics();
        return ResponseEntity.ok(stats);
    }
    @GetMapping("/count/status")
    public ResponseEntity<Map<String, Long>> countServersByStatus() {
        Map<String, Long> serverCounts = new HashMap<>();
        serverCounts.put("up", serverService.countServersByStatus("SERVER_UP"));
        serverCounts.put("down", serverService.countServersByStatus("SERVER_DOWN"));
        return ResponseEntity.ok(serverCounts);
    }
    @GetMapping("/statistics/type")
    public ResponseEntity<Map<String, Long>> getServerStatisticsByType() {
        List<Server> servers = serverService.list(100);
        Map<String, Long> stats = new HashMap<>();
        for (Server server : servers) {
            stats.put(server.getType(), stats.getOrDefault(server.getType(), 0L) + 1);
        }
        return ResponseEntity.ok(stats);
    }


    /*@PostMapping("/sendAlertEmail")
    public ResponseEntity<Response> sendAlertEmail(@RequestParam String subject, @RequestParam String body) {
        serverService.sendAlertEmail(subject, body);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .message("Alert email sent successfully")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }*/

    @SneakyThrows
    @GetMapping("/all")
    public ResponseEntity<Response> getServers() {
        TimeUnit.SECONDS.sleep(3);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("servers", serverService.list(30)))
                        .message("Servers retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


    /*@GetMapping("/all")
    public ResponseEntity<List<Server>> getAllServer() {
        List<Server> chargesESD = serverService.getAllServer();
        return new ResponseEntity<>(chargesESD, HttpStatus.OK);
    }*/
    @GetMapping("/ping/{address}")
    public ResponseEntity<Response> pingServer(@PathVariable("address") String address) throws IOException {
        Server server = serverService.ping(address);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("server", server))
                        .message(server.getStatus() == SERVER_UP ? "Ping success" : "Ping failed")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }




    @PostMapping("/save")
    public ResponseEntity<Response> saveServer(@RequestBody @Valid Server server) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("server", serverService.create(server)))
                        .message("Server created")
                        .status(CREATED)
                        .statusCode(CREATED.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getServer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("server", serverService.get(id)))
                        .message("Server retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteServer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("deleted", serverService.delete(id)))
                        .message("Server deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/image/{fileName}", produces = IMAGE_PNG_VALUE)
    public byte[] getServerImage(@PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/Downloads/images/" + fileName));
    }
}