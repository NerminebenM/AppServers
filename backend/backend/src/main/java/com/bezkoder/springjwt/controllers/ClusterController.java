package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Cluster;
import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.repository.ClusterRepository;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.security.services.ClusterService;
import com.bezkoder.springjwt.security.services.MaintenanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clusters")
public class ClusterController {

    @Autowired
    private ClusterRepository clusterRepository;

    @Autowired
    private ServerRepo serverRepository;
    @Autowired
    private ClusterService clusterService;
    @Autowired
    private MaintenanceService maintenanceService;


    @GetMapping
    public List<Cluster> getAllClusters() {
        return clusterRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cluster> getClusterById(@PathVariable Long id) {
        return clusterRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCluster(@Valid @RequestBody Cluster cluster, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid input data");
        }

        try {
            Cluster createdCluster = clusterRepository.save(cluster);
            return ResponseEntity.ok(createdCluster);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create cluster: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cluster> updateCluster(@PathVariable Long id, @RequestBody Cluster clusterDetails) {
        return clusterRepository.findById(id)
                .map(cluster -> {
                    cluster.setName(clusterDetails.getName());
                    cluster.setDescription(clusterDetails.getDescription());
                    return ResponseEntity.ok(clusterRepository.save(cluster));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCluster(@PathVariable Long id) {
        clusterService.deleteCluster(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<Cluster> addServerToCluster(@PathVariable Long id, @RequestBody Server serverDetails) {
        Cluster updatedCluster = clusterService.addServerToCluster(id, serverDetails);
        return ResponseEntity.ok(updatedCluster);
    }
    @PostMapping("/{clusterId}/maintenance-settings")
    public ResponseEntity<Cluster> createOrUpdateMaintenanceSettings(@PathVariable Long clusterId, @RequestBody MaintenanceSettings maintenanceSettings) {
        Cluster updatedCluster = maintenanceService.createOrUpdateMaintenanceSettings(clusterId, maintenanceSettings);
        return ResponseEntity.ok(updatedCluster);
    }

    @PostMapping("/maintenance-settings/{maintenanceSettingsId}/repositories")
    public ResponseEntity<Cluster> addOrUpdateRepositories(@PathVariable Long maintenanceSettingsId, @RequestBody List<Repository> repositories) {
        Cluster updatedCluster = clusterService.addOrUpdateRepositories(maintenanceSettingsId, repositories);
        return ResponseEntity.ok(updatedCluster);
    }

}
