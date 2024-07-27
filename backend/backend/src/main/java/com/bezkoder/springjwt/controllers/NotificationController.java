package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.services.AlertService;
import com.bezkoder.springjwt.security.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notif")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final AlertService alertService;

    @Autowired
    public NotificationController(NotificationService notificationService, UserRepository userRepository, AlertService alertService) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.alertService = alertService;
    }

    @GetMapping("/user/{userId}/notifications")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return notificationService.getUserNotifications(user);
    }

    @PostMapping("/notifications/read/{notificationId}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/notifications/server")
    public ResponseEntity<Void> receiveServerStatusNotification(@RequestBody Map<String, Object> payload) {
        String message = (String) payload.get("message");
        Long userId = ((Number) payload.get("userId")).longValue();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        notificationService.sendServerStatusNotification(user, message);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}/notifications/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Notification> notifications = notificationService.getUserNotifications(user);
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/alerts")
    public ResponseEntity<String> createAlert(@RequestBody Map<String, Object> payload) {
        String message = (String) payload.get("message");
        String email = (String) payload.get("email");
        String ipAddress = (String) payload.get("ipAddress");

        // Verify if the server exists
        if (!alertService.serverExists(ipAddress)) {
            return ResponseEntity.badRequest().body("Server not found");
        }

        // Verify if the user email exists
        if (!alertService.userExists(email)) {
            return ResponseEntity.badRequest().body("User email not found");
        }

        // Create and send the alert
        alertService.createAlert(message, email);
        return ResponseEntity.ok("Alert sent successfully");
    }

}
