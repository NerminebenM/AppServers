package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.*;

import java.util.List;

public interface ClusterService {
    ClusterStatistics getClusterStatistics();
    ClusterHealth getClusterHealth();
    List<Cluster> getAllClusters();
    Cluster getClusterById(Long id);
    Cluster createCluster(Cluster cluster);
    Cluster updateCluster(Long id, Cluster clusterDetails);
    void deleteCluster(Long id);
    Cluster addServerToCluster(Long id, Server serverDetails);
    Cluster createOrUpdateMaintenanceSettings(Long clusterId, MaintenanceSettings maintenanceSettings); // Nouvelle méthode
    Cluster addOrUpdateRepositories(Long maintenanceSettingsId, List<Repository> repositories); // Nouvelle méthode

}
