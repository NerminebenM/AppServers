package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.repository.ClusterHealthRepo;
import com.bezkoder.springjwt.repository.ClusterRepository;
import com.bezkoder.springjwt.repository.ClusterStatisticsRepo;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.security.services.ClusterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    @Override
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
    @Transactional
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
    }

    @Override
    public Cluster createOrUpdateMaintenanceSettings(Long clusterId, MaintenanceSettings maintenanceSettings) {
        Optional<Cluster> clusterOptional = clusterRepository.findById(clusterId);

        if (!clusterOptional.isPresent()) {
            throw new ResourceNotFoundException("Cluster not found with id " + clusterId);
        }

        Cluster cluster = clusterOptional.get();
        maintenanceSettings.setCluster(cluster);
        cluster.setMaintenanceSettings(maintenanceSettings);

        return clusterRepository.save(cluster);
    }

    @Override
    public Cluster addOrUpdateRepositories(Long maintenanceSettingsId, List<Repository> repositories) {
        // 1. Récupérez les paramètres de maintenance associés à l'ID
        Optional<Cluster> clusterOptional = clusterRepository.findById(maintenanceSettingsId);

        if (!clusterOptional.isPresent()) {
            throw new ResourceNotFoundException("Cluster not found with id " + maintenanceSettingsId);
        }

        Cluster cluster = clusterOptional.get();
        MaintenanceSettings maintenanceSettings = cluster.getMaintenanceSettings();

        if (maintenanceSettings == null) {
            throw new ResourceNotFoundException("MaintenanceSettings not found for Cluster with id " + maintenanceSettingsId);
        }

        // 2. Mettez à jour la liste des répertoires avec ceux fournis
        maintenanceSettings.setRepositories(repositories);

        // 3. Sauvegardez les modifications dans le clusterRepository
        cluster.setMaintenanceSettings(maintenanceSettings);
        return clusterRepository.save(cluster);
    }

}
