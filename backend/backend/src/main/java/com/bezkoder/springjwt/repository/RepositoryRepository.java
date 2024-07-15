package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryRepository extends JpaRepository<Repository, Long> {
    // Ajoutez des méthodes spécifiques si nécessaire
}
