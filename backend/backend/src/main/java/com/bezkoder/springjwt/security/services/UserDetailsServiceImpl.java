package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.exception.ResourceNotFoundException;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    user.setStatus("online");
    userRepository.save(user);
    return UserDetailsImpl.build(user);
  }
  public List<User> searchUsers(String username) {
    return userRepository.findByUsernameContaining(username);
  }
  // UserService.java
 @Transactional
  public void deleteUserByUsername(String username) {
    // Ensure user exists before attempting deletion
    if (!userRepository.existsByUsername(username)) {
      throw new ResourceNotFoundException("User not found with username: " + username);
    }
    userRepository.deleteByUsername(username);
  }

}
