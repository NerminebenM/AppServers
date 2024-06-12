package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.ServerHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServerHistoryService {

    void addHistoryEntry(ServerHistory historyEntry);
    List<ServerHistory> getRecentActivities();
    List<ServerHistory> getHistoryForServer(Long serverId); // Add this method

    Page<ServerHistory> getHistoryForServer(Long serverId, Pageable pageable);

}


