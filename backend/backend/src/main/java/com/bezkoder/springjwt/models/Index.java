package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

@Entity


@Table(name = "`index`")
public class Index {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean closed;
    private Integer docs;
    private String name;
    private Long serverId;
    private Integer shards;
    private Long size;

    // Getters et setters
   /* @ManyToOne
    @JoinColumn(name = "server_id", nullable = false)
    private Server server;
    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }
    public Long getId() {
        return id;
    }*/

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    public Integer getDocs() {
        return docs;
    }

    public void setDocs(Integer docs) {
        this.docs = docs;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getServerId() {
        return serverId;
    }

    public void setServerId(Long serverId) {
        this.serverId = serverId;
    }

    public Integer getShards() {
        return shards;
    }

    public void setShards(Integer shards) {
        this.shards = shards;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}