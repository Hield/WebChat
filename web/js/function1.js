/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pollId;

$(document).ready(function () {

    //----- Register action -----//
    $(".register-form").submit(function (event) {
        event.preventDefault();
        register(this);
    });

    //----- Login action -----//
    $(".login-form").submit(function (event) {
        event.preventDefault();
        login(this);
    });

    //----- Logout action -----//
    $(".logout-button").click(function () {
        logout();
    });

    //----- Send message action -----//
    $(".chat-form").submit(function (event) {
        event.preventDefault();
        sendMessage(this);
    });

    //----- Call to initialize -----//
    init();
});

//----- Initialize -----//
function init() {
    $(".chat-page").show();
    console.log("HHH");
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
        type: "POST",
        url: "api/sessions",
        contentType: "application/xml",
        dataType: "xml",
        data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<user>" +
                "<username>" + username + "</username>" +
                "<password>" + password + "</password>" +
                "</user>",
        complete: function (data) {
            var xml = data.responseXML;
            var result = $(xml).find("result").html();
            if (result === "failure") {
                var message = $(xml).find("message").html();
                $(".login-form-error-span").html(message + "<br/>");
            } else if (result === "success") {
                var sessionId = $(xml).find("sessionId").html();
                localStorage.setItem("sessionId", sessionId);
                localStorage.setItem("username", username);
                render("#chat");
              //  $('#welcomeHeading').html("Welcome " + username);
                //$(".chat-division").attr("id", username);
            }
        },
        cache: false
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
            type: "POST",
            url: "api/users",
            contentType: "application/xml",
            dataType: "xml",
            data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                    "<user>" +
                    "<username>" + username + "</username>" +
                    "<password>" + password + "</password>" +
                    "</user>",
            success: function () {
                console.log("Success");
            },
            complete: function (data) {
                var xml = data.responseXML;
                var result = $(xml).find("result").html();
                if (result === "failure") {
                    var message = $(xml).find("message").html();
                    $(".register-form-error-span").html(message + "<br/>");
                } else if (result === "success") {
                    var sessionId = $(xml).find("sessionId").html();
                    localStorage.setItem("sessionId", sessionId);
                    localStorage.setItem("username", username);
                    render("#chat");
                   // $('#welcomeHeading').html("Welcome " + username);
                    //$(".chat-division").attr("id", username);
                }
            },
            cache: false
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
        /*
         var type = $(data).find("type").html();
         var timeStamp = $(data).find("timeStamp").html();                    
         if (type === "chat") {
         console.log("FROM chat");
         $.ajax({
         type    :  "GET",
         url     : "api/event-entries/chat/" + timeStamp,
         headers : {
         "sessionId": localStorage.getItem("sessionId")
         },
         dataType: "xml",
         success : function(data) {
         var message = $(data).find("message").html();
         var roomId = $(data).find("roomId").html();
         var username = $(data).find("username").html();
         var chatDivision = $("#chat-room-" + roomId).find(".chat-division");
         chatDivision.html(chatDivision.html() + "<p>" + username + ": " + message + "</p>");
         },
         cache   : false
         });
         }
         poll();
         */
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
                            var time = $(data).find("time").html();
                            var chatDivision = $("#chat-room-" + roomId).find(".chat-division");

                            //var currentUser = $(".chat-division").attr("id");
                            
                            if (localStorage.getItem("username") !== username) {
                                updateChatDivision("received", username + ": " + message, time);
                            } else {
                                updateChatDivision("sent", username + ": " + message, time);
                            }
                            
                            //----- Scroll to bottom for new message -----//
                            $('.chat-division').animate({scrollTop: $('.chat-division')[0].scrollHeight}, 1);
                            //chatDivision.html(chatDivision.html() + "<p>" + username + ": " + message + "</p>");
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
        }
    }
}

//----- Send message function -----//
function sendMessage(form) {
    var message = $(form).find("[name='message']").val();
    var roomId = $(form).parent().attr("id").split("-room-")[1];

    $(".message-input").val("");
    $.ajax({
        type: "POST",
        url: "api/event-entries/chat",
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


//<<<<<<< HEAD
//=======
//}
//
////----- Poll All Function -----//
//function pollAll() {
//    var sessionId = localStorage.getItem("sessionId");
//    var isComplete = false;
//            $.ajax({
//                type: "GET",
//                url: "api/sessions/" + sessionId + "/update",
//                headers: {
//                    "sessionId": sessionId
//                },
//                dataType: "xml",
//                success: function (data) {
//                    var result = $(data).find("result").html();
//					if (result === "success") {
//			        console.log(data);
//					var newestIndex = parseInt($(data).find("newest").html());
//					for (var i = 0; i <= newestIndex; i++) {
//						$.ajax({
//							type: "GET",
//							url: "api/sessions/" + localStorage.getItem("sessionId") + "/" + i,
//							headers: {
//								"sessionId": localStorage.getItem("sessionId")
//							},
//							dataType: "xml",
//							success: function (data) {
//								var type = $(data).find("type").html();
//								if (type === "chat") {
//									var message = $(data).find("message").html();
//									var roomId = $(data).find("roomId").html();
//									var username = $(data).find("username").html();
//									var time = $(data).find("time").html();
//									var chatDivision = $("#chat-room-" + roomId).find(".chat-division");
//
//									//var currentUser = $(".chat-division").attr("id");
//                            
//									if (localStorage.getItem("username") !== username) {
//										updateChatDivision("received", username + ": " + message, time);
//									} else {
//										updateChatDivision("sent", username + ": " + message, time);
//									}
//                            
//									//----- Scroll to bottom for new message -----//
//									$('.chat-division').animate({scrollTop: $('.chat-division')[0].scrollHeight}, 1);
//									isComplete = true;
//								}
//							},
//							error: function (data) {
//								console.log(data);
//							},
//							cache: false
//							});
//					}
//        
//					} else if (result === "failure") {
//						var message = $(data).find("message").html();
//						if (message === "sessionTimeout") {
//							localStorage.removeItem("sessionId");
//							localStorage.removeItem("username");
//					}
//					}
//                },
//                error: function (data) {
//                    console.log(data);
//                },
//				complete: function () {
//					return isComplete;
//				},
//                cache: false
//            });
//	
//	
//>>>>>>> 6068cb8e867f4ad0e4969a70f43baeb75104e932
//}