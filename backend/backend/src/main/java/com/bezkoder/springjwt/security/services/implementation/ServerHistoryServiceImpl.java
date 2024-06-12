/*package com.bezkoder.springjwt.security.services.implementation;
// package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.repository.ServerHistoryRepository;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.bezkoder.springjwt.repository.EmployeeRepository.logger;

@Service
public class ServerHistoryServiceImpl implements ServerHistoryService {

    @Autowired
    private final ServerHistoryRepository serverHistoryRepository;

    public ServerHistoryServiceImpl(ServerHistoryRepository serverHistoryRepository) {
        this.serverHistoryRepository = serverHistoryRepository;
    }

    @Override
    public void addHistoryEntry(ServerHistory historyEntry) {
        serverHistoryRepository.save(historyEntry);
    }

    @Override
    public List<ServerHistory> getRecentActivities() {
        List<ServerHistory> activities = serverHistoryRepository.findTop10ByOrderByModificationTimeDesc();
        logger.debug("Recent Activities: {}", activities);
        return activities;
    }

    @Override
    public Page<ServerHistory> getHistoryForServer(Long serverId, Pageable pageable) {
        return serverHistoryRepository.findByServerId(serverId, pageable);
    }
}
*/
package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.models.ServerHistory;
import com.bezkoder.springjwt.repository.ServerHistoryRepository;
import com.bezkoder.springjwt.security.services.ServerHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerHistoryServiceImpl implements ServerHistoryService {

    @Autowired
    private ServerHistoryRepository serverHistoryRepository;

    @Override
    public void addHistoryEntry(ServerHistory historyEntry) {
        serverHistoryRepository.save(historyEntry);
    }

    @Override
    public List<ServerHistory> getRecentActivities() {
        return serverHistoryRepository.findTop10ByOrderByModificationTimeDesc();
    }

    @Override
    public Page<ServerHistory> getHistoryForServer(Long serverId, Pageable pageable) {
        return serverHistoryRepository.findByServerId(serverId, pageable);
    }

    @Override
    public List<ServerHistory> getHistoryForServer(Long serverId) { // Implement the new method
        return serverHistoryRepository.findByServerId(serverId);
    }
}
