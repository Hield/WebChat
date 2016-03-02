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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hieu
 */
@XmlRootElement
public class User {

    private String username;
    private String password;
    private List<EventEntry> eventEntries;
    private Set<User> contacts;
    private int currentEventIndex;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.eventEntries = new ArrayList<>();
        this.contacts = new HashSet<>();
        this.currentEventIndex = -1;
    }

    public User() {
        this("temp", "temp");
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<EventEntry> getEventEntries() {
        return eventEntries;
    }

    public void addEventEntry(EventEntry entry) {
        eventEntries.add(entry);
    }

    public Set<User> getContacts() {
        return contacts;
    }

    public void addContact(User user) {
        contacts.add(user);
    }

    public int getCurrentEventIndex() {
        return currentEventIndex;
    }
    
    public int getNewestEventIndex() {
        currentEventIndex = eventEntries.size() - 1;
        return eventEntries.size() - 1;
    }
    
    public void notifyLog(LogEntry entry) {
        for (User user : contacts) {
            user.addEventEntry(entry);
        }
    }
}
