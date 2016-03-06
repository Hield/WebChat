/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var UserController = function() {
};

UserController.prototype.register = function(username, password) {
    $.ajax({
        type       : "POST",
        url        : "api/users",
        contentType: "application/xml",
        dataType   : "xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                     "<user>" +
                         "<username>" + username + "</username>" +
                         "<password>" + password + "</password>" +
                     "</user>",
        success    : user.register, // Model function in user.js
        error   : function(data) {
            console.log("error from UserController.register");
            console.log(data);
        },
        cache      : false
    });
};

