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
    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL)
    private List<ServerHistory> history;

   /* @OneToMany(mappedBy = "server", cascade = CascadeType.ALL)
    private List<MonitoredService> services;*/
}
