package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.DetailDemande;

@ApplicationScoped
public class DetailDemandeRepository implements PanacheRepository<DetailDemande> {
}
