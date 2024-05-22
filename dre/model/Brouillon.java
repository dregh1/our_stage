package org.dre.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Timestamp;

@Entity
public class Brouillon  {
    @Id
    private Integer id ;
    private Integer idtitre ;
    private String titre ;
    private String motif ;
    private double montantht ;
    private String typereference ;
    private String reference ;
    private boolean estregularisation ;
    private String comsprescripteur ;
    private Integer idrubrique ;
    private String nomrubrique ;
    private String sousrubrique ;
    private Integer idperiode ;
    private String periode ;
    private Integer iddirection ;
    private String devise ;
    private boolean validationprescripteur ;
    private boolean validationcdg ;
    private boolean validationachat ;
    private Integer idfournisseur ;
    private String fournisseur;

    private Integer idAvisCdg;
    private String comsCdg;
    private Integer idAvisAchat;
    private String comsAchat;


    private String comsCd;

    private double  montantMga;

    private Long idSession;
    private String refSession;
    private Timestamp debutSession;
    private Timestamp finSession;
    private String etatFinal;

    public String getRefSession() {
        return refSession;
    }

    public void setRefSession(String refSession) {
        this.refSession = refSession;
    }

    public Timestamp getDebutSession() {
        return debutSession;
    }

    public void setDebutSession(Timestamp debutSession) {
        this.debutSession = debutSession;
    }

    public Timestamp getFinSession() {
        return finSession;
    }

    public void setFinSession(Timestamp finSession) {
        this.finSession = finSession;
    }

    public String getEtatFinal() {
        return etatFinal;
    }

    public void setEtatFinal(String etatFinal) {
        this.etatFinal = etatFinal;
    }

    public Integer getIdAvisCdg() {
        return idAvisCdg;
    }

    public void setIdAvisCdg(Integer idAvisCdg) {
        this.idAvisCdg = idAvisCdg;
    }

    public String getComsCdg() {
        return comsCdg;
    }

    public void setComsCdg(String comsCdg) {
        this.comsCdg = comsCdg;
    }

    public Integer getIdAvisAchat() {
        return idAvisAchat;
    }

    public void setIdAvisAchat(Integer idAvisAchat) {
        this.idAvisAchat = idAvisAchat;
    }

    public String getComsAchat() {
        return comsAchat;
    }

    public void setComsAchat(String comsAchat) {
        this.comsAchat = comsAchat;
    }



    public String getComsCd() {
        return comsCd;
    }

    public void setComsCd(String comsCd) {
        this.comsCd = comsCd;
    }

    public double getMontantMga() {
        return montantMga;
    }

    public void setMontantMga(double montantMga) {
        this.montantMga = montantMga;
    }

    public Long getIdSession() {
        return idSession;
    }

    public void setIdSession(Long idSession) {
        this.idSession = idSession;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdtitre() {
        return idtitre;
    }

    public void setIdtitre(Integer idtitre) {
        this.idtitre = idtitre;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public double getMontantht() {
        return montantht;
    }

    public void setMontantht(double montantht) {
        this.montantht = montantht;
    }

    public String getTypereference() {
        return typereference;
    }

    public void setTypereference(String typereference) {
        this.typereference = typereference;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public boolean isEstregularisation() {
        return estregularisation;
    }

    public void setEstregularisation(boolean estregularisation) {
        this.estregularisation = estregularisation;
    }

    public String getComsprescripteur() {
        return comsprescripteur;
    }

    public void setComsprescripteur(String comsprescripteur) {
        this.comsprescripteur = comsprescripteur;
    }

    public Integer getIdrubrique() {
        return idrubrique;
    }

    public void setIdrubrique(Integer idrubrique) {
        this.idrubrique = idrubrique;
    }

    public String getNomrubrique() {
        return nomrubrique;
    }

    public void setNomrubrique(String nomrubrique) {
        this.nomrubrique = nomrubrique;
    }

    public String getSousrubrique() {
        return sousrubrique;
    }

    public void setSousrubrique(String sousrubrique) {
        this.sousrubrique = sousrubrique;
    }

    public Integer getIdperiode() {
        return idperiode;
    }

    public void setIdperiode(Integer idperiode) {
        this.idperiode = idperiode;
    }

    public String getPeriode() {
        return periode;
    }

    public void setPeriode(String periode) {
        this.periode = periode;
    }

    public Integer getIddirection() {
        return iddirection;
    }

    public void setIddirection(Integer iddirection) {
        this.iddirection = iddirection;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public boolean isValidationprescripteur() {
        return validationprescripteur;
    }

    public void setValidationprescripteur(boolean validationprescripteur) {
        this.validationprescripteur = validationprescripteur;
    }

    public boolean isValidationcdg() {
        return validationcdg;
    }

    public void setValidationcdg(boolean validationcdg) {
        this.validationcdg = validationcdg;
    }

    public boolean isValidationachat() {
        return validationachat;
    }

    public void setValidationachat(boolean validationachat) {
        this.validationachat = validationachat;
    }

    public Integer getIdfournisseur() {
        return idfournisseur;
    }

    public void setIdfournisseur(Integer idfournisseur) {
        this.idfournisseur = idfournisseur;
    }

    public String getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
    }
}
