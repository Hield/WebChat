/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hieu
 */
@XmlRootElement
public class ChatRoom {

    private int id;
    private String title;
    private Set<User> users;
    private List<ChatEntry> chatEntries;

    public ChatRoom() {
        this.id = -1;
        this.users = new HashSet<>();
        this.chatEntries = new ArrayList<>();
    }

    @XmlElement
	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
	@XmlElement
    public Set<User> getUsers() {
        return users;
    }
    
    public void addUser(User user) {
        users.add(user);
        for (EventEntry entry : chatEntries) {
            user.addEventEntry(entry);
        }
    }
    
    public void removeUser(User user) {
        users.remove(user);
    }

    public List<ChatEntry> getChatEntries() {
        return chatEntries;
    }
    
    public void addChatEntry(ChatEntry entry) {
        chatEntries.add(entry);
        for (User user : users) {
            user.addEventEntry(entry);
        }
    }
}
