package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserAndReadFalse(User user);
    List<Notification> findByUserId(Long userId);
}
