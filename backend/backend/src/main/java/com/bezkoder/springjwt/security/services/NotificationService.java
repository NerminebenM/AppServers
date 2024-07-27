package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender emailSender;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository, JavaMailSender emailSender) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    public void sendNotification(String email, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Server Alert");
        mailMessage.setText(message);
        emailSender.send(mailMessage);

    }

    public void sendServerStatusNotification(User user, String message) {
        Notification notification = new Notification(user, "Server Status", message, user.getEmail());
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

    public List<Notification> getUnreadNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + userId));
        return notificationRepository.findByUserAndReadFalse(user);
    }
}
