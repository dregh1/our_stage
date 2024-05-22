package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.Direction;
import org.dre.repository.DirectionRepository;

import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class DirectionService {
    @Inject
    DirectionRepository directionRepository;

    @Transactional
    public void create(Direction personnel) {
        Direction personnelMerged = directionRepository.getEntityManager().merge(personnel);
//        DirectionRepository.persist(Direction);
    }

    public List<Direction> getAll() {
        return directionRepository.listAll();
    }

    public Direction getIdDirByName(String nameOfDir)
    {
        List<Direction> directions = this.getAll();


        for (Direction d : directions )
        {
            System.out.println("RETO : "+d.getDesignation()+" " +nameOfDir);
            if(Objects.equals(d.getDesignation(), nameOfDir))
            {

                return d;
            }
        }
        return null;
    }

    public Direction getDirectionById(Long id) {
        return directionRepository.findById(id);
    }

    @Transactional
    public void updateDirection(Direction direction) {
        directionRepository.getEntityManager().merge(direction);
    }

    @Transactional
    public boolean deleteDirection(Long id) {
        Direction direction = directionRepository.findById(id);
        if (direction != null) {
            directionRepository.delete(direction);
            return true;
        }
        return false;
    }
}
