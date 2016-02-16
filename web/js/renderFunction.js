/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    $(window).on("hashchange", function () {
        render(decodeURI(window.location.hash));
    });
});

function render(url) {  
    if (url !== decodeURI(window.location.hash)) {
        window.location.hash = url;
    } else {
        var action = url.split("/")[0];
        $(".login-state-control").hide();
        $(".page").hide();
        var map = {
            "": function () {
                renderHomePage();
            },
            "#login": function () {
                renderLoginPage();
            },
            "#register": function () {
                renderRegisterPage();
            },
            "#chat": function () {
                renderChatPage();
            },
            "#users": function () {
                var username = url.split("/")[1];
                renderUsersPage(username);
            }
        };

        if (map[action]) {
            map[action]();
        } else {
            renderErrorPage();
        }
        if (localStorage.getItem("sessionId")) {
            $(".logout-button").parent().show();
        } else {
            $(".show-login-form-button").parent().show();
            $(".show-register-form-button").parent().show();
        }
    }
}

function renderHomePage() {
    var sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
        renderChatPage();
    } else {
        renderLoginPage();
    }
}

function renderLoginPage() {
    var sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        $(".login-page").show();
    } else {
        renderChatPage();
    }
}

function renderRegisterPage() {
    var sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        $(".register-page").show();
    } else {
        renderChatPage();
    }
}

function renderChatPage() {
    var sessionId = localStorage.getItem("sessionId");
    var username = localStorage.getItem("username");
    if (sessionId) {
        $(".chat-page").show();
        $(".bubble").remove();
        $("#welcomHeading").html("Welcome" + username);
        poll();

    } else {
        renderHomePage();
    }
}

function renderUsersPage(username) {
    $(".user-page-username").html(username);
    $(".user-page").show();
}

function renderErrorPage() {
    $(".error-page").show();
}