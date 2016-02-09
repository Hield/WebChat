/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.ChatEntry;
import com.webchat.models.EventEntry;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Set;

/**
 *
 * @author hieu
 */
public class EventEntryData {

    private static EventEntryData instance = new EventEntryData();
    private LinkedHashMap<Long, EventEntry> entries;

    private EventEntryData() {
        this.entries = new LinkedHashMap<>();
        addEventEntry(new EventEntry());
    }

    public static EventEntryData getInstance() {
        return instance;
    }

    public Collection<EventEntry> getEventEntries() {
        return entries.values();
    }

    public EventEntry getEventEntry(long timeStamp) {
        return entries.get(timeStamp);
    }

    public void addEventEntry(EventEntry entry) {
        entries.put(entry.getTimeStamp(), entry);
    }

    public Collection<ChatEntry> getChatEntries() {
        Set<ChatEntry> chatEntries = new HashSet<>();
        for (EventEntry entry : entries.values()) {
            if (entry.getClass() == ChatEntry.class) {
                chatEntries.add((ChatEntry) entry);
            }
        }
        return chatEntries;
    }

    public ChatEntry getChatEntry(long timeStamp) {
        if (entries.get(timeStamp).getClass() != ChatEntry.class) {
            return null;
        } else {
            return (ChatEntry) entries.get(timeStamp);
        }
    }
}
