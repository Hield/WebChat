/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.models;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hieu
 */
@XmlRootElement
public class EventEntry {

    private String type;
    private final long timeStamp;
    private final Date date;

    public EventEntry() {
        this.type = "event";
        this.timeStamp = System.currentTimeMillis();
        this.date = new Date();
    }

    @XmlElement
    public long getTimeStamp() {
        return timeStamp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
	
    @XmlElement
    public String getTime() {
        SimpleDateFormat format = new SimpleDateFormat("kk:mm");
        return format.format(date);
    }

    public String getDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
        return format.format(date);
    }
}
