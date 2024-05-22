package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.dre.model.Active;
import org.dre.model.Brouillon;
import org.dre.model.DetailDemande;
import org.dre.repository.ActiveRepository;

import java.util.ArrayList;
import java.util.List;



@ApplicationScoped
public class ActiveService {
    @Inject
    ActiveRepository activeRepository;
    @Inject
    EntityManager entityManager;

    @Transactional
    public void create(Active active) {
        Active activeMerged = activeRepository.getEntityManager().merge(active);
//        ActiveRepository.persist(Active);
    }

    public List<Active> getAll() {
        return activeRepository.listAll();
    }



    public Active getActiveById(Long id) {
        return activeRepository.findById(id);
    }

    @Transactional
    public void updateActive(Active active) {
        activeRepository.getEntityManager().merge(active);
    }

    @Transactional
    public boolean deleteActive(Long id) {
        Active active = activeRepository.findById(id);
        if (active != null) {
            activeRepository.delete(active);
            return true;
        }
        return false;
    }
    public List<Active> getActive(String idDirection , String idSession) {



        String sql =    "SELECT * FROM DetailDemande " ;

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

}
