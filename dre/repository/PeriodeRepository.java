package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Periode;
@ApplicationScoped
public class PeriodeRepository implements PanacheRepository<Periode>{
}


