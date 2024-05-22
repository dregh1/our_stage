package org.dre.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.*;

import java.sql.Timestamp;
@Entity
public class SessionCd  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id  ;

    private Integer idDirection;
    @JsonProperty("ref")
    private  String ref ;

    @JsonProperty("dateCloture")
    private Timestamp dateCloture;

    @JsonProperty("dateFermeture")
    private Timestamp dateFermeture;
    @JsonProperty("dateDebut")
    private Timestamp dateDebut;

    @JsonProperty("tauxEur")
    private float tauxEur;

    @JsonProperty("tauxUsd")
    private float tauxUsd;


    @JsonProperty("tauxMga ")
    private float tauxMga;

    private boolean estFerme;


    public Timestamp getDateFermeture() {
        return dateFermeture;
    }

    public void setDateFermeture(Timestamp dateFermeture) {
        this.dateFermeture = dateFermeture;
    }

    public boolean isEstFerme() {
        return estFerme;
    }

    public Timestamp getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Timestamp dateDebut) {
        this.dateDebut = dateDebut;
    }

    public void setEstFerme(boolean estFerme) {
        this.estFerme = estFerme;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdDirection() {
        return idDirection;
    }

    public void setIdDirection(Integer idDirection) {
        this.idDirection = idDirection;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public Timestamp getDateCloture() {
        return dateCloture;
    }

    public void setDateCloture(Timestamp dateCloture) {
        this.dateCloture = dateCloture;
    }

    public float getTauxEur() {
        return tauxEur;
    }

    public void setTauxEur(float tauxEur) {
        this.tauxEur = tauxEur;
    }

    public float getTauxUsd() {
        return tauxUsd;
    }

    public void setTauxUsd(float tauxUsd) {
        this.tauxUsd = tauxUsd;
    }



    public float getTauxMga() {
        return tauxMga;
    }

    public void setTauxMga(float tauxMga) {
        this.tauxMga = tauxMga;
    }
}
