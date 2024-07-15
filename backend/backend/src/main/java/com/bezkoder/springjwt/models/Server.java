package com.bezkoder.springjwt.models;

import com.bezkoder.springjwt.enumeration.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    //  @NotEmpty(message = "IP Address cannot be empty or null")
    private String ipAddress;
    private String name;
    private String memory;
    private String type;
    private  String imageUrl;
    @Column(unique = true)
    private String domain;

    @Enumerated(EnumType.STRING)
    private Status status;
    //  @Transient
    private double cpuUsage;
    //  @Transient
    private double memoryUsage;
    //  @Transient
    private double networkBandwidth;
    @ManyToOne
    @JoinColumn(name = "cluster_id")
    private Cluster cluster;
    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL)
    private List<ServerHistory> history;
    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClusterHealth> clusterHealths;
    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClusterStatistics> clusterStatistics;
    /* @OneToMany(mappedBy = "server", cascade = CascadeType.ALL, orphanRemoval = true)
     private List<Index> indices;*/
    // Getters and Setters for the new field
    public Server(String ipAddress, String name, String memory, String type, String imageUrl, String domain, Status status, double cpuUsage, double memoryUsage, double networkBandwidth, Cluster cluster) {
        this.ipAddress = ipAddress;
        this.name = name;
        this.memory = memory;
        this.type = type;
        this.imageUrl = imageUrl;
        this.domain = domain;
        this.status = status;
        this.cpuUsage = cpuUsage;
        this.memoryUsage = memoryUsage;
        this.networkBandwidth = networkBandwidth;
        this.cluster = cluster;
    }

    public List<ClusterHealth> getClusterHealths() {
        return clusterHealths;
    }

    public void setClusterHealths(List<ClusterHealth> clusterHealths) {
        this.clusterHealths = clusterHealths;
    }

    public List<ClusterStatistics> getClusterStatistics() {
        return clusterStatistics;
    }

    public void setClusterStatistics(List<ClusterStatistics> clusterStatistics) {
        this.clusterStatistics = clusterStatistics;
    }

    /* public List<Index> getIndices() {
         return indices;
     }

     public void setIndices(List<Index> indices) {
         this.indices = indices;
     }
 */
    private boolean alertSent;
   /* @OneToMany(mappedBy = "server", cascade = CascadeType.ALL)
    private List<MonitoredService> services;*/
}
