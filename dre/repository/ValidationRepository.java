package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Validation;
@ApplicationScoped
public class ValidationRepository implements PanacheRepository<Validation> {
}
