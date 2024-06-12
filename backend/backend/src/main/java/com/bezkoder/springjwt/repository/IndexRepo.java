package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Index;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndexRepo extends JpaRepository<Index, Long> {
}
