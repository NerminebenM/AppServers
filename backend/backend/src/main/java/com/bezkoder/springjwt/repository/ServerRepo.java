package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.enumeration.Status;
import com.bezkoder.springjwt.models.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepo extends JpaRepository<Server, Long> {
    Server findByIpAddress(String ipAdress);
List<Server> findAll();
    Long countByStatus(String status);
    Server findByDomain(String domain);

    Long countByStatus(Status serverStatus);
    Server findByIpAddressOrDomain(String ipAddress, String domain);

}
