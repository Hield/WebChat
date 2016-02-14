/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.ChatRoomData;
import com.webchat.data.EventEntryData;
import com.webchat.data.SessionData;
import com.webchat.models.ChatEntry;
import com.webchat.models.ChatRoom;
import com.webchat.models.EventEntry;
import com.webchat.models.Session;
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
@Path("events")
public class EventEntryResource {

    private SessionData sessionData;
    private EventEntryData eventEntryData;
    private ChatRoomData chatRoomData;

    public EventEntryResource() {
        this.eventEntryData = EventEntryData.getInstance();
        this.sessionData = SessionData.getInstance();
        this.chatRoomData = ChatRoomData.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<EventEntry> getEventEntries() {
        return eventEntryData.getEventEntries();
    }

    @Path("chat")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<ChatEntry> getChatEntries() {
        return eventEntryData.getChatEntries();
    }

    @Path("chat")
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void createChatEntry(@HeaderParam("sessionId") String sessionId, ChatEntry entry) {
        eventEntryData.addEventEntry(entry);
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            String username = session.getUsername();
            entry.setUsername(username);
            int roomId = entry.getRoomId();
            ChatRoom chatRoom = chatRoomData.getChatRoom(roomId);
            if (chatRoom != null) {
                chatRoom.addChatEntry(entry);
            }
        }
    }

    @Path("{timeStamp}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public EventEntry getEventEntry(@PathParam("timeStamp") long timeStamp) {
        return eventEntryData.getEventEntry(timeStamp);
    }
}
