/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.Session;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author hieu
 */
public class SessionData {

    private static SessionData instance = new SessionData();
    private Map<String, Session> sessions;

    private SessionData() {
        this.sessions = new HashMap<>();
    }

    public static SessionData getInstance() {
        return instance;
    }

    public Collection<Session> getSessions(){
        return sessions.values();
    }
    
    public void addSession(Session session) {
        sessions.put(session.getId(), session);
    }

    public Session getSession(String sessionId) {
        return sessions.get(sessionId);
    }
}
