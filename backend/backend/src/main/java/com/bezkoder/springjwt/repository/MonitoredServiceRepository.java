package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.MonitoredService;
import com.bezkoder.springjwt.models.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoredServiceRepository extends JpaRepository<MonitoredService, Long> {
    List<MonitoredService> findByStatus(String status);
    List<MonitoredService> findByServer(Server server);
}
