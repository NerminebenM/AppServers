/*package com.bezkoder.springjwt.resource;

import com.bezkoder.springjwt.models.Response;
import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;
@RestController
@RequestMapping("/apiserver")
@RequiredArgsConstructor
public class ServerHistoryResource {

    private final ServerHistoryService serverHistoryService;

    @GetMapping("/recent-activities")
    public ResponseEntity<List<ServerHistory>> getRecentActivities() {
        List<ServerHistory> recentActivities = serverHistoryService.getRecentActivities();
        return ResponseEntity.ok(recentActivities);
    }

    @GetMapping("/{serverId}")
    public ResponseEntity<Response> getHistoryForServer(@PathVariable Long serverId,
                                                        @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ServerHistory> serverHistoryPage = serverHistoryService.getHistoryForServer(serverId, pageable);
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("serverHistory", serverHistoryPage.getContent());
        responseData.put("currentPage", serverHistoryPage.getNumber());
        responseData.put("totalItems", serverHistoryPage.getTotalElements());
        responseData.put("totalPages", serverHistoryPage.getTotalPages());

        return ResponseEntity.ok(
                Response.builder()
                        .data(responseData)
                        .message("Historique du serveur récupéré avec succès")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}*/
package com.bezkoder.springjwt.resource;

import com.bezkoder.springjwt.models.Response;
import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/apiserver")
@RequiredArgsConstructor
public class ServerHistoryResource {

    private final ServerHistoryService serverHistoryService;

    /*@GetMapping("/recent-activities")
    public ResponseEntity<List<ServerHistory>> getRecentActivities() {
        List<ServerHistory> recentActivities = serverHistoryService.getRecentActivities();
        return ResponseEntity.ok(recentActivities);
    }*/

    @GetMapping("/{serverId}")
    public ResponseEntity<Response> getHistoryForServer(@PathVariable Long serverId,
                                                        @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ServerHistory> serverHistoryPage = serverHistoryService.getHistoryForServer(serverId, pageable);
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("serverHistory", serverHistoryPage.getContent());
        responseData.put("currentPage", serverHistoryPage.getNumber());
        responseData.put("totalItems", serverHistoryPage.getTotalElements());
        responseData.put("totalPages", serverHistoryPage.getTotalPages());

        return ResponseEntity.ok(
                Response.builder()
                        .data(responseData)
                        .message("Historique du serveur récupéré avec succès")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/servers/{serverId}/history")
    public ResponseEntity<List<ServerHistory>> getNonPaginatedHistoryForServer(@PathVariable Long serverId) {
        List<ServerHistory> serverHistory = serverHistoryService.getHistoryForServer(serverId);
        return ResponseEntity.ok(serverHistory);
    }
}
