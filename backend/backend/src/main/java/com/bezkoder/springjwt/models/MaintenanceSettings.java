package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int optimizeIndexesOlderThanDays;
    private int closeIndexesOlderThanDays;
    private int deleteIndexesOlderThanDays;
    private String repositoryToStoreSnapshots;
    private String deleteSnapshotsOlderThan;

    private String settingName;
    private String settingValue;
    private String description;
    private String createdBy;
    private String createdDate;
    private String lastModifiedBy;
    private String lastModifiedDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "maintenance_settings_id")
    private List<Repository> repositories;
    @ManyToOne
    @JoinColumn(name = "cluster_id")
    private Cluster cluster;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

}
