package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    Optional<Alert> findByEmail(String email);
}

