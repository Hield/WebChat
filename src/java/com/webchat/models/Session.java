/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import java.math.BigInteger;
import java.security.SecureRandom;
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

    public Session(User user) {
        this.user = user;
        this.timeStamp = System.currentTimeMillis();
        this.id = new BigInteger(130, new SecureRandom()).toString(32);
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
}
