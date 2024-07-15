/*package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.MaintenanceSettings;
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

    @PostMapping("/settings")
    public ResponseEntity<MaintenanceSettings> saveMaintenanceSettings(@RequestBody MaintenanceSettings settingsDTO) {
        MaintenanceSettings maintenanceSettings = new MaintenanceSettings();
        maintenanceSettings.setId(settingsDTO.getId());
        maintenanceSettings.setOptimizeIndexesOlderThanDays(settingsDTO.getOptimizeIndexesOlderThanDays());
        maintenanceSettings.setCloseIndexesOlderThanDays(settingsDTO.getCloseIndexesOlderThanDays());
        maintenanceSettings.setDeleteIndexesOlderThanDays(settingsDTO.getDeleteIndexesOlderThanDays());
        maintenanceSettings.setRepositoryToStoreSnapshots(settingsDTO.getRepositoryToStoreSnapshots());
        maintenanceSettings.setDeleteSnapshotsOlderThan(settingsDTO.getDeleteSnapshotsOlderThan());

        // Set other fields if necessary
        maintenanceSettings.setSettingName(settingsDTO.getSettingName());
        maintenanceSettings.setSettingValue(settingsDTO.getSettingValue());
        maintenanceSettings.setDescription(settingsDTO.getDescription());
        maintenanceSettings.setCreatedBy(settingsDTO.getCreatedBy());
        maintenanceSettings.setCreatedDate(settingsDTO.getCreatedDate());
        maintenanceSettings.setLastModifiedBy(settingsDTO.getLastModifiedBy());
        maintenanceSettings.setLastModifiedDate(settingsDTO.getLastModifiedDate());

        MaintenanceSettings savedSettings = maintenanceService.saveMaintenanceSettings(maintenanceSettings);
        return ResponseEntity.ok(savedSettings);
    }
    @GetMapping("/settings/{id}")
    public ResponseEntity<MaintenanceSettings> getMaintenanceSettings(@PathVariable Long id) {
        MaintenanceSettings settings = maintenanceService.getMaintenanceSettingsById(id);
        if (settings != null) {
            return new ResponseEntity<>(settings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/settings/all")
    public ResponseEntity<List<MaintenanceSettings>> getAllMaintenanceSettings() {
        List<MaintenanceSettings> settingsList = maintenanceService.getAllMaintenanceSettings();
        if (!settingsList.isEmpty()) {
            return new ResponseEntity<>(settingsList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
*/
package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.security.services.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;


    @GetMapping("/settings")
    public List<MaintenanceSettings> getAllMaintenanceSettings() {
        return maintenanceService.getAllMaintenanceSettings();
    }

    @PostMapping("/settings")
    public ResponseEntity<MaintenanceSettings> saveMaintenanceSettings(@RequestBody MaintenanceSettings maintenanceSettings) {
        MaintenanceSettings savedSettings = maintenanceService.saveMaintenanceSettings(maintenanceSettings);
        return ResponseEntity.ok(savedSettings);
    }

    @PostMapping("/settings/{settingsId}/repositories")
    public ResponseEntity<MaintenanceSettings> addRepository(
            @PathVariable Long settingsId, @RequestBody Repository repository) {
        MaintenanceSettings updatedSettings = maintenanceService.addRepository(settingsId, repository);
        return ResponseEntity.ok(updatedSettings);
    }

    @DeleteMapping("/settings/{settingsId}/repositories/{repositoryId}")
    public ResponseEntity<MaintenanceSettings> deleteRepository(
            @PathVariable Long settingsId, @PathVariable Long repositoryId) {
        MaintenanceSettings updatedSettings = maintenanceService.deleteRepository(settingsId, repositoryId);
        return ResponseEntity.ok(updatedSettings);
    }
}
