package org.dre.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Titre {
    @Id
    private Long id;

    private Integer idSession;

    private Integer IdDirection;
    private  String designation;

    public Long getId() {
        return id;
    }


    public Integer getIdDirection() {
        return IdDirection;
    }


    public void setIdDirection(Integer idDirection) {
        IdDirection = idDirection;
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
