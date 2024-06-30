package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void sendNotification(User user, String message, String recipient) {
        Notification notification = new Notification(user);
        notification.setUser(user);
        notification.setMessage(message);
        notification.setRecipient(recipient);

        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByUserAndReadFalse(user);
    }

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public void saveNotification(Notification notification, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + userId));

        notification.setUser(user);
        notificationRepository.save(notification);
    }
}
