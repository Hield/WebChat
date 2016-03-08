/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.ChatRoom;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author hieu
 */
public class ChatRoomData {

    private class DualUserKey {
        private String username1, username2;
        
        public DualUserKey(String username1, String username2) {
            this.username1 = username1;
            this.username2 = username2;
        }
        
        @Override
        public int hashCode() {
            return username1.hashCode() + username2.hashCode();
        }
        
        @Override
        public boolean equals(Object object) {
            if (object == null) {
                return false;
            }
            if (object.getClass() != getClass()) {
                return false;
            }
            DualUserKey key = (DualUserKey)object;
            return (username1.equals(key.username1) && username2.equals(key.username2)) ||
                    (username1.equals(key.username2) && username2.equals(key.username1));
        }
    }
    
    private static ChatRoomData instance = new ChatRoomData();
    private Map<Integer, ChatRoom> chatRooms;
    private Map<DualUserKey, ChatRoom> dualUserChatRooms;
    private int serial;

    private ChatRoomData() {
        this.chatRooms = new HashMap<>();
        this.dualUserChatRooms = new HashMap<>();
        this.serial = 0;
//        addChatRoom(new ChatRoom());
    }

    public static ChatRoomData getInstance() {
        return instance;
    }

    public Collection<ChatRoom> getChatRooms() {
        return chatRooms.values();
    }

    public ChatRoom getChatRoom(int roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom getDualChatRoom(String username1, String username2) {
        return dualUserChatRooms.get(new DualUserKey(username1, username2));
    }
    
    public void addChatRoom(ChatRoom chatRoom) {
        chatRoom.setId(serial);
        chatRooms.put(serial, chatRoom);
        serial++;
    }
    
    public void addDualChatRoom(ChatRoom chatRoom, String username1, String username2) {
       dualUserChatRooms.put(new DualUserKey(username1, username2), chatRoom);
       addChatRoom(chatRoom);
    }
}
