/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.EventEntry;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 *
 * @author hieu
 */
public class EventEntryData {

    private static EventEntryData instance = new EventEntryData();
    private List<EventEntry> entries;

    private EventEntryData() {
        this.entries = new ArrayList<>();
        addEventEntry(new EventEntry());
    }

    public static EventEntryData getInstance() {
        return instance;
    }

    public Collection<EventEntry> getEventEntries() {
        return entries;
    }

    public EventEntry getEventEntry(long timeStamp) {
        return null;
    }

    public void addEventEntry(EventEntry entry) {
        entries.add(entry);
    }
}
