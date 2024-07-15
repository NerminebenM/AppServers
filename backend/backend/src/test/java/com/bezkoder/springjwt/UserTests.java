package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.validation.Validator;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class UserTests {

    @Mock
    private UserRepository userRepository;

    private Validator validator;

   /* @Test
    public void testUserValidation() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();

        User user = new User("testuser", "testemail@example.com", "testpassword");

        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertTrue(violations.isEmpty());
    }*/

    @Test
    public void testUserGettersAndSetters() {
        User user = new User("testuser", "testemail@example.com", "testpassword");

        // Test getters
        assertEquals("testuser", user.getUsername());
        assertEquals("testemail@example.com", user.getEmail());
        assertEquals("testpassword", user.getPassword());

        // Test setters
        user.setUsername("newusername");
        user.setEmail("newemail@example.com");
        user.setPassword("newpassword");

        assertEquals("newusername", user.getUsername());
        assertEquals("newemail@example.com", user.getEmail());
        assertEquals("newpassword", user.getPassword());
    }
}
