package org.dre.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.dre.model.SessionCd;
import org.dre.model.SessionCd;
import org.dre.repository.SessionCdRepository;
import org.hibernate.Session;

import java.util.List;
@ApplicationScoped
public class SessionCdService {
    @Inject
    SessionCdRepository sessionCdRepository;

    public List<SessionCd> getAllSessionCd() {
        return sessionCdRepository.listAll();
    }

    // CREAT SESSION
    @Transactional
    public void createSessionCd(SessionCd sessionCd) {
        SessionCd sessionCdMerged = sessionCdRepository.getEntityManager().merge(sessionCd);
    }

    public List<SessionCd> getAll() {
        return sessionCdRepository.listAll();
    }

    public SessionCd getActiveSession(Integer idDirection) {
        List<SessionCd> allList = this.getAll();

        for(SessionCd sessionCd : allList )
        {
            if(sessionCd.getIdDirection().equals(idDirection) && !sessionCd.isEstFerme())
            {
                return sessionCd;
            }
        }
        return null;
    }

    @Transactional
    public void updateSessionCd(SessionCd sessionCd) {
        sessionCdRepository.getEntityManager().merge(sessionCd);
    }

    public boolean checkSession(Integer idDirection) {
        List <SessionCd> sessionCds = this.getAll();
        for(SessionCd session : sessionCds)
        {
            if(session.getIdDirection().equals(idDirection) && !session.isEstFerme())
            {
                return true;
            }
        }
        return false;
    }


}
