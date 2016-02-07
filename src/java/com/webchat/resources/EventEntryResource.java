/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.EventEntryData;
import com.webchat.data.SessionData;
import com.webchat.models.ChatEntry;
import com.webchat.models.EventEntry;
import com.webchat.models.LoginEntry;
import com.webchat.models.Session;
import com.webchat.models.User;
import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author hieu
 */
@Path("event-entries")
public class EventEntryResource {

    private SessionData sessionData;
    private EventEntryData eventEntryData;
    
    public EventEntryResource() {
        this.eventEntryData = EventEntryData.getInstance();
        this.sessionData = SessionData.getInstance();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<EventEntry> getEventEntries() {
        return eventEntryData.getEventEntries();
    }
    
    @Path("chat-entries")
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void createChatEntry(@HeaderParam("sessionId") String sessionId, ChatEntry entry) {
        eventEntryData.addEventEntry(entry);
        Session session = sessionData.getSession(sessionId);
        User user = session.getUser();
        user.addEventEntry(entry);
    }
    
    @Path("chat-entries/{timeStamp}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public ChatEntry getChatEntry(@PathParam("timeStamp") long timeStamp) {
        EventEntry entry = eventEntryData.getEventEntry(timeStamp);
        if (entry == null) {
            System.out.println("1");
            return new ChatEntry("temp", "temp");
        }
        if (entry.getClass() == ChatEntry.class) {
            return (ChatEntry)entry;
        } else {
            System.out.println("2");
            return new ChatEntry("temp", "temp");
        }
        
    }
    
    @Path("login-entries/{timeStamp}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public LoginEntry getLoginEntry(@PathParam("timeStamp") long timeStamp) {
         EventEntry entry = eventEntryData.getEventEntry(timeStamp);
        if (entry.getClass() == LoginEntry.class) {
            return (LoginEntry)entry;
        } else {
            return null;
        }
    }
}
