package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.AvisCdg;
@ApplicationScoped
public class AvisCdgRepository implements PanacheRepository<AvisCdg> {

}
