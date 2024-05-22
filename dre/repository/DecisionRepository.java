package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Decision;

@ApplicationScoped
public class DecisionRepository implements PanacheRepository<Decision> {
}
