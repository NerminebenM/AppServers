package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Employee;
import com.bezkoder.springjwt.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        logger.info("Fetched {} employees from repository.", employees.size());
        return employees;
    }

    public List<Employee> searchEmployees(String query) {
        return employeeRepository.findByNomContainingOrPrenomContainingOrMatriculeContaining(query, query, query);
    }

    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public boolean existsByMatricule(String matricule) {
        return employeeRepository.existsByMatricule(matricule);
    }

    public void deleteEmployeeByMatricule(String matricule) {
        Employee employee = employeeRepository.findByMatricule(matricule);
        if (employee == null) {
            throw new EntityNotFoundException("Employee with matricule " + matricule + " not found.");
        }
        employeeRepository.delete(employee);
    }

    public void updateEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public Employee getEmployeeByMatricule(String matricule) {
        Employee employee = employeeRepository.findByMatricule(matricule);
        if (employee == null) {
            throw new EntityNotFoundException("Employee with matricule " + matricule + " not found.");
        }
        return employee;
    }
}
