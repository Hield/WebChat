var pollId;
var currentUser;
var chatRooms = new ChatRoomData();
user = new User("guest");

$(document).ready(function () {

    //----- Register action -----//
    $(".register-form").submit(registerHandler);
    /*
    $(".register-form").submit(function (event) {
        event.preventDefault();
        register(this);
    });
    */
    //----- Login action -----//
    $(".login-form").submit(function (event) {
        event.preventDefault();
        login(this);
    });

    //----- Logout action -----//
    $(".logout-button").click(function () {
        logout();
        render("");
    });

    //----- Close tab action -----//
    $(window).on("beforeunload", function(){
        outRoomsTemporary();
    });

    //----- Call to initialize -----//
    init();
});

//----- Reset function -----//
function reset() {
    chatRooms = new ChatRoomData();
    $(".chat-rooms").html("");
    $(".contacts").html("");
}

//----- Initialize -----//
function init() {
    reset();
    if (localStorage.getItem("sessionId")) {
        $.ajax({
            type    : "GET",
            url     : "api/sessions/" + localStorage.getItem("sessionId"),
            dataType: "xml",
            success : function(data) {
                console.log(data);
                var result = $(data).find("result").html();
                if (result === "success") {
                    rejoinRooms();
                    currentUser = $(data).find("username").html();
                    loadData($(data).find("username").html());
                    render(window.location.hash);
                    sendLogEntry("in");
                } else if (result === "failure") {
                    localStorage.removeItem("sessionId");
                    render("#login");
                }
            },
            error   : function() {
                localStorage.removeItem("sessionId");
                render("#login");
            }
        });
    } else {
        render("#login");
    }
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
function login(form) {
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
                reset();
                var sessionId = $(xml).find("sessionId").html();
                currentUser = $(xml).find("username").html();
                loadData(username);
                localStorage.setItem("sessionId", sessionId);
                sendLogEntry("in");
                joinRoom(0);
                render("#chat");
            }
        },
        cache       : false
    });
    $(form).find("[name='username']").val("");
    $(form).find("[name='password']").val("");
}

//----- Register function -----//
function register(form) {
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
            console.log(xml);
                var result = $(xml).find("result").html();
                if (result === "failure") {
                    var message = $(xml).find("message").html();
                    $(".register-form-error-span").html(message + "<br/>");
                } else if (result === "success") {                   
                    var sessionId = $(xml).find("sessionId").html();
                    currentUser = $(xml).find("username").html();
                    localStorage.setItem("sessionId", sessionId);
                    joinRoom(0);
                    render("#chat");
                }
            },
            cache      : false
        });
    }
}

//----- Logout function -----//
function logout() {
    sendLogEntry("out");
    $.ajax({
        type : "DELETE",
        url  : "api/sessions/" + localStorage.getItem("sessionId"),
        cache: false
    });
    localStorage.removeItem("sessionId");
    currentUser = "";
    outRoomsCompletely();
    stopPolling();
}

//----- Function that load data when user login -----//
function loadData(username) {
    user = new User(username);
    $.ajax({
        type     : "GET",
        url      : "api/users/" + username + "/contacts",
        dataType : "xml",
        success  : function(data) {
            $(data).find("contact").each(function(index, element) {
                user.addContact($(element).html());
            });
        }
    });
}

//----- Polling function -----//
function poll() {
    pollId = setInterval(function() {
        if (localStorage.getItem("sessionId")) {
            var sessionId = localStorage.getItem("sessionId");
            $.ajax({
                type    : "GET",
                url     : "api/sessions/" + sessionId + "/update",
                headers : {
                    "sessionId": sessionId
                },
                dataType: "xml",
                success : function(data) {
                    processResponse(data);
                },
                error   : function(data) {
                    console.log(data);
                },
                cache   : false
            });
        }
    }, 500);    
}

function stopPolling() {
    clearInterval(pollId);
}

//----- Process data response from polling function -----//
function processResponse(data) {
    var result = $(data).find("result").html();
    if (result === "success") {
        var currentIndex = parseInt($(data).find("current").html());
        var newestIndex = parseInt($(data).find("newest").html());
        if (currentIndex < newestIndex) {
            for (var i = currentIndex + 1; i <= newestIndex; i++) {
                console.log(i);
                $.ajax({
                    type: "GET",
                    url: "api/sessions/" + localStorage.getItem("sessionId") + "/" + i,
                    headers: {
                        "sessionId": localStorage.getItem("sessionId")
                    },
                    dataType: "xml",
                    success: function(data) {
                        var type = $(data).find("type").html();
                        console.log(data);
                        if (type === "chat") {
                            var message = $(data).find("message").html();
                            var roomId = $(data).find("roomId").html();
                            var username = $(data).find("username").html();
                            var date = $(data).find("date").html();
                            var time = $(data).find("time").html();
                            
                            if (!chatRooms.hasChatRoom(roomId)) {
                                console.log("joinRoom from processResponse")
                                joinRoom(roomId);
                            }
                            var chatRoom = chatRooms.getChatRoom(roomId);
                            chatRoom.addChatEntry(new ChatEntry(username, message, time));
                            if (username !== currentUser) {
                                updateChatDivision("received", username + ": " + message, roomId, date, time);
                            } else {
                                updateChatDivision("sent", username + ": " + message, roomId, date, time);
                            }
                            
                             //----- Scroll to bottom for new message -----//
                            $("#chat-room-" + roomId).find('.chat-division').animate({scrollTop: $("#chat-room-" + roomId).find('.chat-division')[0].scrollHeight}, 1);
                            
                            //var chatDivision = $("#chat-room-" + roomId).find(".chat-division");
                            //chatDivision.html(chatDivision.html() + "<p>" + username + ": " + message + "</p>");
                        } else if (type === "log") {
                            console.log(data);
                        }
                    },
                    error: function(data) {
                        console.log(data);
                    },
                    cache: false
                    });
            }
        }
    } else if (result === "failure") {
        var message = $(data).find("message").html();
        if (message === "sessionTimeout") {
            localStorage.removeItem("sessionId");
            render("login");
            stopPolling();
	}
    }
}

//----- Send message function -----//
function sendMessage(event, form) {
    event.preventDefault();
    var message = $(form).find("[name='message']").val();
    var roomId = $(form).parent().attr("id").split("-room-")[1];
    
    $(".message-input").val("");
    $.ajax({
        type       : "POST",
        url        : "api/events/chat",
        headers    : {
            "sessionId": localStorage.getItem("sessionId")
        },
        contentType: "application/xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
                     "<chatEntry>" +
                         "<roomId>" + roomId + "</roomId>" +
                         "<message>" + message + "</message>" +
                     "</chatEntry>",
        cache      : false
    });
}

function sendLogEntry(state) {
    $.ajax({
        type       : "POST",
        url        : "api/events/log",
        headers    : {
            "sessionId": localStorage.getItem("sessionId")
        },
        contentType: "application/xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
                     "<logEntry>" + 
                         "<username>" + user.username + "</username>" + 
                         "<state>" + state + "</state>" + 
                     "</logEntry>",
        cache      : false
    });
}

//----- Out all rooms temporary function -----//
function outRoomsTemporary() {
    sendLogEntry("out");
    $.ajax({
        type    : "DELETE",
        url     : "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        cache   : false,
        success : function () {
            console.log("success from outRoomsTemporary");
        }
    });
}

//----- Out room function -----//
function outRoom(roomId) {
    
}

//----- Out all rooms completely function -----//
function outRoomsCompletely() {
    $(".chat-rooms").html("");
}

//----- Rejoin rooms function -----//
function rejoinRooms() {
    $.ajax({
        type    : "GET",
        url     : "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        dataType: "xml",
        success : function(data) {
            console.log(data);
            $(data).find("chatRoom").each(function(index, element) {
                console.log("joinRoom from rejoinRooms");
                joinRoom($(element).find("id").html());
            });
        },
        error   : function(data) {
            console.log(data);
        },
        cache   : false
    });
}

//----- Join room function -----//
function joinRoom(roomId) {
    $(".chat-rooms").html($(".chat-rooms").html() + 
        "<div id=\"chat-room-" + roomId + "\" class=\"chat-room\">" + 
            "<div class=\"chat-division\"></div>" +
            "<form class=\"chat-form\" onsubmit=\"sendMessage(event, this);\">" +
                "<input type=\"text\" name=\"message\" class=\"message-input\" autocomplete=\"off\">" + 
                "<button type=\"submit\" id=\"sendingButton\">SEND</button>" + 
            "</form>" + 
        "</div>");
    $.ajax({
        type       : "POST",
        url        : "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        contentType: "application/xml",
        dataType   : "xml",
        data       : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
                     "<chatRoom>" +
                         "<id>" + roomId + "</id>" +
                     "</chatRoom>",
        success    : function(data) {
            if ($(data).find("result").html() === "success") {
                chatRooms.addChatRoom(new ChatRoom(roomId));
            }
        },
        cache      : false
    });
}

//----- Switch room function -----//
function switchRoom(roomId) {
    if (!chatRooms.hasChatRoom(roomId)) {
        console.log("joinRoom from switchRoom");
        joinRoom(roomId);
    }
    $(".chat-room").hide();
    $("#chat-room-" + roomId).show();
    $("#chat-room-" + roomId).find('.chat-division').animate({scrollTop: $("#chat-room-" + roomId).find('.chat-division')[0].scrollHeight}, 1);
}

//----- Function that find room Id for specified user -----//
function chatWithUser(event) {
    var contact = $(event.currentTarget).find("p").html();
    console.log(contact);
    $.ajax({
        type    : "GET",
        url     : "api/rooms/" + contact,
        headers : {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success : function(data) {
            var result = $(data).find("result").html();
            if (result === "success") {
                var roomId = $(data).find("roomId").html();
                switchRoom(roomId);
            } else {
                console.log(data);
            }
        }
    });
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


//---- Variable to hold html elements -----//
var component = {
    dateElement : '<div class="bubble bubble-middle">' +
                        '<p class="date"></p>' +
                    '</div>',
    chatElement : '<div class="bubble">' +
                                '<p class="chat-message"></p>' +
                                    '<span class="time"><span>' +
                        '</div>',
    searchElement: '<li class="contact">' +
            '<div class="contact-box">' +
            '<p></p>' +
            '</div>' +
            '</a>' +
            '</li>'
};


//-------- Function that update chat division ------//
function updateChatDivision(messageType, message, roomId, date, time) {
    var $chatDivision = $("#chat-room-" + roomId).find(".chat-division");
    var date = $chatDivision.find(".date:last").html();

    if(!date || date !== date) {
        $chatDivision.append(component.dateElement);
        $chatDivision.find(".date:last").text(date);
    }

    if (messageType === "received") {
        console.log(messageType);
        $chatDivision.append(component.chatElement);
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    }
    else if (messageType === "sent") {
        console.log("In sent");
        $chatDivision.append(component.chatElement);
        $chatDivision.find(".bubble:last").addClass("bubble-right");
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    }
}
