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
    this.contacts.push(user);
    $(".contacts").append("" + 
        "<li class=\"contact\">" +
            "<div class=\"contact-box\" onclick=\"chatWithUser(event);\">" + 
                "<p>" + user + "</p>" + 
            "</div>" +
        "</li>" +
    "");
};

User.prototype.register = function (response) {
    var result = $(response).find("result").html();
    if (result === "success") {
        localStorage.setItem("sessionId", $(response).find("sessionId").html());
        user.setUsername($(response).find("username").html());
        joinRoom(0);
        render("#chat");
    } else {
        $(".register-form-error-span").html($(response).find("message").html() + "<br/>");
    }
};

User.prototype.login = function (response) {
    
};

User.prototype.logout = function (response) {
    
};

User.prototype.joinRoom = function (response) {
    
};
