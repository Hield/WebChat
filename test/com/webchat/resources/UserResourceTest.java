/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webchat.resources;

import com.webchat.data.UserData;
import com.webchat.models.User;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author hieu
 */
public class UserResourceTest {

    private UserResource userResource;
    private UserData userData;

    public UserResourceTest() {
        this.userResource = new UserResource();
        this.userData = UserData.getInstance();
    }

    /**
     * Test of register method, of class UserResource.
     */
    @Test
    public void testRegister_AVAILABLE() {
        User user = new User("test01", "test01");
        String expResult = "<result>success</result>";
        String result = userResource.register(user);
        assertTrue("The user should be registered since there is no other user with the same username in the database.",
                result.contains(expResult));
        assertTrue("The user should be added to the user database.", 
                userData.getUsers().contains(user));
    }

    @Test
    public void testRegister_UNAVAILABLE() {
        User user = new User("test02", "test02");
        String expResult = "<result>failure</result>";
        String expMessage = "<message>This username is not available</message>";
        userResource.register(user);
        assertTrue("The user should be added to the database before the actual test.", 
                userData.getUsers().contains(user));
        String result = userResource.register(user);
        assertTrue("The user should not be registered because test02 is already in the database.",
                result.contains(expResult));
        assertTrue("\"test02\" was a valid input and should only cause error because of unavalability.",
                result.contains(expMessage));
    }

    @Test
    public void testRegister_INVALID_USERNAME_1() {
        User user = new User("", "test03");
        String expResult = "<result>failure</result>";
        String expMessage = "<message>Invalid username format</message>";
        String result = userResource.register(user);
        assertTrue("The username was blank (has less then 5 characters) so it should cause failure when registering.",
                result.contains(expResult));
        assertTrue("The password test03  was in correct format so the error should only be username invalidity.",
                result.contains(expMessage));
        assertFalse("The user should not be added to the database.", 
                userData.getUsers().contains(user));
    }

    @Test
    public void testRegister_INVALID_USERNAME_2() {
        User user = new User("LongerThen12Characters", "test04");
        String expResult = "<result>failure</result>";
        String expMessage = "<message>Invalid username format</message>";
        String result = userResource.register(user);
        assertTrue("The username has more than 12 characters so it should cause failure when registering.",
                result.contains(expResult));
        assertTrue("The password test04 was in correct format so the error should only be username invalidity.",
                result.contains(expMessage));
        assertFalse("The user should not be added to the database.", 
                userData.getUsers().contains(user));
    }

    @Test
    public void testRegister_INVALID_PASSWORD_1() {
        User user = new User("test05", "");
        String expResult = "<result>failure</result>";
        String expMessage = "<message>Invalid password format</message>";
        String result = userResource.register(user);
        assertTrue("The password was blank (has less then 6 characters) so it should cause failure when registering.",
                result.contains(expResult));
        assertTrue("The username test05 was in correct format so the error should only be password invalidity.",
                result.contains(expMessage));
        assertFalse("The user should not be added to the database.", 
                userData.getUsers().contains(user));
    }

    @Test
    public void testRegister_INVALID_PASSWORD_2() {
        User user = new User("test06", "Lorem ipsum dolor sit amet,"
                + " consectetur adipiscing elit. Vestibulum vel metus mollis, interdum ligula eget,"
                + " tempor felis. Cras varius, lacus quis semper rutrum, ante nisl gravida libero,"
                + " eu vestibulum risus lorem eu quam.");
        String expResult = "<result>failure</result>";
        String expMessage = "<message>Invalid password format</message>";
        String result = userResource.register(user);
        assertTrue("The password has more than 128 characters so it should cause failure when registering.",
                result.contains(expResult));
        assertTrue("The username test06 was in correct format so the error should only be password invalidity.",
                result.contains(expMessage));
        assertFalse("The user should not be added to the database.", 
                userData.getUsers().contains(user));
    }
}
