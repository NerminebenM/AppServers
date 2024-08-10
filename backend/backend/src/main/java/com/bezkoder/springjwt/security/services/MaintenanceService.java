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

import static com.bezkoder.springjwt.repository.EmployeeRepository.logger;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceSettingsRepository settingsRepository;
    public MaintenanceSettings findById(Long id) {
        return settingsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MaintenanceSettings not found with id " + id));
    }
    @Autowired
    private ClusterRepository clusterRepository;
    public MaintenanceSettings saveMaintenanceSettings(MaintenanceSettings maintenanceSettings) {
        if (maintenanceSettings.getId() == null) {
            maintenanceSettings.setId(generateUniqueIdUsingUUID()); // Utilisez l'une des méthodes renommées
        }
        try {
            return settingsRepository.save(maintenanceSettings);
        } catch (Exception e) {
            logger.error("Error saving maintenance settings: ", e);
            throw e; // Re-throw the exception to be handled by the controller
        }
    }

    private Long generateUniqueIdUsingCurrentTime() {
        // Implementation for generating a unique ID based on current time
        return System.currentTimeMillis(); // Example implementation
    }

    private Long generateUniqueIdUsingUUID() {
        // Implement logic to generate a unique ID, for example using a UUID
        return UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
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
