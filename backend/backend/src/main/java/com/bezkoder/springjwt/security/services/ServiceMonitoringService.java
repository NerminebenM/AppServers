package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.repository.MonitoredServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServiceMonitoringService {
    @Autowired
    private MonitoredServiceRepository monitoredServiceRepository;

    public List<MonitoredService> getAllServices() {
        return monitoredServiceRepository.findAll();
    }

    public MonitoredService getServiceById(Long id) {
        return monitoredServiceRepository.findById(id).orElse(null);
    }

    public MonitoredService saveService(MonitoredService service) {
        return monitoredServiceRepository.save(service);
    }

    public void deleteService(Long id) {
        monitoredServiceRepository.deleteById(id);
    }

    public List<MonitoredService> getServicesByStatus(String status) {
        return monitoredServiceRepository.findByStatus(status);
    }

    public List<MonitoredService> getServicesByServer(Server server) {
        return monitoredServiceRepository.findByServer(server);
    }

    public void checkServiceStatus(MonitoredService service) {
        try {
            URL url = new URL(service.getUrl());
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            int code = connection.getResponseCode();
            if (code == 200) {
                service.setStatus("UP");
            } else {
                service.setStatus("DOWN");
            }
        } catch (Exception e) {
            service.setStatus("DOWN");
        }
        monitoredServiceRepository.save(service);
    }
    public Map<String, List<Integer>> getServiceStatusTrend() {
        Map<String, List<Integer>> statusTrend = new HashMap<>();

        List<MonitoredService> services = monitoredServiceRepository.findAll();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        for (MonitoredService service : services) {
            String status = service.getStatus();
            String dateKey = formatter.format(service.getCreatedAt());

            List<Integer> statusCount = statusTrend.getOrDefault(dateKey, new ArrayList<>());
            int index = getStatusIndex(status);
            while (statusCount.size() <= index) {
                statusCount.add(0);
            }
            statusCount.set(index, statusCount.get(index) + 1);
            statusTrend.put(dateKey, statusCount);
        }

        return statusTrend;
    }

    public Map<String, Integer> getServiceStatusDistribution() {
        Map<String, Integer> statusDistribution = new HashMap<>();

        List<MonitoredService> services = monitoredServiceRepository.findAll();

        for (MonitoredService service : services) {
            String status = service.getStatus();
            statusDistribution.put(status, statusDistribution.getOrDefault(status, 0) + 1);
        }

        return statusDistribution;
    }

    private int getStatusIndex(String status) {
        if ("UP".equals(status)) {
            return 0;
        } else if ("DOWN".equals(status)) {
            return 1;
        } else {
            return -1;
        }
    }

}
