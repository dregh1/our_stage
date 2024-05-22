package org.dre.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.dre.model.Direction;
@ApplicationScoped
public class DirectionRepository  implements PanacheRepository<Direction> {
}
