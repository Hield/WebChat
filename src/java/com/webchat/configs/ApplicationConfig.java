/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.configs;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author hieu
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application{
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }
    
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(com.webchat.resources.ChatRoomResource.class);
        resources.add(com.webchat.resources.EventEntryResource.class);
        resources.add(com.webchat.resources.PatientResource.class);
        resources.add(com.webchat.resources.SessionResource.class);
        resources.add(com.webchat.resources.UserResource.class);
    }
}
