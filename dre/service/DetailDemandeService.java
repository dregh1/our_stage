package org.dre.service;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.dre.model.*;
import org.dre.repository.DemandeRepository;
import org.dre.repository.DetailDemandeRepository;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class DetailDemandeService {
    @Inject
    EntityManager entityManager;
    @Inject
    DetailDemandeRepository detailDemandeRepository;

    @Transactional
    public void create(DetailDemande detailDemande) {
        DetailDemande detailDemandeMerged = detailDemandeRepository.getEntityManager().merge(detailDemande);
    }

    public List<DetailDemande> getAll() {
        return detailDemandeRepository.listAll();
    }



    public DetailDemande getDetailDemandeById(Long id) {
        return detailDemandeRepository.findById(id);
    }

    @Transactional
    public void updateDetailDemande(DetailDemande detailDemande) {
        detailDemandeRepository.getEntityManager().merge(detailDemande);
    }

    @Transactional
    public boolean deleteDetailDemande(Long id) {
        DetailDemande detailDemande = detailDemandeRepository.findById(id);
        if (detailDemande != null) {
            detailDemandeRepository.delete(detailDemande);
            return true;
        }
        return false;
    }

    public List<DetailDemande> chercher(
                                String idDirection,
                                String motif,
                                String session,
                                String idFournisseur,
                                String dateDebut,
                                String dateFin,
                                String etat,
                                String validAchat,
                                String validCdg
                                ) {


        String sql =    "SELECT * FROM DetailDemande " ;

        if(!idDirection.isEmpty() || !motif.isEmpty() || !session.isEmpty() || !idFournisseur.isEmpty() || !dateDebut.isEmpty() || !dateFin.isEmpty() || !etat.isEmpty() )
        {
            sql+="where validationPrescripteur = true  ";
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;
            if(!motif.isEmpty())
                sql+= " and motif like '%"+   motif+"%' ";
            if(!session.isEmpty())
                sql+= " and refsession ='"+session +"'";
            if(!idFournisseur.isEmpty())
                sql+= " and idFournisseur ="+idFournisseur;
            if(!dateDebut.isEmpty())
                sql+= " and debutsession>='" + dateDebut +"'";
            if(!dateFin.isEmpty())
                sql+= " and debutsession<='"+ dateFin +"'";
            if(!etat.isEmpty())
                sql+= " and etatfinal='"+etat+"'";
            if(!validAchat.isEmpty())
                sql+= " and validationAchat='"+validAchat+"'";
            if(!validCdg.isEmpty())
                sql+= " and validationCdg='"+validCdg+"'";
        }

        System.out.println(sql);

        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);

        List<DetailDemande> detailDemandes = query.getResultList();

        return detailDemandes;
    }


    //get validation
    public List<Active> getValidation(String idDirection , String montantMga) {


        String sql =    "SELECT * FROM active " ;
        sql+="where validationPrescripteur = true and validationCdg= true and validationAchat= true ";

        if(!idDirection.isEmpty() && !montantMga.isEmpty() )
        {
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;
            if(!montantMga.isEmpty())
                sql+= " and montantMga >="+montantMga;


        }else

        sql+=" and 2=1 ";


        System.out.println(sql);

        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);

        List<Active> actives = query.getResultList();

        return actives;

    }
    public List<Active> getActive(String idDirection , String idSession) {


        String sql =    "SELECT * FROM active " ;

        if(!idDirection.isEmpty() || !idSession.isEmpty() )
        {
            sql+="where validationPrescripteur = true  ";
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;
            if(!idSession.isEmpty())
                sql+= " and idSession ="+   idSession;

        }

        System.out.println(sql);

        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);

        List<Active> actives = query.getResultList();

        return actives;

    }

    public List<Brouillon> getBrouillon(String idDirection , String idSession) {


        String sql =    "SELECT * FROM brouillon " ;

        if(!idDirection.isEmpty() || !idSession.isEmpty() )
        {
            sql+="where validationPrescripteur = false  ";
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;
            if(!idSession.isEmpty())
                sql+= " and idSession ="+   idSession;

        }

        System.out.println(sql);

        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);

        List<Brouillon> brouillon = query.getResultList();

        return brouillon;

    }

    public List<AttenteSession> getDemandeAttenteSession(String idDirection ) {


        String sql =    "" ;

        if(!idDirection.isEmpty() )
        {
            sql =    "SELECT * FROM attenteSession " ;
            sql+="where 1 = 1  ";
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;


        }

        System.out.println(sql);

        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);

        List<AttenteSession> demandeAttenteSession = query.getResultList();

        return demandeAttenteSession;

    }

}
