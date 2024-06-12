package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.RecentActivity;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.models.ServerHistory;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ServerService {
    Server create(Server server);
    Server ping(String address) throws IOException;
   // Collection<Server> list(int limit);
    List<Server> list(int limit);
    List<ServerHistory> getServerHistory(Long serverId);
    List<RecentActivity> getRecentActivities();
    Map<String, Object> getServerStatistics();
    Server get(Long id);
    Server update(Server server);
    Boolean delete(Long id);
    Long countTotalServers();
    Long countServersByStatus(String status);
   // void sendAlertEmail(String subject, String body);
   //List<Server> getAllServer();

}
