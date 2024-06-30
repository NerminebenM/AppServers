package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.response.MessageResponse;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;
import com.bezkoder.springjwt.security.jwt.UnauthorizedException;
import com.bezkoder.springjwt.security.services.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    Logger logger = LoggerFactory.getLogger(EmployeeController.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthController authController;
    @Autowired
    private EmployeeService employeeService;
    @PostMapping("/addWithUser")
    public ResponseEntity<?> addEmployeeWithUser(@RequestBody EmployeeWithUserDTO employeeWithUserDTO) {
        try {
            Employee employee = employeeWithUserDTO.getEmployee();
            String username = employeeWithUserDTO.getUsername();
            String email = employeeWithUserDTO.getEmail();
            String password = employeeWithUserDTO.getPassword();

            // Vérifier si le nom d'utilisateur est déjà pris
            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }

            // Vérifier si l'email est déjà utilisé
            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
            }

            // Ajouter l'employé
            employeeService.addEmployee(employee);

            // Créer le compte utilisateur pour l'employé
            User user = new User(username, email, encoder.encode(password));
            user.setRoles(Set.of(new Role(ERole.ROLE_USER)));
            userRepository.save(user);

            return ResponseEntity.ok("Employee and user added successfully");
        } catch (Exception e) {
            logger.error("Error adding employee and user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding employee and user");
        }
    }


    @GetMapping("/all")
    public List<Employee> getAllEmployees(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);


            if (JwtUtils.validateJwtToken(jwtToken)) {
                return employeeService.getAllEmployees();
            }
        }

        throw new UnauthorizedException("Invalid or missing token");
    }
    @GetMapping("/search")
    public List<Employee> searchEmployees(@RequestParam("query") String query) {
        return employeeService.searchEmployees(query);
    }

    /*@PostMapping("/add")
    public String importEmployees(@RequestParam("file") MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {

                String[] data = line.split("[,;]");
                Employee employee = new Employee(data[4], data[6], data[3], data[2], data[1], data[5]);
                employeeService.addEmployee(employee);
            }
            return "Employés importés avec succès !";
        } catch (IOException e) {
            e.printStackTrace();
            return "Erreur lors de l'importation des employés : " + e.getMessage();
        }
    }
*/
    @PutMapping("/update/{matricule}")
    public ResponseEntity<String> updateEmployee(@PathVariable String matricule, @RequestBody Employee updatedEmployee) {
        try {
            Employee existingEmployee = employeeService.getEmployeeByMatricule(matricule);

            if (existingEmployee == null) {
                logger.error("Employee with matricule {} not found", matricule);
                return new ResponseEntity<>("Employé non trouvé", HttpStatus.NOT_FOUND);
            } else {
                existingEmployee.setNom(updatedEmployee.getNom());
                existingEmployee.setPrenom(updatedEmployee.getPrenom());
                existingEmployee.setLocalisation(updatedEmployee.getLocalisation());
                existingEmployee.setDepartement(updatedEmployee.getDepartement());
                existingEmployee.setPoste(updatedEmployee.getPoste());

                employeeService.updateEmployee(existingEmployee);

                logger.info("Employee with matricule {} updated successfully", matricule);
                return new ResponseEntity<>("Employé mis à jour avec succès !", HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error updating employee with matricule {}: {}", matricule, e.getMessage());
            return new ResponseEntity<>("Erreur lors de la mise à jour de l'employé", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String username) {
        if(employeeService.existsByMatricule(username)) {
            employeeService.deleteEmployeeByMatricule(username);
            return new ResponseEntity<>("Employé supprimé avec succès !", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employé non trouvé", HttpStatus.NOT_FOUND);
        }
    }






}
