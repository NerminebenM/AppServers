package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

@Entity
public class ClusterHealth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private Boolean timedOut;
    private Integer instances;
    private Integer dataInstances;
    private Integer activePrimaryShards;
    private Integer activeShards;
    private Integer relocatingShards;
    private Integer initializingShards;
    private Integer unassignedShards;

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getTimedOut() {
        return timedOut;
    }

    public void setTimedOut(Boolean timedOut) {
        this.timedOut = timedOut;
    }

    public Integer getInstances() {
        return instances;
    }

    public void setInstances(Integer instances) {
        this.instances = instances;
    }

    public Integer getDataInstances() {
        return dataInstances;
    }

    public void setDataInstances(Integer dataInstances) {
        this.dataInstances = dataInstances;
    }

    public Integer getActivePrimaryShards() {
        return activePrimaryShards;
    }

    public void setActivePrimaryShards(Integer activePrimaryShards) {
        this.activePrimaryShards = activePrimaryShards;
    }

    public Integer getActiveShards() {
        return activeShards;
    }

    public void setActiveShards(Integer activeShards) {
        this.activeShards = activeShards;
    }

    public Integer getRelocatingShards() {
        return relocatingShards;
    }

    public void setRelocatingShards(Integer relocatingShards) {
        this.relocatingShards = relocatingShards;
    }

    public Integer getInitializingShards() {
        return initializingShards;
    }

    public void setInitializingShards(Integer initializingShards) {
        this.initializingShards = initializingShards;
    }

    public Integer getUnassignedShards() {
        return unassignedShards;
    }

    public void setUnassignedShards(Integer unassignedShards) {
        this.unassignedShards = unassignedShards;
    }
}
