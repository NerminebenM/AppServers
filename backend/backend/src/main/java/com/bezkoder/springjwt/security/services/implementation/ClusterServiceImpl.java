package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.models.ClusterHealth;
import com.bezkoder.springjwt.models.ClusterStatistics;
import com.bezkoder.springjwt.repository.ClusterHealthRepo;
import com.bezkoder.springjwt.repository.ClusterStatisticsRepo;
import com.bezkoder.springjwt.security.services.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClusterServiceImpl implements ClusterService {
    private final ClusterStatisticsRepo clusterStatisticsRepo;
    private final ClusterHealthRepo clusterHealthRepo;

    @Override
    public ClusterStatistics getClusterStatistics() {
        return clusterStatisticsRepo.findFirstByOrderByIdAsc();
    }

    @Override
    public ClusterHealth getClusterHealth() {
        return clusterHealthRepo.findFirstByOrderByIdAsc();
    }
}
