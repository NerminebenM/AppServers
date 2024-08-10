package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.repository.*;
import com.bezkoder.springjwt.security.services.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class ClusterServiceImpl implements ClusterService {
    private final ClusterStatisticsRepo clusterStatisticsRepo;
    private final ClusterHealthRepo clusterHealthRepo;
    @Autowired
    private ClusterRepository clusterRepository;

    @Autowired
    private ServerRepo serverRepository;


    @Autowired
    private MaintenanceSettingsRepository settingsRepository;
    public Map<String, Object> getClusterStatistics1() {
        Map<String, Object> statistics = new HashMap<>();
        long totalClusters = clusterRepository.count();
        long totalServers = serverRepository.count();

        // Ajoutez d'autres statistiques ici si nécessaire
        statistics.put("totalClusters", totalClusters);
        statistics.put("totalServers", totalServers);

        return statistics;
    }
    @Override
    public ClusterStatistics getClusterStatistics() {
        return clusterStatisticsRepo.findFirstByOrderByIdAsc();
    }

    @Override
    public ClusterHealth getClusterHealth() {
        return clusterHealthRepo.findFirstByOrderByIdAsc();
    }
    @Override
    public List<Cluster> getAllClusters() {
        return clusterRepository.findAll();
    }

    @Override
    public Cluster getClusterById(Long id) {
        return clusterRepository.findById(id).orElse(null);
    }

    @Override
    public Cluster createCluster(Cluster cluster) {
        return clusterRepository.save(cluster);
    }

    public Cluster updateCluster(Long id, Cluster clusterDetails) {
        return clusterRepository.findById(id)
                .map(cluster -> {
                    cluster.setName(clusterDetails.getName());
                    cluster.setDescription(clusterDetails.getDescription());
                    return clusterRepository.save(cluster);
                })
                .orElse(null);
    }

    @Override
    public void deleteCluster(Long id) {
        clusterRepository.deleteById(id);
    }
   /* @Transactional
    @Override
    public Cluster addServerToCluster(Long clusterId, Server server) {
        Cluster cluster = clusterRepository.findById(clusterId)
                .orElseThrow(() -> new ResourceNotFoundException("Cluster not found with id " + clusterId));
        List<Server> servers = cluster.getServers();
        if (servers == null) {
            servers = new ArrayList<>(); // Initialisez la liste si elle est null
            cluster.setServers(servers); // Assurez-vous de définir la liste dans le cluster
        }
        servers.add(server); // Ajoutez le serveur à la liste
        server.setCluster(cluster); // Assurez-vous que le serveur a une référence vers le cluster
        // Enregistrez les modifications nécessaires
        return clusterRepository.save(cluster);
    }*/

    public Cluster createOrUpdateMaintenanceSettings(Long clusterId, MaintenanceSettings maintenanceSettings) {
        Optional<Cluster> clusterOptional = clusterRepository.findById(clusterId);

        if (!clusterOptional.isPresent()) {
            throw new ResourceNotFoundException("Cluster not found with id " + clusterId);
        }

        Cluster cluster = clusterOptional.get();
        maintenanceSettings.setId(cluster.getMaintenanceSettings() != null ? cluster.getMaintenanceSettings().getId() : null);
        cluster.setMaintenanceSettings(maintenanceSettings);

        return clusterRepository.save(cluster);
    }


    @Override
    public Cluster addOrUpdateRepositories(Long maintenanceSettingsId, List<Repository> repositories) {
        Optional<MaintenanceSettings> settingsOptional = settingsRepository.findById(maintenanceSettingsId);
        if (!settingsOptional.isPresent()) {
            throw new ResourceNotFoundException("MaintenanceSettings not found with id " + maintenanceSettingsId);
        }

        MaintenanceSettings maintenanceSettings = settingsOptional.get();
        maintenanceSettings.setRepositories(repositories);
        settingsRepository.save(maintenanceSettings);

        Optional<Cluster> clusterOptional = clusterRepository.findByMaintenanceSettingsId(maintenanceSettingsId);
        if (clusterOptional.isPresent()) {
            return clusterOptional.get();
        } else {
            throw new ResourceNotFoundException("Cluster not found for maintenanceSettingsId " + maintenanceSettingsId);
        }
    }}
