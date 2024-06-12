
package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ClusterHealth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClusterHealthRepo extends JpaRepository<ClusterHealth, Long> {
    ClusterHealth findFirstByOrderByIdAsc();
}