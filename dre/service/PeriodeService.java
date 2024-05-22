package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.Periode;
import org.dre.repository.PeriodeRepository;
import org.dre.repository.PeriodeRepository;

import java.util.List;

@ApplicationScoped
public class PeriodeService {
    @Inject
    PeriodeRepository PeriodeRepository;

    @Transactional
    public void create(Periode personnel) {
        Periode personnelMerged = PeriodeRepository.getEntityManager().merge(personnel);
//        PeriodeRepository.persist(Periode);
    }

    public List<Periode> getAll() {
        return PeriodeRepository.listAll();
    }



    public Periode getPeriodeById(Long id) {
        return PeriodeRepository.findById(id);
    }

    @Transactional
    public void updatePeriode(Periode Periode) {
        PeriodeRepository.getEntityManager().merge(Periode);
    }

    @Transactional
    public boolean deletePeriode(Long id) {
        Periode Periode = PeriodeRepository.findById(id);
        if (Periode != null) {
            PeriodeRepository.delete(Periode);
            return true;
        }
        return false;
    }
}