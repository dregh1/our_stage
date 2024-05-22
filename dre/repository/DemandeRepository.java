package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Demande;

@ApplicationScoped
public class DemandeRepository implements PanacheRepository<Demande>{

}


