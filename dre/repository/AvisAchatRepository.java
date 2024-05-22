package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.AvisAchat;

@ApplicationScoped
public class AvisAchatRepository implements PanacheRepository<AvisAchat> {
}
