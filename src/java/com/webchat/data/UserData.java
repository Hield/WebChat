/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.data;

import com.webchat.models.User;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author hieu
 */
public class UserData {

    private static UserData instance = new UserData();
    private Map<String, User> users;

    private UserData() {
        this.users = new HashMap<>();
        addUser(new User("admin", "password"));
    }

    public static UserData getInstance() {
        return instance;
    }

    public void addUser(User user) {
        users.put(user.getUsername(), user);
    }

    public User getUser(String username) {
        return users.get(username);
    }

    public Collection<User> getUsers(){
        return users.values();
    }
    
    public boolean authenticate(String username, String password) {
        User user = users.get(username);
        if (user == null) {
            return false;
        } else {
            return user.getPassword().equals(password);
        }
    }

    public boolean isAvailable(String username) {
        return !users.containsKey(username);
    }
}
