package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.Decision;
import org.dre.repository.DecisionRepository;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class DecisionService {

    @Inject
    DecisionRepository decisionRepository ;

    @Transactional
    public void create(Decision decision) {
        Decision decisionMerged = decisionRepository.getEntityManager().merge(decision);
//        DecisionRepository.persist(Decision);
    }

    public List<Decision> getAll() {
        return decisionRepository.listAll();
    }

    public Decision getByIdDemande(Long idDemande) {

        List<Decision> decisions= decisionRepository.listAll();
        Decision decisionByIdDemande = new Decision();

        for(Decision decision : decisions)
        {
            if(decision.getIdDemande() == idDemande)
            {
                decisionByIdDemande = decision;
            }
        }
        return decisionByIdDemande;
    }


    public Decision getDecisionById(Long id) {
        return  decisionRepository.findById(id);
    }

    @Transactional
    public void updateDecision(Decision decision) {
        decisionRepository.getEntityManager().merge(decision);
    }

    @Transactional
    public boolean deleteDecision(Long id) {
        Decision decision = decisionRepository.findById(id);
        if (decision != null) {
            decisionRepository.delete(decision);
            return true;
        }
        return false;
    }
}
