package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.ClusterHealth;
import com.bezkoder.springjwt.models.ClusterStatistics;

public interface ClusterService {
    ClusterStatistics getClusterStatistics();
    ClusterHealth getClusterHealth();
}
