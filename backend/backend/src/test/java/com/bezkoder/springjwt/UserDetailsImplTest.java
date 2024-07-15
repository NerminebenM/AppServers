package com.bezkoder.springjwt;


import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserDetailsImplTest {

    @Test
    public void testBuild() {
        Set<Role> roles = new HashSet<>();
        Role role = new Role(ERole.ROLE_USER);
        roles.add(role);

        User user = new User(1L, "testuser", "testemail@example.com", "testpassword", roles);

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        assertEquals(user.getId(), userDetails.getId());
        assertEquals(user.getUsername(), userDetails.getUsername());
        assertEquals(user.getEmail(), userDetails.getEmail());
        assertEquals(user.getPassword(), userDetails.getPassword());

        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Test
    public void testGetters() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "testemail@example.com", "testpassword", authorities);

        assertEquals(1L, userDetails.getId());
        assertEquals("testuser", userDetails.getUsername());
        assertEquals("testemail@example.com", userDetails.getEmail());
        assertEquals("testpassword", userDetails.getPassword());
        assertEquals(authorities, userDetails.getAuthorities());
    }

    @Test
    public void testEquals() {
        UserDetailsImpl userDetails1 = new UserDetailsImpl(1L, "testuser", "testemail@example.com", "testpassword", new HashSet<>());
        UserDetailsImpl userDetails2 = new UserDetailsImpl(1L, "testuser", "testemail@example.com", "testpassword", new HashSet<>());

        assertTrue(userDetails1.equals(userDetails2));
    }
}