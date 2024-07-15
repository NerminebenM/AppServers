package com.bezkoder.springjwt;

import com.bezkoder.springjwt.enumeration.Status;
import com.bezkoder.springjwt.models.Cluster;
import com.bezkoder.springjwt.models.ClusterHealth;
import com.bezkoder.springjwt.models.ClusterStatistics;
import com.bezkoder.springjwt.models.Server;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

public class ServerTest {

    private Server server;

    @BeforeEach
    public void setUp() {
        server = new Server();
    }

    @Test
    public void testServerConstructor() {
        Cluster mockCluster = mock(Cluster.class);

        server = new Server("192.168.1.1", "Server1", "16GB", "Type1", "imageUrl", "domain.com", Status.SERVER_UP, 50.0, 70.0, 100.0, mockCluster);

        assertEquals("192.168.1.1", server.getIpAddress());
        assertEquals("Server1", server.getName());
        assertEquals("16GB", server.getMemory());
        assertEquals("Type1", server.getType());
        assertEquals("imageUrl", server.getImageUrl());
        assertEquals("domain.com", server.getDomain());
        assertEquals(Status.SERVER_UP, server.getStatus());
        assertEquals(50.0, server.getCpuUsage());
        assertEquals(70.0, server.getMemoryUsage());
        assertEquals(100.0, server.getNetworkBandwidth());
        assertEquals(mockCluster, server.getCluster());
    }

    @Test
    public void testGettersAndSetters() {
        Cluster mockCluster = mock(Cluster.class);

        server.setIpAddress("192.168.1.1");
        server.setName("Server1");
        server.setMemory("16GB");
        server.setType("Type1");
        server.setImageUrl("imageUrl");
        server.setDomain("domain.com");
        server.setStatus(Status.SERVER_UP);
        server.setCpuUsage(50.0);
        server.setMemoryUsage(70.0);
        server.setNetworkBandwidth(100.0);
        server.setCluster(mockCluster);

        assertEquals("192.168.1.1", server.getIpAddress());
        assertEquals("Server1", server.getName());
        assertEquals("16GB", server.getMemory());
        assertEquals("Type1", server.getType());
        assertEquals("imageUrl", server.getImageUrl());
        assertEquals("domain.com", server.getDomain());
        assertEquals(Status.SERVER_UP, server.getStatus());
        assertEquals(50.0, server.getCpuUsage());
        assertEquals(70.0, server.getMemoryUsage());
        assertEquals(100.0, server.getNetworkBandwidth());
        assertEquals(mockCluster, server.getCluster());
    }

    @Test
    public void testClusterHealths() {
        List<ClusterHealth> mockClusterHealths = mock(List.class);
        server.setClusterHealths(mockClusterHealths);
        assertEquals(mockClusterHealths, server.getClusterHealths());
    }

    @Test
    public void testClusterStatistics() {
        List<ClusterStatistics> mockClusterStatistics = mock(List.class);
        server.setClusterStatistics(mockClusterStatistics);
        assertEquals(mockClusterStatistics, server.getClusterStatistics());
    }
}
