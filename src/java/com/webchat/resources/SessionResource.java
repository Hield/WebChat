/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.ChatRoomData;
import com.webchat.data.SessionData;
import com.webchat.data.UserData;
import com.webchat.models.ChatRoom;
import com.webchat.models.EventEntry;
import com.webchat.models.Response;
import com.webchat.models.Session;
import com.webchat.models.User;
import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author hieu
 */
@Path("sessions")
public class SessionResource {

    private final SessionData sessionData;
    private final UserData userData;
    private final ChatRoomData chatRoomData;

    public SessionResource() {
        this.sessionData = SessionData.getInstance();
        this.userData = UserData.getInstance();
        this.chatRoomData = ChatRoomData.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getSessionsXML() {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        result.append("<sessions>");
        for (Session session : sessionData.getSessions()) {
            result.append("<session>");
            result.append("<identifier>").append(session.getId()).append("</identifier>");
            result.append("<user>").append(session.getUser().getUsername()).append("</user>");
            result.append("<timestamp>").append(session.getTimeStamp()).append("</timestamp>");
            result.append("</session>");
        }
        result.append("</sessions>");
        return result.toString();
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public String login(User user) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        result.append("<response>");
        if (userData.authenticate(user.getUsername(), user.getPassword())) {
            user = userData.getUser(user.getUsername());
            Session session = new Session(user);
            sessionData.addSession(session);
            result.append("<result>").append("success").append("</result>");
            result.append("<username>").append(user.getUsername()).append("</username>");
            result.append("<sessionId>").append(session.getId()).append("</sessionId>");
        } else {
            result.append("<result>").append("failure").append("</result>");
            result.append("<message>").append("Wrong username or password!").append("</message>");
        }
        result.append("</response>");
        return result.toString();
    }

    @Path("{sessionId}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getSession(@PathParam("sessionId") String sessionId) {
        Response response = new Response();
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            return response.success().tag("username", session.getUsername()).toString();
        } else {
            return response.failure().toString();
        }
    }

    @Path("{sessionId}")
    @DELETE
    public void logout(@PathParam("sessionId") String sessionId) {
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            session.outRoomsCompletely();
        }
        sessionData.deleteSession(sessionId);
    }

    @Path("{sessionId}/rooms")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<ChatRoom> getRooms(@PathParam("sessionId") String sessionId) {
        Session session = sessionData.getSession(sessionId);
        return session.getChatRooms();
    }

    @Path("{sessionId}/rooms")
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public String joinRoom(@PathParam("sessionId") String sessionId, ChatRoom chatRoom) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        result.append("<response>");
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            
            chatRoom = chatRoomData.getChatRoom(chatRoom.getId());
            System.out.println("2: " + chatRoomData.getChatRooms().size());
            if (chatRoom != null) {
                session.joinRoom(chatRoom);
                result.append("<result>success</result>");
            } else {
                result.append("<result>failure</result>");
                result.append("<message>roomNotExist</message>");
            }
        } else {
            result.append("<result>failure</result>");
            result.append("<message>sessionTimeout</message>");
        }
        result.append("</response>");
        return result.toString();
    }

    @Path("{sesseionId}/rooms")
    @DELETE
    public void outRoomsTemporary(@PathParam("sessionId") String sessionId) {
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            session.outRoomsTemporary();
        }
    }

    @Path("{sessionId}/{index}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public EventEntry getEventEntry(@PathParam("sessionId") String sessionId,
            @PathParam("index") int index) {
        Session session = sessionData.getSession(sessionId);
        if (session == null) {
            return null;
        }
        User user = session.getUser();
        return user.getEventEntries().get(index);
    }

    @Path("{sessionId}/update")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String update(@PathParam("sessionId") String sessionId) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        result.append("<response>");
        Session session = sessionData.getSession(sessionId);
        if (session == null) {
            result.append("<result>failure</result>");
            result.append("<message>sessionTimeout</message>");
        } else {
            User user = session.getUser();
            result.append("<result>success</result>");
            result.append("<current>").append(user.getCurrentEventIndex()).append("</current>");
            result.append("<newest>").append(user.getNewestEventIndex()).append("</newest>");
        }
        result.append("</response>");
        return result.toString();
    }
}
