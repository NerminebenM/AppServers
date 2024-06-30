package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

@Entity
public class Employee {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private String id;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("prenom")
    private String prenom;

    @JsonProperty("matricule")
    private String matricule;

    @JsonProperty("localisation")
    private String localisation;

    @JsonProperty("departement")
    private String departement;

    @JsonProperty("poste")
    private String poste;

    @ManyToOne // Un employé est associé à un utilisateur
    private User user; // Référence vers l'utilisateur

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Role> roles;


    public Employee(String nom, String prenom, String matricule, String localisation, String departement, String poste) {
        this.nom = nom;
        this.prenom = prenom;
        this.matricule = matricule;
        this.localisation = localisation;
        this.departement = departement;
        this.poste = poste;
    }

    public Employee() {

    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }


    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }
}
