package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.AvisCdg;
import org.dre.model.Direction;
import org.dre.repository.AvisCdgRepository;

import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class AvisCdgService {

    @Inject
    AvisCdgRepository avisCdgRepository;

    @Transactional
    public void create(AvisCdg avisCdg) {
        AvisCdg avisCdgMerged = avisCdgRepository.getEntityManager().merge(avisCdg);
//        AvisCdgRepository.persist(AvisCdg);
    }

    public List<AvisCdg> getAll() {
        return avisCdgRepository.listAll();
    }



    public AvisCdg getAvisCdgById(Long id) {
        return avisCdgRepository.findById(id);
    }

    @Transactional
    public void updateAvisCdg(AvisCdg avisCdg) {
        avisCdgRepository.getEntityManager().merge(avisCdg);
    }

    @Transactional
    public boolean deleteAvisCdg(Long id) {
        AvisCdg avisCdg = avisCdgRepository.findById(id);
        if (avisCdg != null) {
            avisCdgRepository.delete(avisCdg);
            return true;
        }
        return false;
    }
    public AvisCdg getAvisCdgByIdDemande(Long idDemande)
    {
        List<AvisCdg> avisCdg = this.getAll();


        for (AvisCdg d : avisCdg )
        {
            if(d.getIdDemande()== idDemande)
            {

                return d;
            }
        }
        return null;
    }
    public boolean checkAvisCdgByIdDemande(Long idDemande)
    {
        List<AvisCdg> avisCdg = this.getAll();


        for (AvisCdg d : avisCdg )
        {
            if(Objects.equals(d.getIdDemande(), idDemande))
            {

                return true;
            }
        }
        return false;
    }
}
