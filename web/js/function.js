/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    //----- Register action -----//
    $(".register-form").submit(function (event) {
        event.preventDefault();
        register();
    });

    //----- Login action -----//
    $(".login-form").submit(function (event) {
        event.preventDefault();
        login();
    });

    //----- Logout action -----//
    $(".logout-button").click(function () {
        logout();
    });

    //----- Send message action -----//
    $(".chat-form").submit(function (event) {
        event.preventDefault();
        sendMessage();
    });

    //----- Call to initialize -----//
    init();
});

//----- Initialize -----//
function init() {
    render("");
}

//----- Check the validity of username -----//
function checkUsername(username) {
    if (username.length === 0) {
        return "Please input all the fields!";
    }
    if (username.length < 5 || username.length > 12) {
        return "Username must have between 5 characters and 12 characters.";
    }
    return "passed";
}

//----- Check validity of password -----//
function checkPassword(password) {
    if (password.length === 0) {
        return "Please input all the fields!";
    }
    if (password.length < 5 || password.length > 12) {
        return "Password must have between 6 characters and 128 characters.";
    }
    return "passed";
}

//----- Login function -----//
function login() {
    var form = $(".login-form");
    var username = $(form).find("[name='username']").val();
    var password = $(form).find("[name='password']").val();
    $.ajax({
        type       : "POST",
        url        : "api/sessions",
        contentType: "application/xml",
        dataType   : "xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
                     "<user>" + 
                         "<username>" + username + "</username>" + 
                         "<password>" + password + "</password>" + 
                     "</user>",
        complete    : function(data) {
            var xml = data.responseXML;
            var result = $(xml).find("result").html();
            if (result === "failure") {
                var message = $(xml).find("message").html();
                $(".login-form-error-span").html(message + "<br/>");
            } else if (result === "success") {
                var sessionId = $(xml).find("sessionId").html();
                localStorage.setItem("sessionId", sessionId);
                render("#chat");
            }
        }
    });
    $(form).find("[name='username']").val("");
    $(form).find("[name='password']").val("");
}

//----- Register function -----//
function register() {
    var form = $(".register-form");
    var username = $(form).find("[name='username']").val();
    var password = $(form).find("[name='password']").val();
    var errorMessage = "";
    if (checkUsername(username) !== "passed") {
        errorMessage = checkUsername(username);
    }
    if (checkPassword(password) !== "passed") {
        errorMessage = checkPassword(password);
    }
    if (errorMessage !== "") {
        $(".register-form-error-span").html(errorMessage + "<br/>");
    } else {
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
            success    : function() {
                console.log("Success");
            },
            complete   : function(data) {
                var xml = data.responseXML;
                var result = $(xml).find("result").html();
                if (result === "failure") {
                    var message = $(xml).find("message").html();
                    $(".register-form-error-span").html(message + "<br/>");
                } else if (result === "success") {
                    var sessionId = $(xml).find("sessionId").html();
                    localStorage.setItem("sessionId", sessionId);
                    render("#chat");
                }
            }
        });
    }
}

//----- Logout function -----//
function logout() {
    localStorage.removeItem("sessionId");
    render("");
}

//----- Polling function -----//
function poll() {
    if (localStorage.getItem("sessionId")){
        $.ajax({
            type    : "GET",
            url     : "polling",
            headers : {
                "sessionId": localStorage.getItem("sessionId")
            },
            dataType: "xml",
            success : function(data) {
                console.log(data);
                var result = $(data).find("result").html();
                if (result === "success") {
                    poll();
                } else if (result === "failure") {
                    var message = $(data).find("message").html();
                    if (message === "sessionTimeout") {
                        localStorage.removeItem("sessionId");
                    }
                }
            },
            error   : function(data) {
                console.log(data);
                if (data.statusText === "timeout") {
                    poll();
                } else {
                    setTimeout(function() {
                        poll();
                    }, 5000);
                }
            },
            timeout : 30000
        });
    }
}

//----- Send message function -----//
function sendMessage() {
    var message = $(".message-input").val();
    $(".message-input").val("");
    $.ajax({
        type       : "POST",
        url        : "api/event-entries/chat-entries",
        headers    : {
            "sessionId": localStorage.getItem("sessionId")
        },
        contentType: "application/xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
                     "<chatEntry>" +
                         "<message>" + message + "</message>" +
                     "</chatEntry>"
    });
}