package org.dre.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

@Entity
@Table(name = "TitreDepense")
public class TitreDepense   {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer idSession;

    private Integer idDirection;

    private  String designation;

    public Long getId() {
        return id;
    }

    public Integer getIdDirection() {
        return idDirection;
    }

    public void setIdDirection(Integer idDirection) {
        this.idDirection = idDirection;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return designation;
    }

    public Integer getIdSession() {
        return idSession;
    }

    public void setIdSession(Integer idSession) {
        this.idSession = idSession;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
