/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import com.webchat.data.ChatRoomData;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hieu
 */
@XmlRootElement
public class Session {

    private User user;
    private long timeStamp;
    private String id;
    private Map<Integer, ChatRoom> chatRooms;

    public Session(User user) {
        this.user = user;
        this.timeStamp = System.currentTimeMillis();
        this.id = new BigInteger(130, new SecureRandom()).toString(32);
        this.chatRooms = new HashMap<>();
    }

    public User getUser() {
        return user;
    }

    public String getUsername() {
        return user.getUsername();
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public String getId() {
        return id;
    }

    public Collection<ChatRoom> getChatRooms() {
        return chatRooms.values();
    }
    
    public void joinRoom(ChatRoom chatRoom) {
        chatRooms.put(chatRoom.getId(), chatRoom);
        chatRoom.addUser(user);
    }

    public void reJoinRooms() {
        for (ChatRoom room : chatRooms.values()) {
            room.addUser(user);
        }
    }

    public void outRoomsTemporary() {
        for (ChatRoom room : chatRooms.values()) {
            room.removeUser(user);
        }
    }

    public void outRoomsCompletely() {
        for (ChatRoom room : chatRooms.values()) {
            room.removeUser(user);
        }
        chatRooms.clear();
    }
    
    public void outRoom(int roomId) {
        chatRooms.remove(roomId);
    }

}
