package org.dre.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.dre.service.EmailService;

@Entity

public class Demande   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("idTitreDepense") // Annotation pour personnaliser le nom de la propriété dans JSON
    private Long idTitreDepense;
    @JsonProperty("motif") // Annotation pour personnaliser le nom de la propriété dans JSON
    private String motif;
    @JsonProperty("idFournisseur") // Annotation pour personnaliser le nom de la propriété dans JSON
    private Long idFournisseur;

    @JsonProperty("estRegularisation") // Annotation pour personnaliser le nom de la propriété dans JSON
    private boolean estregularisation;
    private String comsPrescripteur;

    private Integer idDirection;
    @JsonProperty("idPeriode") // Annotation pour personnaliser le nom de la propriété dans JSON
    private Long idPeriode;

    private String typeReference;

    private String nomReference;
    private Integer idRubrique;
    private Long idSession;
    private String sousRubrique;
    private String typeDevise;
    @JsonProperty("montantHt") // Annotation pour personnaliser le nom de la propriété dans JSON
    private double montantHt;
    private String etatFinal;
    private boolean validationAchat;
    private boolean validationPrescripteur;
    private boolean validationCdg;

    private String comsCd;
    private boolean estSupprime;

    private boolean estRefuseAchat;
    private boolean estSoumis;

    private boolean estRefuseCdg;

    private String depense;

    public String getDepense() {
        return depense;
    }

    public void setDepense(String depense) {
        this.depense = depense;
    }

    public boolean isEstRefuseAchat() {
        return estRefuseAchat;
    }

    public void setEstRefuseAchat(boolean estRefuseAchat) {
        this.estRefuseAchat = estRefuseAchat;
    }

    public boolean isEstRefuseCdg() {
        return estRefuseCdg;
    }

    public void setEstRefuseCdg(boolean estRefuseCdg) {
        this.estRefuseCdg = estRefuseCdg;
    }

    public String getComsCd() {
        return comsCd;
    }

    public void setComsCd(String comsCd) {
        this.comsCd = comsCd;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdTitreDepense() {
        return idTitreDepense;
    }

    public void setIdTitreDepense(Long idTitreDepense) {
        this.idTitreDepense = idTitreDepense;
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

    public boolean isEstregularisation() {
        return estregularisation;
    }

    public void setEstregularisation(boolean estregularisation) {
        this.estregularisation = estregularisation;
    }

    public String getComsPrescripteur() {
        return comsPrescripteur;
    }

    public void setComsPrescripteur(String comsPrescripteur) {
        this.comsPrescripteur = comsPrescripteur;
    }

    public Integer getIdDirection() {
        return idDirection;
    }

    public void setIdDirection(Integer idDirection) {
        this.idDirection = idDirection;
    }

    public Long getIdPeriode() {
        return idPeriode;
    }

    public void setIdPeriode(Long idPeriode) {
        this.idPeriode = idPeriode;
    }

    public String getTypeReference() {
        return typeReference;
    }

    public void setTypeReference(String typeReference) {
        this.typeReference = typeReference;
    }

    public String getNomReference() {
        return nomReference;
    }

    public void setNomReference(String nomReference) {
        this.nomReference = nomReference;
    }

    public Integer getIdRubrique() {
        return idRubrique;
    }

    public void setIdRubrique(Integer idRubrique) {
        this.idRubrique = idRubrique;
    }

    public String getSousRubrique() {
        return sousRubrique;
    }

    public void setSousRubrique(String sousRubrique) {
        this.sousRubrique = sousRubrique;
    }

    public String getTypeDevise() {
        return typeDevise;
    }

    public void setTypeDevise(String typeDevise) {
        this.typeDevise = typeDevise;
    }

    public double getMontantHt() {
        return montantHt;
    }

    public void setMontantHt(double montantHt) {
        this.montantHt = montantHt;
    }

    public String getEtatFinal() {
        return etatFinal;
    }

    public void setEtatFinal(String etatFinal) {
        this.etatFinal = etatFinal;
    }

    public boolean isValidationAchat() {
        return validationAchat;
    }

    public void setValidationAchat(boolean validationAchat)
    {
        //  si qqcn valide

        //  si qqcn refuse
        this.validationAchat = validationAchat;
    }

    public boolean isValidationPrescripteur() {
        return validationPrescripteur;
    }

    public void setValidationPrescripteur(boolean validationPrescripteur) {
        //  si qqcn valide
            if(validationPrescripteur)
            {
               EmailService es = new EmailService();

//               es.notifValidationPrescripteur();

            }
        //  si qqcn refuse
        this.validationPrescripteur = validationPrescripteur;
    }

    public boolean isValidationCdg() {
        return validationCdg;
    }

    public void setValidationCdg(boolean validationCdg) {
        this.validationCdg = validationCdg;
    }

    public boolean isEstSupprime() {
        return estSupprime;
    }

    public void setEstSupprime(boolean estSupprime) {
        this.estSupprime = estSupprime;
    }

    public Long getIdSession() {
        return idSession;
    }

    public void setIdSession(Long idSession) {
        this.idSession = idSession;
    }

    public boolean isEstSoumis() {
        return estSoumis;
    }

    public void setEstSoumis(boolean estSoumis) {
        this.estSoumis = estSoumis;
    }
}