/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.ChatRoomData;
import com.webchat.data.SessionData;
import com.webchat.models.ChatEntry;
import com.webchat.models.ChatRoom;
import com.webchat.models.Session;
import com.webchat.models.User;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author hieu
 */
public class EventEntryResourceTest {

    private final EventEntryResource eventEntryResource;
    private final ChatRoomData chatRoomData;
    private final SessionData sessionData;
    
    public EventEntryResourceTest() {
        this.chatRoomData = ChatRoomData.getInstance();
        this.eventEntryResource = new EventEntryResource();
        this.sessionData = SessionData.getInstance();
    }

    /**
     * Test of createChatEntry method, of class EventEntryResource.
     */
    @Test
    public void testCreateChatEntry_FAIL_SESSION() {
        String sessionId = "Random id that will not be valid";
        ChatRoom chatRoom = new ChatRoom();
        chatRoomData.addChatRoom(chatRoom);
        ChatEntry entry = new ChatEntry();
        entry.setRoomId(chatRoom.getId());
        eventEntryResource.createChatEntry(sessionId, entry);
        assertFalse("The chat entry should not be added because of invalid sessionId.", 
                chatRoom.getChatEntries().contains(entry));
    }

    @Test
    public void testCreateChatEntry_FAIL_CHATROOM() {
        User user = new User("test01", "test01");
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        ChatRoom chatRoom = new ChatRoom();
        ChatEntry entry = new ChatEntry();
        entry.setRoomId(chatRoom.getId());
        eventEntryResource.createChatEntry(sessionId, entry);
        assertFalse("The chat entry should not be added because of room does not exist in database.", 
                chatRoom.getChatEntries().contains(entry));
    }

    @Test
    public void testCreateChatEntry_SUCCESS() {
        User user = new User("test02", "test02");
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        ChatRoom chatRoom = new ChatRoom();
        chatRoomData.addChatRoom(chatRoom);
        ChatEntry entry = new ChatEntry();
        entry.setRoomId(chatRoom.getId());
        eventEntryResource.createChatEntry(sessionId, entry);
        assertTrue("The chat entry should be added because everything is right!", 
                chatRoom.getChatEntries().contains(entry));
    }

}
