package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Employee;
import com.bezkoder.springjwt.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        System.out.println("Employees fetched from repository: " + employees);
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
        employeeRepository.delete(employeeRepository.findByMatricule(matricule));
    }

    public void updateEmployee(Employee employee) {
        employeeRepository.save(employee);
    }
    public Employee getEmployeeByMatricule(String matricule) {
        return employeeRepository.findByMatricule(matricule);
    }

}
