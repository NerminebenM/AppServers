package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String message;
    private String recipient;
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "`read`")
    private boolean read;

    public Notification(User user, String title, String message, String recipient) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.recipient = recipient;
        this.timestamp = LocalDateTime.now();
        this.read = false;
    }
}
