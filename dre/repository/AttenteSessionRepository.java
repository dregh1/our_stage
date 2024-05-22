package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.AttenteSession;

@ApplicationScoped
public class AttenteSessionRepository implements PanacheRepository<AttenteSession> {
}
