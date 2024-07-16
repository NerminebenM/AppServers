package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.repository.MonitoredServiceRepository;
import com.bezkoder.springjwt.security.services.ServiceMonitoringService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class ServiceMonitoringServiceTest {

    @Mock
    private MonitoredServiceRepository monitoredServiceRepository;

    @InjectMocks
    private ServiceMonitoringService serviceMonitoringService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllServices() {
        List<MonitoredService> services = Arrays.asList(new MonitoredService(), new MonitoredService());
        when(monitoredServiceRepository.findAll()).thenReturn(services);

        List<MonitoredService> result = serviceMonitoringService.getAllServices();

        assertEquals(2, result.size());
        verify(monitoredServiceRepository, times(1)).findAll();
    }

    @Test
    public void testGetServiceById() {
        MonitoredService service = new MonitoredService();
        when(monitoredServiceRepository.findById(anyLong())).thenReturn(Optional.of(service));

        MonitoredService result = serviceMonitoringService.getServiceById(1L);

        assertNotNull(result);
        verify(monitoredServiceRepository, times(1)).findById(1L);
    }

    @Test
    public void testSaveService() {
        MonitoredService service = new MonitoredService();
        when(monitoredServiceRepository.save(any(MonitoredService.class))).thenReturn(service);

        MonitoredService result = serviceMonitoringService.saveService(service);

        assertNotNull(result);
        verify(monitoredServiceRepository, times(1)).save(service);
    }

    @Test
    public void testDeleteService() {
        doNothing().when(monitoredServiceRepository).deleteById(anyLong());

        serviceMonitoringService.deleteService(1L);

        verify(monitoredServiceRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetServicesByStatus() {
        List<MonitoredService> services = Arrays.asList(new MonitoredService(), new MonitoredService());
        when(monitoredServiceRepository.findByStatus(anyString())).thenReturn(services);

        List<MonitoredService> result = serviceMonitoringService.getServicesByStatus("UP");

        assertEquals(2, result.size());
        verify(monitoredServiceRepository, times(1)).findByStatus("UP");
    }

    @Test
    public void testGetServicesByServer() {
        Server server = new Server();
        List<MonitoredService> services = Arrays.asList(new MonitoredService(), new MonitoredService());
        when(monitoredServiceRepository.findByServer(any(Server.class))).thenReturn(services);

        List<MonitoredService> result = serviceMonitoringService.getServicesByServer(server);

        assertEquals(2, result.size());
        verify(monitoredServiceRepository, times(1)).findByServer(server);
    }

    /*@Test
    public void testCheckServiceStatusUp() throws Exception {
        MonitoredService service = new MonitoredService();
        service.setUrl("http://test.com");

        HttpURLConnection mockConnection = mock(HttpURLConnection.class);
        when(mockConnection.getResponseCode()).thenReturn(200);

        URL mockUrl = mock(URL.class);
        when(mockUrl.openConnection()).thenReturn(mockConnection);

        serviceMonitoringService.checkServiceStatus(service);

        assertEquals("UP", service.getStatus());
        verify(monitoredServiceRepository, times(1)).save(service);
    }
*/
   /* @Test
    public void testCheckServiceStatusDown() throws Exception {
        MonitoredService service = new MonitoredService();
        service.setUrl("http://test.com");

        HttpURLConnection mockConnection = mock(HttpURLConnection.class);
        when(mockConnection.getResponseCode()).thenReturn(500);

        URL mockUrl = mock(URL.class);
        when(mockUrl.openConnection()).thenReturn(mockConnection);

        serviceMonitoringService.checkServiceStatus(service);

        assertEquals("DOWN", service.getStatus());
        verify(monitoredServiceRepository, times(1)).save(service);
    }*/

    @Test
    public void testCheckServiceStatusException() {
        MonitoredService service = new MonitoredService();
        service.setUrl("http://test.com");

        serviceMonitoringService.checkServiceStatus(service);

        assertEquals("DOWN", service.getStatus());
        verify(monitoredServiceRepository, times(1)).save(service);
    }

    @Test
    public void testGetServiceStatusTrend() {
        List<MonitoredService> services = new ArrayList<>();
        MonitoredService service1 = new MonitoredService();
        service1.setStatus("UP");
        service1.setCreatedAt(new Date());
        services.add(service1);

        when(monitoredServiceRepository.findAll()).thenReturn(services);

        Map<String, List<Integer>> result = serviceMonitoringService.getServiceStatusTrend();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(monitoredServiceRepository, times(1)).findAll();
    }

    @Test
    public void testGetServiceStatusDistribution() {
        List<MonitoredService> services = new ArrayList<>();
        MonitoredService service1 = new MonitoredService();
        service1.setStatus("UP");
        services.add(service1);

        when(monitoredServiceRepository.findAll()).thenReturn(services);

        Map<String, Integer> result = serviceMonitoringService.getServiceStatusDistribution();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(monitoredServiceRepository, times(1)).findAll();
    }
}
