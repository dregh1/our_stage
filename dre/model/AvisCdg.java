package org.dre.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AvisCdg {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  Long idDemande;
    private  String commentaire;
    private  double montantBudgetMensuel;
    private  double montantEngage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdDemande() {
        return idDemande;
    }

    public void setIdDemande(Long idDemande) {
        this.idDemande = idDemande;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }


    public double getMontantBudgetMensuel() {
        return montantBudgetMensuel;
    }

    public void setMontantBudgetMensuel(double montantBudgetMensuel) {
        this.montantBudgetMensuel = montantBudgetMensuel;
    }

    public double getMontantEngage() {
        return montantEngage;
    }

    public void setMontantEngage(double montantEngage) {
        this.montantEngage = montantEngage;
    }
}
