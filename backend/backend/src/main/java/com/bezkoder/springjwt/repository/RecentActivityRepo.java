package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.RecentActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecentActivityRepo extends JpaRepository<RecentActivity, Long> {
}
