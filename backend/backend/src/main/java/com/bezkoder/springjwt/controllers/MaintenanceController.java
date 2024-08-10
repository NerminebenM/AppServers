package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.security.services.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping("/settings")
    public ResponseEntity<List<MaintenanceSettings>> getAllMaintenanceSettings() {
        List<MaintenanceSettings> settingsList = maintenanceService.getAllMaintenanceSettings();
        if (settingsList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(settingsList);
    }

    @PostMapping("/settings")
    public ResponseEntity<MaintenanceSettings> saveMaintenanceSettings(@RequestBody MaintenanceSettings maintenanceSettings) {
        MaintenanceSettings savedSettings = maintenanceService.saveMaintenanceSettings(maintenanceSettings);
        return new ResponseEntity<>(savedSettings, HttpStatus.CREATED);
    }
    @GetMapping("/settings/{id}")
    public ResponseEntity<MaintenanceSettings> getMaintenanceSettings(@PathVariable Long id) {
        MaintenanceSettings settings = maintenanceService.findById(id);
        if (settings != null) {
            return ResponseEntity.ok(settings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/settings/{settingsId}/repositories")
    public ResponseEntity<MaintenanceSettings> addRepository(
            @PathVariable Long settingsId, @RequestBody Repository repository) {
        try {
            MaintenanceSettings updatedSettings = maintenanceService.addRepository(settingsId, repository);
            return ResponseEntity.ok(updatedSettings);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/settings/{settingsId}/repositories/{repositoryId}")
    public ResponseEntity<MaintenanceSettings> deleteRepository(
            @PathVariable Long settingsId, @PathVariable Long repositoryId) {
        try {
            MaintenanceSettings updatedSettings = maintenanceService.deleteRepository(settingsId, repositoryId);
            return ResponseEntity.ok(updatedSettings);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
