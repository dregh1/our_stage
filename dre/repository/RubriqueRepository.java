package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Rubrique;
import org.dre.model.SessionCd;
@ApplicationScoped
public class RubriqueRepository implements PanacheRepository<Rubrique>{
}


