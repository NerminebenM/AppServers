package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ClusterStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClusterStatisticsRepo extends JpaRepository<ClusterStatistics, Long> {
    ClusterStatistics findFirstByOrderByIdAsc();
}