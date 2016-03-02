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
public class LogEntry extends EventEntry {
    
    private String username;
    private String state;
    
    public LogEntry(){
        super();
        setType("log");
        this.username = "temp";
        this.state = "temp";
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public String getState() {
        return state;
    }
}
