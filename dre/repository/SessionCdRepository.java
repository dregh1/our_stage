package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.SessionCd;
@ApplicationScoped
public class SessionCdRepository implements PanacheRepository<SessionCd> {
}
