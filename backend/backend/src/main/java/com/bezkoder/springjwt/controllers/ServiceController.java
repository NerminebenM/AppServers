package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.security.services.ServiceMonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    @Autowired
    private ServiceMonitoringService serviceMonitoringService;

    @GetMapping("/allservers")
    public ResponseEntity<List<MonitoredService>> getAllServices() {
        return ResponseEntity.ok(serviceMonitoringService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonitoredService> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceMonitoringService.getServiceById(id));
    }

    @PostMapping("/saveservices")
    public ResponseEntity<MonitoredService> saveService(@RequestBody MonitoredService service) {
        return ResponseEntity.ok(serviceMonitoringService.saveService(service));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceMonitoringService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MonitoredService>> getServicesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(serviceMonitoringService.getServicesByStatus(status));
    }

    @GetMapping("/server/{serverId}")
    public ResponseEntity<List<MonitoredService>> getServicesByServer(@PathVariable Long serverId) {
        Server server = new Server();
        server.setId(serverId);
        return ResponseEntity.ok(serviceMonitoringService.getServicesByServer(server));
    }

    @GetMapping("/check/{id}")
    public ResponseEntity<MonitoredService> checkServiceStatus(@PathVariable Long id) {
        MonitoredService service = serviceMonitoringService.getServiceById(id);
        if (service != null) {
            serviceMonitoringService.checkServiceStatus(service);
            return ResponseEntity.ok(service);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/service-status-trend")
    public ResponseEntity<Map<String, List<Integer>>> getServiceStatusTrend() {
        Map<String, List<Integer>> serviceStatusTrend = serviceMonitoringService.getServiceStatusTrend();
        return ResponseEntity.ok(serviceStatusTrend);
    }

    @GetMapping("/service-status-distribution")
    public ResponseEntity<Map<String, Integer>> getServiceStatusDistribution() {
        Map<String, Integer> serviceStatusDistribution = serviceMonitoringService.getServiceStatusDistribution();
        return ResponseEntity.ok(serviceStatusDistribution);
    }
    @PutMapping("/{id}")
    public ResponseEntity<MonitoredService> updateService(@PathVariable Long id, @RequestBody MonitoredService updatedService) {
        MonitoredService existingService = serviceMonitoringService.getServiceById(id);

        if (existingService != null) {
            existingService.setName(updatedService.getName());
            existingService.setUrl(updatedService.getUrl());
            existingService.setStatus(updatedService.getStatus());
            existingService.setDescription(updatedService.getDescription());

            MonitoredService savedService = serviceMonitoringService.saveService(existingService);
            return ResponseEntity.ok(savedService);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
