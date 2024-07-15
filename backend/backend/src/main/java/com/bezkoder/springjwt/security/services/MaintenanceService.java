package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.Cluster;
import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.repository.ClusterRepository;
import com.bezkoder.springjwt.repository.MaintenanceSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceSettingsRepository settingsRepository;

    @Autowired
    private ClusterRepository clusterRepository;
    public MaintenanceSettings saveMaintenanceSettings(MaintenanceSettings maintenanceSettings) {
        // Ensure ID is set manually
        if (maintenanceSettings.getId() == null) {
            maintenanceSettings.setId(generateUniqueId());
        }
        return settingsRepository.save(maintenanceSettings);
    }

    public List<MaintenanceSettings> getAllMaintenanceSettings() {
        return settingsRepository.findAll();
    }

    public MaintenanceSettings getMaintenanceSettingsById(Long id) {
        return settingsRepository.findById(id).orElse(null);
    }

    public MaintenanceSettings addRepository(Long settingsId, Repository repository) {
        Optional<MaintenanceSettings> settingsOptional = settingsRepository.findById(settingsId);
        if (settingsOptional.isPresent()) {
            MaintenanceSettings settings = settingsOptional.get();
            settings.getRepositories().add(repository);
            return settingsRepository.save(settings);
        }
        return null;
    }

    public MaintenanceSettings deleteRepository(Long settingsId, Long repositoryId) {
        Optional<MaintenanceSettings> settingsOptional = settingsRepository.findById(settingsId);
        if (settingsOptional.isPresent()) {
            MaintenanceSettings settings = settingsOptional.get();
            settings.getRepositories().removeIf(repo -> repo.getId().equals(repositoryId));
            return settingsRepository.save(settings);
        }
        return null;
    }

    private Long generateUniqueId() {
        // Implement logic to generate a unique ID, for example using a sequence or a UUID
        return UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
    }

    public MaintenanceSettings createAndSaveMaintenanceSettings() {
        MaintenanceSettings maintenanceSettings = new MaintenanceSettings();
        // Assignez d'autres champs nécessaires
        // Par exemple :
        // maintenanceSettings.setField1(value1);
        // maintenanceSettings.setField2(value2);
        // Ajoutez d'autres champs selon vos besoins
        // Sauvegardez les paramètres de maintenance dans le dépôt
        return settingsRepository.save(maintenanceSettings);
    }

    public Cluster createOrUpdateMaintenanceSettings(Long clusterId, MaintenanceSettings maintenanceSettings) {
        Optional<Cluster> clusterOptional = clusterRepository.findById(clusterId);

        if (!clusterOptional.isPresent()) {
            throw new ResourceNotFoundException("Cluster not found with id " + clusterId);
        }

        Cluster cluster = clusterOptional.get();
        cluster.setMaintenanceSettings(maintenanceSettings);

        return clusterRepository.save(cluster);
    }


}
