package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ServerHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ServerHistoryRepository extends JpaRepository<ServerHistory, Long> {


    List<ServerHistory> findByServerId(Long serverId);
    List<ServerHistory> findTop10ByOrderByModificationTimeDesc();

    Page<ServerHistory> findByServerId(Long serverId, Pageable pageable);
}
