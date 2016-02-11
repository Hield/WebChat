/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.models.ChatRoom;
import com.webchat.data.ChatRoomData;
import java.util.Collection;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author hieu
 */
@Path("rooms")
public class ChatRoomResource {

    private final ChatRoomData chatRoomData;
    
    public ChatRoomResource() {
        chatRoomData = ChatRoomData.getInstance();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public Collection<ChatRoom> getChatRooms() {
        return chatRoomData.getChatRooms();
    }
}
