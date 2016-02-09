/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hieu
 */
@XmlRootElement
public class ChatEntry extends EventEntry {

    private int roomId;
    private String username;
    private String message;

    public ChatEntry(String username, String message) {
        super();
        setType("chat");
        this.roomId = -1;
        this.username = username;
        this.message = message;
    }

    public ChatEntry() {
        this("temp", "temp");
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        if (System.currentTimeMillis() - getTimeStamp() < 86400000) {
            return getTime() + " " + username + ":" + message;
        } else {
            return getDate() + " " + username + ":" + message;
        }
    }
}
