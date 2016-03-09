/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var User = function (username) {
    this.username = username;
    this.contacts = [];
};

User.prototype.setUsername = function (username) {
    this.username = username;
};

User.prototype.addContact = function (user) {
    var $currentContacts = $(".contacts");
    var component = {
        contactElement: '<li class="contact">' +
            '<div class="contact-box" onclick="chatWithUser(event);">' + 
            '<p></p>' + 
            '</div>' +
            '</li>'
    }
    this.contacts.push(user);
    $currentContacts.append(component.contactElement);
    $currentContacts.find(".contact-box:last > p").html(user);
};

//----- Register model function -----//
User.prototype.register = function (response) {
    var result = $(response).find("result").html();
    if (result === "success") {
        localStorage.setItem("sessionId", $(response).find("sessionId").html());
        currentUser = $(response).find("username").html();
        user.setUsername($(response).find("username").html());
        //joinRoom(0);
        render("#chat");
    } else {
        $(".register-form-error-span").html($(response).find("message").html() + "<br/>");
    }
};

// Login model function -----//
User.prototype.login = function (response) {
    var result = $(response).find("result").html();
    if (result === "success") {
        reset();
        localStorage.setItem("sessionId", $(response).find("sessionId").html());
        currentUser = $(response).find("username").html();
        user.setUsername($(response).find("username").html());
        loadData(user.username);        
        sendLogEntry("in");
        //joinRoom(0);
        render("#chat");
    } else {
        $(".login-form-error-span").html($(response).find("message").html() + "<br/>");
    }
};

User.prototype.logout = function () {
    localStorage.removeItem("sessionId");
    currentUser = "";
    this.username = "guest";
    outRoomsCompletely();
    stopPolling();
    render("");
};

User.prototype.joinRoom = function (response) {
    
};
