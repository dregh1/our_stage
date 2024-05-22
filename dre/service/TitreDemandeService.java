package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.dre.model.DetailDemande;
import org.dre.model.Titre;
import org.dre.model.TitreDepense;
import org.dre.repository.TitreDemandeRepository;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class TitreDemandeService {
    @Inject
    TitreDemandeRepository titreDemandeRepository;


    @Inject
    private EntityManager em;

    public Long getNextSequenceValue(String sequenceName) {
        return (Long) em.createNativeQuery("SELECT nextval(:sequenceName)").setParameter("sequenceName", sequenceName).getSingleResult();

    }
    @Transactional
    public void create(TitreDepense personnel) {
//  TitreDepense personnelMerged = titreDemandeRepository.getEntityManager().merge(personnel);
        //        TitreDepenseRepository.persist(TitreDepense);

        // Persister l'entité (éviter d'utiliser merge ici)
        titreDemandeRepository.persist(personnel);

        // Forcer explicitement la validation de la transaction
        em.flush();

    }

    public List<TitreDepense> getAll() {
        return titreDemandeRepository.listAll();
    }

    public List<Titre> getAllTitreInSession() {
        // Assuming a field named "estTitre" to differentiate between Titre and TitreDepense
        return em.createQuery("SELECT t FROM Titre t ", Titre.class)
                .getResultList();
    }
    public List<TitreDepense> getAllByIdSession(Integer idSession) {
        List<TitreDepense> listTitreDepense = this.getAll();
        List<TitreDepense> listTitreBySession = new ArrayList<>();

        for(TitreDepense titreDepense : listTitreDepense){
            if(titreDepense.getIdSession() == idSession)
            {
                listTitreBySession.add(titreDepense);
            }
        }

        return listTitreBySession;
    }

    public List<TitreDepense> getTitres(
            String idDirection,
            String idSession
    ) {


        String sql =    "SELECT * FROM Titre " ;
        if(!idDirection.isEmpty() || !idSession.isEmpty() )
        {
            sql+="where 1 = 1  ";
            if(!idDirection.isEmpty())
                sql+= " and idDirection ="+idDirection;
            if(!idSession.isEmpty())
                sql+= " and idSession ="+   idSession;


        }

        System.out.println(sql);

        Query query = em.createNativeQuery(sql, TitreDepense.class);

        List<TitreDepense> titresDepense = query.getResultList();

        return titresDepense;
    }



    public TitreDepense getTitreDepenseById(Long id) {
        return titreDemandeRepository.findById(id);
    }

    @Transactional
    public void updateTitreDepense(TitreDepense titre_dmd) {
        titreDemandeRepository.getEntityManager().merge(titre_dmd);
    }

    @Transactional
    public boolean deleteTitreDepense(Long id) {
        TitreDepense titreDepense = titreDemandeRepository.findById(id);
        if (titreDepense != null) {
            titreDemandeRepository.delete(titreDepense);
            return true;
        }
        return false;
    }
}
