/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import java.util.HashSet;
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
    private Set<EventEntry> eventEntries;
    private Set<User> contacts;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        eventEntries = new HashSet<>();
        contacts = new HashSet<>();
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

    public Set<EventEntry> getEventEntries() {
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
}
