package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.RecentActivity;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.repository.RecentActivityRepo;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import com.bezkoder.springjwt.security.services.implementation.ServerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.bezkoder.springjwt.enumeration.Status.SERVER_UP;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ServerServiceImplTest {

    @Mock
    private ServerRepo serverRepo;

    @Mock
    private RecentActivityRepo recentActivityRepo;

    @Mock
    private ServerHistoryService serverHistoryService;

    @InjectMocks
    private ServerServiceImpl serverService;

    private Server server;
    private ServerHistory serverHistory;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        server = new Server();
        server.setId(1L);
        server.setName("Test Server");
        server.setIpAddress("192.168.1.1");
        server.setStatus(SERVER_UP);

        serverHistory = new ServerHistory();
        serverHistory.setDescription("Server created");
        serverHistory.setModificationTime(LocalDateTime.now());
        // Simuler le contexte HTTP
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    }

    @Test
    public void testCreateServer() {
        when(serverRepo.save(any(Server.class))).thenReturn(server);

        // Simuler le contexte HTTP
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Server createdServer = serverService.create(server);

        assertNotNull(createdServer);
        assertEquals("Test Server", createdServer.getName());
        assertNotNull(createdServer.getImageUrl());
        verify(serverRepo, times(1)).save(server);
        verify(serverHistoryService, times(1)).addHistoryEntry(any(ServerHistory.class));
        verify(recentActivityRepo, times(1)).save(any(RecentActivity.class));
    }

    @Test
    public void testGetServerHistory() {
        ServerHistory history1 = new ServerHistory();
        history1.setDescription("Server created");
        history1.setModificationTime(LocalDateTime.now());

        ServerHistory history2 = new ServerHistory();
        history2.setDescription("Server updated");
        history2.setModificationTime(LocalDateTime.now());

        server.setHistory(Arrays.asList(history1, history2));
        when(serverRepo.findById(1L)).thenReturn(Optional.of(server));

        List<ServerHistory> history = serverService.getServerHistory(1L);

        assertNotNull(history);
        assertEquals(2, history.size());
    }

    @Test
    public void testGetServerHistory_ServerNotFound() {
        when(serverRepo.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            serverService.getServerHistory(1L);
        });

        assertEquals("Server not found", exception.getMessage());
    }

    @Test
    public void testGetServerStatistics() {
        when(serverRepo.findAll()).thenReturn(Arrays.asList(server));

        Map<String, Object> stats = serverService.getServerStatistics();

        assertNotNull(stats);
        assertEquals(1, stats.get("totalServers"));
        assertEquals(0.0, stats.get("averageCpuUsage"));
        assertEquals(0.0, stats.get("averageMemoryUsage"));
        assertEquals(0.0, stats.get("totalNetworkBandwidth"));
    }

    @Test
    public void testPingServer() throws IOException {
        when(serverRepo.findByIpAddress("192.168.1.1")).thenReturn(server);

        Server pingedServer = serverService.ping("192.168.1.1");

        assertNotNull(pingedServer);
        assertEquals(SERVER_UP, pingedServer.getStatus());
    }

    @Test
    public void testPingServer_NotFound() {
        when(serverRepo.findByIpAddress(anyString())).thenReturn(null);
        when(serverRepo.findByDomain(anyString())).thenReturn(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            serverService.ping("unknown.server");
        });

        assertEquals("Server with IP or domain unknown.server not found", exception.getMessage());
    }

    @Test
    public void testUpdateServer() {
        when(serverRepo.save(any(Server.class))).thenReturn(server);

        Server updatedServer = serverService.update(server);

        assertNotNull(updatedServer);
        assertEquals("Test Server", updatedServer.getName());
        verify(serverRepo, times(1)).save(server);
        verify(serverHistoryService, times(1)).addHistoryEntry(any(ServerHistory.class));
        verify(recentActivityRepo, times(1)).save(any(RecentActivity.class));
    }

    @Test
    public void testDeleteServer() {
        doNothing().when(serverRepo).deleteById(1L);

        Boolean result = serverService.delete(1L);

        assertTrue(result);
        verify(serverRepo, times(1)).deleteById(1L);
        verify(recentActivityRepo, times(1)).save(any(RecentActivity.class));
    }

    @Test
    public void testCountTotalServers() {
        when(serverRepo.count()).thenReturn(5L);

        Long totalServers = serverService.countTotalServers();

        assertEquals(5L, totalServers);
        verify(serverRepo, times(1)).count();
    }

    @Test
    public void testCountServersByStatus() {
        when(serverRepo.countByStatus(SERVER_UP)).thenReturn(3L);

        Long serversUp = serverService.countServersByStatus("SERVER_UP");

        assertEquals(3L, serversUp);
        verify(serverRepo, times(1)).countByStatus(SERVER_UP);
    }
}
