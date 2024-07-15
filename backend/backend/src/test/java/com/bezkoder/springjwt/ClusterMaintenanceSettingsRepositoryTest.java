/*package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.Cluster;
import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.repository.ClusterRepository;
import com.bezkoder.springjwt.repository.MaintenanceSettingsRepository;
import com.bezkoder.springjwt.repository.RepositoryRepository;
import com.bezkoder.springjwt.security.services.implementation.ClusterServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClusterMaintenanceSettingsRepositoryTest {

    @Mock
    private ClusterRepository clusterRepository;

    @Mock
    private MaintenanceSettingsRepository maintenanceSettingsRepository;

    @Mock
    private RepositoryRepository repositoryRepository;

    @InjectMocks
    private ClusterServiceImpl clusterService;

    private Cluster cluster;
    private MaintenanceSettings maintenanceSettings;
    private Repository repository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize Cluster
        cluster = new Cluster();
        cluster.setId(1L);
        cluster.setName("Test Cluster");
        cluster.setDescription("Cluster for testing");

        // Initialize MaintenanceSettings
        maintenanceSettings = new MaintenanceSettings();
        maintenanceSettings.setId(1L);
        maintenanceSettings.setSettingName("Test Settings");
        maintenanceSettings.setOptimizeIndexesOlderThanDays(30);
        maintenanceSettings.setCloseIndexesOlderThanDays(60);
        maintenanceSettings.setDeleteIndexesOlderThanDays(90);
        maintenanceSettings.setRepositoryToStoreSnapshots("Test Repository");
        maintenanceSettings.setDeleteSnapshotsOlderThan("6 months");

        // Initialize Repository
        repository = new Repository();
        repository.setId(1L);
        repository.setName("Test Repository");
        repository.setLocation("/path/to/repository");
    }

    @Test
    public void testCreateCluster() {
        when(clusterRepository.save(any(Cluster.class))).thenReturn(cluster);

        Cluster createdCluster = clusterService.create(cluster);

        assertEquals("Test Cluster", createdCluster.getName());
        verify(clusterRepository, times(1)).save(cluster);
    }

    @Test
    public void testCreateMaintenanceSettings() {
        when(maintenanceSettingsRepository.save(any(MaintenanceSettings.class))).thenReturn(maintenanceSettings);

        MaintenanceSettings createdSettings = clusterService.createMaintenanceSettings(maintenanceSettings);

        assertEquals("Test Settings", createdSettings.getSettingName());
        assertEquals(30, createdSettings.getOptimizeIndexesOlderThanDays());
        verify(maintenanceSettingsRepository, times(1)).save(maintenanceSettings);
    }

    @Test
    public void testCreateRepository() {
        when(repositoryRepository.save(any(Repository.class))).thenReturn(repository);

        Repository createdRepository = clusterService.createRepository(repository);

        assertEquals("Test Repository", createdRepository.getName());
        assertEquals("/path/to/repository", createdRepository.getLocation());
        verify(repositoryRepository, times(1)).save(repository);
    }
}
*/