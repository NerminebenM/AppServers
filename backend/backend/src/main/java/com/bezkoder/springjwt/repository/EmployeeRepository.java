package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Logger logger = LoggerFactory.getLogger(EmployeeRepository.class);

    List<Employee> findAll();

    default List<Employee> getAllEmployees() {
        logger.info("Fetching all employees from the database");
        return findAll();
    }
    List<Employee> findByNomContainingOrPrenomContainingOrMatriculeContaining(String nom, String prenom, String matricule);

    Employee save(Employee employee);

    Employee findByMatricule(String matricule);

    boolean existsByMatricule(String matricule);

}
