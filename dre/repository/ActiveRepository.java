package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Active;


@ApplicationScoped
public class ActiveRepository implements PanacheRepository<Active> {
}
