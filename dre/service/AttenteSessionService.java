package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.Query;
import org.dre.model.AttenteSession;
import org.dre.model.DetailDemande;

import java.util.List;

@ApplicationScoped
public class AttenteSessionService {
//    public List<AttenteSession> getAttenteSession(String idDirection , String idSession) {
//
//
//
//        String sql =    "SELECT * FROM DetailDemande " ;
//
//        if(!idDirection.isEmpty() || !idSession.isEmpty() )
//        {
//            sql+="where validationPrescripteur = true  ";
//            if(!idDirection.isEmpty())
//                sql+= " and idDirection ="+idDirection;
//            if(!idSession.isEmpty())
//                sql+= " and idSession ="+   idSession;
//
//        }
//
//        System.out.println(sql);
//
//        Query query = entityManager.createNativeQuery(sql, DetailDemande.class);
//
//        List<AttenteSession> actives = query.getResultList();
//
//        return actives;
//
//    }
}
