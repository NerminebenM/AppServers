package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id,
                                               @RequestParam("username") String username,
                                               @RequestParam("email") String email,
                                               @RequestParam(value = "photo", required = false) MultipartFile photo,
                                               @RequestParam("motDePasse") String motDePasse) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(motDePasse); // Assurez-vous de hasher le mot de passe avant de le stocker

            if (photo != null && !photo.isEmpty()) {
                try {
                    String photoUrl = savePhoto(photo);
                    user.setPhoto(photoUrl);
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("Could not save photo: " + e.getMessage());
                }
            }

            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{username}")
    public ResponseEntity<String> updateUserByUsername(@PathVariable String username, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword()); // Assurez-vous de hasher le mot de passe avant de le stocker

        userRepository.save(user);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUserByUsername(@PathVariable String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        userRepository.delete(optionalUser.get());
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    private String savePhoto(MultipartFile photo) {
        return "https://example.com/photos/" + photo.getOriginalFilename();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("username") String username) {
        List<User> users = userRepository.findByUsernameContaining(username);
        return ResponseEntity.ok(users);
    }


   /* @PutMapping("/{userId}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }*/
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}
