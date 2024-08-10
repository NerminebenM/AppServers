package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.FileUploadUtil;
import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.bezkoder.springjwt.repository.EmployeeRepository.logger;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDetailsServiceImpl userService; // Inject the service
    @Autowired
    private PasswordEncoder passwordEncoder;

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
            user.setPassword(passwordEncoder.encode(motDePasse)); // Hash the password

            if (photo != null && !photo.isEmpty()) {
                try {
                    String fileName = StringUtils.cleanPath(photo.getOriginalFilename());
                    String uploadDir = "user-photos/" + user.getId();
                    FileUploadUtil.saveFile(uploadDir, fileName, photo);
                    user.setPhoto(uploadDir + "/" + fileName);
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("Could not save photo: " + e.getMessage());
                }
            }

            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateUserByUsername(@PathVariable String username, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "User not found"));
        }

        User user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword()); // Assurez-vous de hasher le mot de passe avant de le stocker

        userRepository.save(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "User updated successfully"));
    }


    @RequestMapping(value = "/delete/{username}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        try {
            userService.deleteUserByUsername(username);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            // Log a specific message for not found
            logger.error("User not found with username: " + username, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            // Log the general error
            logger.error("Error deleting user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user: " + e.getMessage());
        }
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
