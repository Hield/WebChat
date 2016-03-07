var pollId;
var currentUser;
var chatRooms = new ChatRoomData();
var user = new User("guest");

$(document).ready(function () {

    //----- Register action -----//
    $(".register-form").submit(registerHandler);

    //----- Login action -----//
    $(".login-form").submit(loginHandler);

    //----- Logout action -----//
    $(".logout-button").click(logoutHandler);

    //----- Close tab action -----//
    $(window).on("beforeunload", function () {
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
            type: "GET",
            url: "api/sessions/" + localStorage.getItem("sessionId"),
            dataType: "xml",
            success: function (data) {
                var result = $(data).find("result").html();
                if (result === "success") {
                    rejoinRooms();
                    //currentUser = $(data).find("username").html();
                    var username = $(data).find("username").html();
                    user.setUsername(username);
                    loadData(username);
                    render(window.location.hash);
                    sendLogEntry("in");
                } else if (result === "failure") {
                    localStorage.removeItem("sessionId");
                    render("#login");
                }
            },
            error: function () {
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

//----- Function that load data when user login -----//
function loadData(username) {
    user = new User(username);
    $.ajax({
        type: "GET",
        url: "api/users/" + username + "/contacts",
        dataType: "xml",
        success: function (data) {
            $(data).find("contact").each(function (index, element) {
                user.addContact($(element).html());
            });
        }
    });
}

//----- Polling function -----//
function poll() {
    pollId = setInterval(function () {
        if (localStorage.getItem("sessionId")) {
            var sessionId = localStorage.getItem("sessionId");
            $.ajax({
                type: "GET",
                url: "api/sessions/" + sessionId + "/update",
                headers: {
                    "sessionId": sessionId
                },
                dataType: "xml",
                success: function (data) {
                    processResponse(data);
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
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
                $.ajax({
                    type: "GET",
                    url: "api/sessions/" + localStorage.getItem("sessionId") + "/" + i,
                    headers: {
                        "sessionId": localStorage.getItem("sessionId")
                    },
                    dataType: "xml",
                    success: function (data) {
                        var type = $(data).find("type").html();
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
                            //if (username !== currentUser) {
                            if (username !== user.username) {
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
                    error: function (data) {
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
        type: "POST",
        url: "api/events/chat",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        contentType: "application/xml",
        data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<chatEntry>" +
                "<roomId>" + roomId + "</roomId>" +
                "<message>" + message + "</message>" +
                "</chatEntry>",
        cache: false
    });
}

function sendLogEntry(state) {
    $.ajax({
        type: "POST",
        url: "api/events/log",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        contentType: "application/xml",
        data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<logEntry>" +
                "<username>" + user.username + "</username>" +
                "<state>" + state + "</state>" +
                "</logEntry>",
        cache: false
    });
}

//----- Out all rooms temporary function -----//
function outRoomsTemporary() {
    sendLogEntry("out");
    $.ajax({
        type: "DELETE",
        url: "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        cache: false,
        success: function () {
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
        type: "GET",
        url: "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        dataType: "xml",
        success: function (data) {
            $(data).find("chatRoom").each(function (index, element) {
                joinRoom($(element).find("id").html());
            });
        },
        error: function (data) {
            console.log(data);
        },
        cache: false
    });
}

//----- Join room function -----//
function joinRoom(roomId) {
    $(".chat-rooms").append("")
    $(".chat-rooms").html($(".chat-rooms").html() +
            "<div id=\"chat-room-" + roomId + "\" class=\"chat-room\">" +
            "<div class=\"chat-division\"></div>" +
            "<form class=\"chat-form\" onsubmit=\"sendMessage(event, this);\">" +
            "<input type=\"text\" name=\"message\" class=\"message-input\" autocomplete=\"off\">" +
            "<button type=\"submit\" id=\"sendingButton\">SEND</button>" +
            "</form>" +
            "</div>");
    $.ajax({
        type: "POST",
        url: "api/sessions/" + localStorage.getItem("sessionId") + "/rooms",
        contentType: "application/xml",
        dataType: "xml",
        data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<chatRoom>" +
                "<id>" + roomId + "</id>" +
                "</chatRoom>",
        success: function (data) {
            if ($(data).find("result").html() === "success") {
                chatRooms.addChatRoom(new ChatRoom(roomId));
            }
        },
        cache: false
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
    $.ajax({
        type: "GET",
        url: "api/rooms/" + contact,
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function (data) {
            console.log(data);
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

$('#tabs').on('click', '.tab', function () {
    $('#tabs .tab').removeClass('current-tab');
    $(this).toggleClass('current-tab');
    var dataId = $(this).data('id');
    $('.tabs-content .tab-content').each( function (index, element){
	   if (dataId !== $(element).attr('id'))
		   $(element).hide();
	   else
		   $(element).show();
	});
	//var dataId = '#' + $(this).data('id');
   	//$(dataId).show();
});

//-------- Function that update chat division ------//
function updateChatDivision(messageType, message, roomId, datePara, time) {
    var $chatDivision = $("#chat-room-" + roomId).find(".chat-division");
    var date = $chatDivision.find(".date:last").html();

    if (!date || datePara !== date) {
        $chatDivision.append(components.dateElement);   //components is a global variable in compoments.js
        $chatDivision.find(".date:last").text(datePara);
    }

    if (messageType === "received") {
        $chatDivision.append(components.chatElement);
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    } else if (messageType === "sent") {
        $chatDivision.append(components.chatElement);
        $chatDivision.find(".bubble:last").addClass("bubble-right");
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    }
}

//------ Function that trigger event to add a user' contact on server -----//
function addToContact(event) {
	var contact = $(event.currentTarget).find("p").html();
    $.ajax({
        type: "PUT",
        url: "api/users/" + user.username + "/contacts/update",
        contentType: "application/xml",
        data: '<?xml version="1.0" encoding="UTF-8" ?>' +
              '<user>'+
              '<username>' + contact + '</username>' +
              '</user>'
        
    });
    $(event.currentTarget).parent().remove();
    user.addContact(contact);
	
}
