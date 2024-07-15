package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Cluster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClusterRepository extends JpaRepository<Cluster, Long> {
}
