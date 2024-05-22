package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Brouillon;

@ApplicationScoped
public class BrouillonRepository implements PanacheRepository<Brouillon> {

}
