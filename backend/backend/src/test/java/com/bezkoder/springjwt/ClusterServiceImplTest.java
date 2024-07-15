package com.bezkoder.springjwt;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.Cluster;
import com.bezkoder.springjwt.models.MaintenanceSettings;
import com.bezkoder.springjwt.models.Repository;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.repository.ClusterHealthRepo;
import com.bezkoder.springjwt.repository.ClusterRepository;
import com.bezkoder.springjwt.repository.ClusterStatisticsRepo;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.security.services.implementation.ClusterServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClusterServiceImplTest {

    @Mock
    private ClusterStatisticsRepo clusterStatisticsRepo;

    @Mock
    private ClusterHealthRepo clusterHealthRepo;

    @Mock
    private ClusterRepository clusterRepository;

    @Mock
    private ServerRepo serverRepository;

    @InjectMocks
    private ClusterServiceImpl clusterService;

    private Cluster cluster;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        cluster = new Cluster();
        cluster.setId(1L);
        cluster.setName("Test Cluster");
        cluster.setDescription("Test Cluster Description");
    }

    @Test
    public void testGetClusterById() {
        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));

        Cluster retrievedCluster = clusterService.getClusterById(1L);

        assertNotNull(retrievedCluster);
        assertEquals("Test Cluster", retrievedCluster.getName());
    }

    @Test
    public void testGetClusterById_ClusterNotFound() {
        when(clusterRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            clusterService.getClusterById(1L);
        });

        assertEquals("Cluster not found with id 1", exception.getMessage());
    }

    @Test
    public void testCreateCluster() {
        when(clusterRepository.save(any(Cluster.class))).thenReturn(cluster);

        Cluster createdCluster = clusterService.createCluster(cluster);

        assertNotNull(createdCluster);
        assertEquals("Test Cluster", createdCluster.getName());
        verify(clusterRepository, times(1)).save(cluster);
    }

    @Test
    public void testUpdateCluster() {
        Cluster updatedClusterDetails = new Cluster();
        updatedClusterDetails.setName("Updated Cluster Name");
        updatedClusterDetails.setDescription("Updated Cluster Description");

        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));
        when(clusterRepository.save(any(Cluster.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Cluster updatedCluster = clusterService.updateCluster(1L, updatedClusterDetails);

        assertNotNull(updatedCluster);
        assertEquals("Updated Cluster Name", updatedCluster.getName());
        assertEquals("Updated Cluster Description", updatedCluster.getDescription());
        verify(clusterRepository, times(1)).save(cluster);
    }

    @Test
    public void testDeleteCluster() {
        doNothing().when(clusterRepository).deleteById(1L);

        clusterService.deleteCluster(1L);

        verify(clusterRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testAddServerToCluster_NewServer() {
        Server serverDetails = new Server();
        serverDetails.setIpAddress("192.168.1.1");

        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));
        when(serverRepository.findByIpAddressOrDomain("192.168.1.1", null)).thenReturn(null);
        when(serverRepository.save(any(Server.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Cluster updatedCluster = clusterService.addServerToCluster(1L, serverDetails);

        assertNotNull(updatedCluster);
        assertEquals(1, updatedCluster.getServers().size());
        assertEquals("192.168.1.1", updatedCluster.getServers().get(0).getIpAddress());
        verify(serverRepository, times(1)).save(any(Server.class));
        verify(clusterRepository, times(1)).save(cluster);
    }

    @Test
    public void testAddServerToCluster_ExistingServerInCluster() {
        Server serverDetails = new Server();
        serverDetails.setIpAddress("192.168.1.1");

        Server existingServer = new Server();
        existingServer.setIpAddress("192.168.1.1");
        existingServer.setCluster(cluster);

        cluster.getServers().add(existingServer);

        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));
        when(serverRepository.findByIpAddressOrDomain("192.168.1.1", null)).thenReturn(existingServer);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            clusterService.addServerToCluster(1L, serverDetails);
        });

        assertEquals("Server with IP or domain already exists in the cluster", exception.getMessage());
        assertEquals(1, cluster.getServers().size()); // Vérifie que le serveur existant n'a pas été ajouté à nouveau
    }

    @Test
    public void testCreateOrUpdateMaintenanceSettings() {
        MaintenanceSettings maintenanceSettings = new MaintenanceSettings();
        maintenanceSettings.setSettingName("Test Maintenance Settings");

        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));
        when(clusterRepository.save(any(Cluster.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Cluster updatedCluster = clusterService.createOrUpdateMaintenanceSettings(1L, maintenanceSettings);

        assertNotNull(updatedCluster);
        assertNotNull(updatedCluster.getMaintenanceSettings());
        assertEquals("Test Maintenance Settings", updatedCluster.getMaintenanceSettings().getSettingName());
        verify(clusterRepository, times(1)).save(cluster);
    }

    @Test
    public void testAddOrUpdateRepositories() {
        List<Repository> repositories = Arrays.asList(new Repository(null, "Repo 1", "Location 1"),
                new Repository(null, "Repo 2", "Location 2"));

        when(clusterRepository.findById(1L)).thenReturn(Optional.of(cluster));
        when(clusterRepository.save(any(Cluster.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Cluster updatedCluster = clusterService.addOrUpdateRepositories(1L, repositories);

        assertNotNull(updatedCluster);
        assertEquals(2, updatedCluster.getMaintenanceSettings().getRepositories().size());
        assertEquals("Repo 1", updatedCluster.getMaintenanceSettings().getRepositories().get(0).getName());
        assertEquals("Repo 2", updatedCluster.getMaintenanceSettings().getRepositories().get(1).getName());
        verify(clusterRepository, times(1)).save(cluster);
    }
}
