/*package com.bezkoder.springjwt;

import com.bezkoder.springjwt.enumeration.Status;
import com.bezkoder.springjwt.models.ClusterHealth;
import com.bezkoder.springjwt.models.ClusterStatistics;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.models.ServerHistory;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ServerTest {

    @Test
    public void testServerGettersAndSetters() {
        Server server = new Server();
        // Définition des attributs du serveur
        server.setId(1L);
        server.setIpAddress("192.168.0.1");
        server.setName("Server1");
        server.setMemory("16GB");
        server.setType("VPS");
        server.setImageUrl("http://example.com/image.png");
        server.setDomain("example.com");
        server.setOwnerId(123L);
        server.setStatus(Status.SERVER_UP); // Utilisation correcte de Status.SERVER_UP
        server.setCpuUsage(50.5);
        server.setMemoryUsage(75.3);
        server.setNetworkBandwidth(100.2);
        server.setPingCount(5);

        // Initialisation des listes
        List<ServerHistory> history = new ArrayList<>();
        server.setHistory(history);

        List<ClusterHealth> clusterHealths = new ArrayList<>();
        server.setClusterHealths(clusterHealths);

        List<ClusterStatistics> clusterStatistics = new ArrayList<>();
        server.setClusterStatistics(clusterStatistics);

        server.setAlertSent(true);

        // Test des getters
        assertEquals(1L, server.getId());
        assertEquals("192.168.0.1", server.getIpAddress());
        assertEquals("Server1", server.getName());
        assertEquals("16GB", server.getMemory());
        assertEquals("VPS", server.getType());
        assertEquals("http://example.com/image.png", server.getImageUrl());
        assertEquals("example.com", server.getDomain());
        assertEquals(123L, server.getOwnerId());
        assertEquals(Status.SERVER_UP, server.getStatus()); // Utilisation correcte de assertEquals pour Status
        assertEquals(50.5, server.getCpuUsage());
        assertEquals(75.3, server.getMemoryUsage());
        assertEquals(100.2, server.getNetworkBandwidth());
        assertEquals(5, server.getPingCount());
        assertEquals(history, server.getHistory());
        assertEquals(clusterHealths, server.getClusterHealths());
        assertEquals(clusterStatistics, server.getClusterStatistics());
        assertEquals(true, server.isAlertSent());

        // Test des setters
        server.setId(2L);
        assertEquals(2L, server.getId());

        server.setIpAddress("192.168.0.2");
        assertEquals("192.168.0.2", server.getIpAddress());

        server.setName("Server2");
        assertEquals("Server2", server.getName());

        server.setMemory("32GB");
        assertEquals("32GB", server.getMemory());

        server.setType("Dedicated");
        assertEquals("Dedicated", server.getType());

        server.setImageUrl("http://example.com/newimage.png");
        assertEquals("http://example.com/newimage.png", server.getImageUrl());

        server.setDomain("newexample.com");
        assertEquals("newexample.com", server.getDomain());

        server.setOwnerId(456L);
        assertEquals(456L, server.getOwnerId());

        server.setStatus(Status.SERVER_DOWN);
        assertEquals(Status.SERVER_DOWN, server.getStatus());

        server.setCpuUsage(60.5);
        assertEquals(60.5, server.getCpuUsage());

        server.setMemoryUsage(85.3);
        assertEquals(85.3, server.getMemoryUsage());

        server.setNetworkBandwidth(200.2);
        assertEquals(200.2, server.getNetworkBandwidth());

        server.setPingCount(10);
        assertEquals(10, server.getPingCount());

        List<ServerHistory> newHistory = new ArrayList<>();
        server.setHistory(newHistory);
        assertEquals(newHistory, server.getHistory());

        List<ClusterHealth> newClusterHealths = new ArrayList<>();
        server.setClusterHealths(newClusterHealths);
        assertEquals(newClusterHealths, server.getClusterHealths());

        List<ClusterStatistics> newClusterStatistics = new ArrayList<>();
        server.setClusterStatistics(newClusterStatistics);
        assertEquals(newClusterStatistics, server.getClusterStatistics());

        server.setAlertSent(false);
        assertEquals(false, server.isAlertSent());
    }

    @Test
    public void testServerConstructor() {
        List<ServerHistory> history = new ArrayList<>();
        List<ClusterHealth> clusterHealths = new ArrayList<>();
        List<ClusterStatistics> clusterStatistics = new ArrayList<>();

        Server server = new Server(
                1L,
                "192.168.0.1",
                "Server1",
                "16GB",
                "VPS",
                "http://example.com/image.png",
                "example.com",
                123L,
                Status.SERVER_UP,
                50.5,
                75.3,
                100.2,
                5,
                history,
                clusterHealths,
                clusterStatistics,
                true
        );

        // Test d'initialisation du constructeur
        assertEquals(1L, server.getId());
        assertEquals("192.168.0.1", server.getIpAddress());
        assertEquals("Server1", server.getName());
        assertEquals("16GB", server.getMemory());
        assertEquals("VPS", server.getType());
        assertEquals("http://example.com/image.png", server.getImageUrl());
        assertEquals("example.com", server.getDomain());
        assertEquals(123L, server.getOwnerId());
        assertEquals(Status.SERVER_UP, server.getStatus());
        assertEquals(50.5, server.getCpuUsage());
        assertEquals(75.3, server.getMemoryUsage());
        assertEquals(100.2, server.getNetworkBandwidth());
        assertEquals(5, server.getPingCount());
        assertEquals(history, server.getHistory());
        assertEquals(clusterHealths, server.getClusterHealths());
        assertEquals(clusterStatistics, server.getClusterStatistics());
        assertEquals(true, server.isAlertSent());
    }


}*/
