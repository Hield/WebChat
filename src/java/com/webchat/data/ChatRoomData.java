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

    private static ChatRoomData instance = new ChatRoomData();
    private Map<Integer, ChatRoom> chatRooms;
    private int serial;

    private ChatRoomData() {
        chatRooms = new HashMap<>();
        serial = 0;
        addChatRoom(new ChatRoom());
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

    public void addChatRoom(ChatRoom chatRoom) {
        chatRoom.setId(serial);
        chatRooms.put(serial, chatRoom);
        serial++;
    }
}
