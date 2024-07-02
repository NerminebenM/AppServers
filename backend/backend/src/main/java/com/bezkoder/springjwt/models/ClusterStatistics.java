package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

@Entity
public class ClusterStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long documents;
    private String primarySize;
    private String totalSize;
    private Integer dataInstances;
    private Integer totalShards;
    private Integer indices;
    @ManyToOne
    @JoinColumn(name = "server_id", nullable = false)
    private Server server;


    // Getters et setters
    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDocuments() {
        return documents;
    }

    public void setDocuments(Long documents) {
        this.documents = documents;
    }

    public String getPrimarySize() {
        return primarySize;
    }

    public void setPrimarySize(String primarySize) {
        this.primarySize = primarySize;
    }

    public String getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(String totalSize) {
        this.totalSize = totalSize;
    }

    public Integer getDataInstances() {
        return dataInstances;
    }

    public void setDataInstances(Integer dataInstances) {
        this.dataInstances = dataInstances;
    }

    public Integer getTotalShards() {
        return totalShards;
    }

    public void setTotalShards(Integer totalShards) {
        this.totalShards = totalShards;
    }

    public Integer getIndices() {
        return indices;
    }

    public void setIndices(Integer indices) {
        this.indices = indices;
    }
}

