/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.ChatRoomData;
import com.webchat.data.SessionData;
import com.webchat.data.UserData;
import com.webchat.models.Session;
import com.webchat.models.User;
import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.PUT;

/**
 *
 * @author hieu
 */
@Path("users")
public class UserResource {

    private SessionData sessionData;
    private UserData userData;
    private ChatRoomData chatRoomData;

    public UserResource() {
        this.userData = UserData.getInstance();
        this.sessionData = SessionData.getInstance();
        this.chatRoomData = ChatRoomData.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<User> getUsersXML() {
        return userData.getUsers();
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public String register(User user) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
        result.append("<response>");
        if (user.getUsername().length() < 5 || user.getUsername().length() > 12) {
            result.append("<result>failure</result>");
            result.append("<message>Invalid username format</message>");
        } else if (user.getPassword().length() < 6 || user.getPassword().length() > 128) {
            result.append("<result>failure</result>");
            result.append("<message>Invalid password format</message>");
        } else if (!userData.isAvailable(user.getUsername())) {
            result.append("<result>").append("failure").append("</result>");
            result.append("<message>").append("This username is not available").append("</message>");
        } else {
            userData.addUser(user);
            Session session = new Session(user);
            sessionData.addSession(session);
            result.append("<result>").append("success").append("</result>");
            result.append("<username>").append(user.getUsername()).append("</username>");
            result.append("<sessionId>").append(session.getId()).append("</sessionId>");
        }
        result.append("</response>");
        return result.toString();
    }

    @Path("{username}")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public User getUserXML(@PathParam("username") String username) {
        return userData.getUser(username);
    }

    @Path("{username}/contacts")
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getUserContacts(@PathParam("username") String username) {
        StringBuilder result = new StringBuilder();
        result.append("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
        result.append("<contacts>");
        User user = userData.getUser(username);
        for (User contact : user.getContacts()) {
            result.append("<contact>");
            result.append(contact.getUsername());
            result.append("</contact>");
        }
        result.append("</contacts>");
        return result.toString();
    }
	
	@Path("{username}/contacts/update")
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void updateUserContacts(@PathParam("username") String username, User user2) {
        User user1 = userData.getUser(username);
        user1.addContact(userData.getUser(user2.getUsername()));
        userData.getUser(user2.getUsername()).addContact(user1);
	}
 }
