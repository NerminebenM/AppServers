package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Server;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

public class MonitoredServiceTest {

    private MonitoredService monitoredService;

    @Mock
    private Server server;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        monitoredService = new MonitoredService();
        server = mock(Server.class);
    }

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        String name = "Test Service";
        String url = "http://testservice.com";
        String status = "Active";
        String description = "Test description";
        Date createdAt = new Date();

        monitoredService.setId(id);
        monitoredService.setName(name);
        monitoredService.setUrl(url);
        monitoredService.setStatus(status);
        monitoredService.setDescription(description);
        monitoredService.setServer(server);
        monitoredService.setCreatedAt(createdAt);

        assertEquals(id, monitoredService.getId());
        assertEquals(name, monitoredService.getName());
        assertEquals(url, monitoredService.getUrl());
        assertEquals(status, monitoredService.getStatus());
        assertEquals(description, monitoredService.getDescription());
        assertEquals(server, monitoredService.getServer());
        assertEquals(createdAt, monitoredService.getCreatedAt());
    }
    @Test
    public void testSetNameThrowsExceptionWhenNameIsNull() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            monitoredService.setName(null);
        });
        assertEquals("Name cannot be null", thrown.getMessage());
    }
}
