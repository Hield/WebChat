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
import com.webchat.models.Session;
import com.webchat.models.User;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author hieu
 */
public class SessionResourceTest {

    private final SessionResource sessionResource;
    private final UserData userData;
    private final ChatRoomData chatRoomData;
    private final SessionData sessionData;

    public SessionResourceTest() {
        this.sessionResource = new SessionResource();
        this.userData = UserData.getInstance();
        this.chatRoomData = ChatRoomData.getInstance();
        this.sessionData = SessionData.getInstance();
    }

    /**
     * Test of login method, of class SessionResource.
     */
    @Test
    public void testLogin_FAIL() {
        User user = new User("test01", "test01");
        String expResult = "<result>failure</result>";
        String result = sessionResource.login(user);
        assertTrue("The result should be failure because the user has not been registered.",
                result.contains(expResult));
    }

    @Test
    public void testLogin_SUCCESS() {
        User user = new User("test02", "test02");
        userData.addUser(user);
        String expResult = "<result>success</result>";
        String result = sessionResource.login(user);
        assertTrue("The result should be success because the user has been added in the user data.",
                result.contains(expResult));
    }

    /**
     * Test of joinRoom method, of class SessionResource.
     */
    @Test
    public void testJoinRoom_FAIL_SESSION_TIMEOUT() {
        String randomSessionId = "Random sessionId which will not be valid";
        ChatRoom chatRoom = new ChatRoom();
        chatRoomData.addChatRoom(chatRoom);
        String expResult = "<result>failure</result>";
        String expMessage = "<message>sessionTimeout</message>";
        String result = sessionResource.joinRoom(randomSessionId, chatRoom);
        assertTrue("The operation should fail because of session id invalidity.",
                result.contains(expResult));
        assertTrue("The chatroom is added to the ChatRoomData so it should only fail because of session id invalidity.",
                result.contains(expMessage));
    }

    @Test
    public void testJoinRoom_FAIL_CHATROOM_NOT_EXIST() {
        ChatRoom chatRoom = new ChatRoom();
        User user = new User("test03", "test03");
        userData.addUser(user);
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        String expResult = "<result>failure</result>";
        String expMessage = "<message>roomNotExist</message>";
        String result = sessionResource.joinRoom(sessionId, chatRoom);
        assertTrue("The operation should fail because the chat room was not added to the data.",
                result.contains(expResult));
        assertTrue("The session was added to the session data so the failure should only because of chatroom non-existence.",
                result.contains(expMessage));
    }

    @Test
    public void testJoinRoom_SUCCESS() {
        ChatRoom chatRoom = new ChatRoom();
        ChatRoomData.getInstance().addChatRoom(chatRoom);
        User user = new User("test04", "test04");
        userData.addUser(user);
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        String expResult = "<result>success</result>";
        String result = sessionResource.joinRoom(sessionId, chatRoom);
        assertTrue("The operation should success because the chatroom was added to the data and the session id is valid.",
                result.contains(expResult));
    }

    /**
     * Test of update method, of class SessionResource.
     */
    @Test
    public void testUpdate_FAIL_SESSION_TIMEOUT() {
        String randomSessionId = "Random sessionId which will not be valid";
        String expResult = "<result>failure</result>";
        String expMessage = "<message>sessionTimeout</message>";
        String result = sessionResource.update(randomSessionId);
        assertTrue("The operation should fail because of session id invalidity.",
                result.contains(expResult));
        assertTrue("The sessionId should be the only thing that cause failure.",
                result.contains(expMessage));
    }

    @Test
    public void testUpdate_SUCCESS_INITIAL() {
        User user = new User("test05", "test05");
        userData.addUser(user);
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        String expResult = "<result>success</result>";
        String expCurrent = "<current>-1</current>";
        String expNewest = "<newest>-1</newest>";
        String result = sessionResource.update(sessionId);
        assertTrue("The operation should success because the session id is valid.",
                result.contains(expResult));
        assertTrue("The current index should be -1 because the session has not been updated before.",
                result.contains(expCurrent));
        assertTrue("The newest index should be -1 because the user has not received any event entries.",
                result.contains(expNewest));
    }

    @Test
    public void testUpdate_SUCCESS() {
        User user = new User("test06", "test06");  // New user
        userData.addUser(user);                    // Add user to the database
        Session session = new Session(user);       // New session for the user
        sessionData.addSession(session);           // Add session to the database
        String sessionId = session.getId();        // Get sessionId
        user.addEventEntry(new EventEntry());
        user.addEventEntry(new EventEntry());      // Newest now should be 1
        sessionResource.update(sessionId);         // Current now should be 1
        user.addEventEntry(new EventEntry());
        user.addEventEntry(new EventEntry());
        user.addEventEntry(new EventEntry());
        user.addEventEntry(new EventEntry());
        user.addEventEntry(new EventEntry());      // Newest now should be 6
        String expResult = "<result>success</result>";
        String expCurrent = "<current>1</current>";
        String expNewest = "<newest>6</newest>";
        String result = sessionResource.update(sessionId);
        assertTrue("The operation should success because the session id is valid.",
                result.contains(expResult));
        assertTrue("The current index should be 1 because the session has updated once when newest is 1.",
                result.contains(expCurrent));
        assertTrue("The newest index should be 6 because the user has received 7 chat entries.",
                result.contains(expNewest));
    }

    /**
     * Test of logout method, of class SessionResource.
     */
    @Test
    public void testLogout() {
        User user = new User("test07", "test07");
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        assertNotNull("The session should be added to the session data.",
                sessionData.getSession(sessionId));
        sessionResource.logout(sessionId);       
        assertNull("The session should be removed in the data.",
                sessionData.getSession(sessionId));
    }
    
    /**
     * Test of outRoomsTemporary method, of class SessionResource.
     */
    @Test
    public void testOutRoomsTemporary() {
        User user = new User("test08", "test08");
        Session session = new Session(user);
        sessionData.addSession(session);
        String sessionId = session.getId();
        ChatRoom chatRoom = new ChatRoom();
        chatRoomData.addChatRoom(chatRoom);
        int chatRoomId = chatRoom.getId();
        session.joinRoom(chatRoomId);
        assertTrue("The user should be in the room now.", 
                chatRoom.getUsers().contains(user));
        sessionResource.outRoomsTemporary(sessionId);
        assertFalse("The user should be out of the room now.", 
                chatRoom.getUsers().contains(user));
        assertTrue("But the room is still in the session", 
                session.getChatRooms().contains(chatRoom));
    }
}
