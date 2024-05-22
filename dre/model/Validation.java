package org.dre.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Validation {
    @Id
    private Long id ;
    private String devise ;
    private String motif         ;
    private Long idFournisseur;
    private String fournisseur ;
    private Long idPeriode;
    private String periode ;
    private Long idAvisAchat ;
    private String comsAchat ;
    private Long idAvisCdg ;
    private String comsCdg ;
    private Long idDecision ;
    private String comsCd ;
    private Long montant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Long getIdFournisseur() {
        return idFournisseur;
    }

    public void setIdFournisseur(Long idFournisseur) {
        this.idFournisseur = idFournisseur;
    }

    public String getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Long getIdPeriode() {
        return idPeriode;
    }

    public void setIdPeriode(Long idPeriode) {
        this.idPeriode = idPeriode;
    }

    public String getPeriode() {
        return periode;
    }

    public void setPeriode(String periode) {
        this.periode = periode;
    }

    public Long getIdAvisAchat() {
        return idAvisAchat;
    }

    public void setIdAvisAchat(Long idAvisAchat) {
        this.idAvisAchat = idAvisAchat;
    }

    public String getComsAchat() {
        return comsAchat;
    }

    public void setComsAchat(String comsAchat) {
        this.comsAchat = comsAchat;
    }

    public Long getIdAvisCdg() {
        return idAvisCdg;
    }

    public void setIdAvisCdg(Long idAvisCdg) {
        this.idAvisCdg = idAvisCdg;
    }

    public String getComsCdg() {
        return comsCdg;
    }

    public void setComsCdg(String comsCdg) {
        this.comsCdg = comsCdg;
    }

    public Long getIdDecision() {
        return idDecision;
    }

    public void setIdDecision(Long idDecision) {
        this.idDecision = idDecision;
    }

    public String getComsCd() {
        return comsCd;
    }

    public void setComsCd(String comsCd) {
        this.comsCd = comsCd;
    }

    public Long getMontant() {
        return montant;
    }

    public void setMontant(Long montant) {
        this.montant = montant;
    }
}
