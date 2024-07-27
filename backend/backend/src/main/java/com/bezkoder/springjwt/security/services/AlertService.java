package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Alert;
import com.bezkoder.springjwt.models.Server;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.AlertRepository;
import com.bezkoder.springjwt.repository.ServerRepo;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AlertService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private ServerRepo serverRepo;

    @Autowired
    private UserRepository userRepository;

    public void createAlert(String message, String email) {
        Alert alert = new Alert();
        alert.setMessage(message);
        alert.setEmail(email);
        alert.setCreatedAt(LocalDateTime.now());

        alertRepository.save(alert);

        sendAlertEmail(message, email);
    }

    private void sendAlertEmail(String message, String email) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Service Alert");
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }

    public boolean serverExists(String ipAddress) {
        Server server = serverRepo.findByIpAddress(ipAddress);
        return server != null;
    }

    public boolean userExists(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }
}
