/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.models.ChatRoom;
import com.webchat.data.ChatRoomData;
import com.webchat.data.SessionData;
import com.webchat.data.UserData;
import com.webchat.models.Response;
import com.webchat.models.Session;
import com.webchat.models.User;
import java.util.Collection;
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
@Path("rooms")
public class ChatRoomResource {

    private final ChatRoomData chatRoomData;
    private final SessionData sessionData;
    private final UserData userData;

    public ChatRoomResource() {
        chatRoomData = ChatRoomData.getInstance();
        sessionData = SessionData.getInstance();
        userData = UserData.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<ChatRoom> getChatRooms() {
        return chatRoomData.getChatRooms();
    }

    @POST
    @Produces(MediaType.APPLICATION_XML)
    public String createChatRoom(@HeaderParam("sessionId") String sessionId) {
        Response response = new Response();
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            ChatRoom chatRoom = new ChatRoom();
            chatRoomData.addChatRoom(chatRoom);
            return response.success().tag("roomId", chatRoom.getId()).toString();
        } else {
            return response.failure().message("sessionTimeout").toString();
        }
    }
    
    @Path("{username2}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getChatRoomByName(@HeaderParam("sessionId") String sessionId,
            @PathParam("username2") String username2) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        result.append("<response>");
        Session session = sessionData.getSession(sessionId);
        if (session != null) {
            String username1 = session.getUsername();
            User user1 = userData.getUser(username1);
            User user2 = userData.getUser(username2);
            if (user1 != null && user2 != null) {
                ChatRoom chatRoom = chatRoomData.getDualChatRoom(username1, username2);
                if (chatRoom == null) {
                    chatRoom = new ChatRoom();
                    chatRoomData.addDualChatRoom(chatRoom, username1, username2);
                    chatRoom.addUser(user1);
                    chatRoom.addUser(user2);
                }
                result.append("<result>success</result>");
                result.append("<roomId>").append(chatRoom.getId()).append("</roomId>");
            } else {
                result.append("<result>failure</result>");
                result.append("<message>invalidUsername</message>");
            }
        } else {
            result.append("<result>failure</result>");
            result.append("<message>sessionTimeout</message>");
        }
        result.append("</response>");
        return result.toString();
    }
}
