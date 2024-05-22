package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.Brouillon;
import org.dre.repository.BrouillonRepository;
import org.dre.repository.BrouillonRepository;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class BrouillonService {
    @Inject
    BrouillonRepository brouillonRepository;

    @Transactional
    public void create(Brouillon brouillon) {
        Brouillon brouillonMerged = brouillonRepository.getEntityManager().merge(brouillon);
//        BrouillonRepository.persist(Brouillon);
    }

    public List<Brouillon> getAll() {
        return brouillonRepository.listAll();
    }

//    public List<Brouillon> getAllByIdDir(Integer id) {
//
//        List<Brouillon> brouillons= brouillonRepository.listAll();
//        List<Brouillon> brouillonsById = new ArrayList<>();
//
//        for(Brouillon brouillon : brouillons)
//        {
//            if(brouillon.getIdDirection() == id)
//            {
//                brouillonsById.add(brouillon);
//            }
//        }
//        return brouillonsById;
//    }


    public Brouillon getBrouillonById(Long id) {
        return brouillonRepository.findById(id);
    }

    @Transactional
    public void updateBrouillon(Brouillon brouillon) {
        brouillonRepository.getEntityManager().merge(brouillon);
    }

    @Transactional
    public boolean deleteBrouillon(Long id) {
        Brouillon brouillon = brouillonRepository.findById(id);
        if (brouillon != null) {
            brouillonRepository.delete(brouillon);
            return true;
        }
        return false;
    }

}
