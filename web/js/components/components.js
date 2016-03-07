/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//---- Variable to hold html elements -----//
var components = {
    dateElement: '<div class="bubble bubble-middle">' +
            '<p class="date"></p>' +
            '</div>',
    chatElement: '<div class="bubble">' +
            '<p class="chat-message"></p>' +
            '<span class="time"><span>' +
            '</div>',
    searchElement: '<li class="contact">' +
            '<div class="contact-box" onclick="addToContact(event);">' +
            '<p></p>' +
            '</div>' +
            '</a>' +
            '</li>',
    contactElement: '<li class="contact">' +
            '<div class="contact-box" onclick="chatWithUser(event);">' + 
            '<p></p>' + 
            '</div>' +
            '</li>',
    chatRoomElement: '<div id="chat-room-" class="chat-room">' +
            '<div class="chat-division"></div>' +
            '<form class="chat-form" onsubmit="sendMessage(event, this);">' +
            '<input type="text" name="message" class="message-input" autocomplete="off">' +
            '<button type="submit" id="sendingButton">SEND</button>' +
            '</form>' +
            '</div>'
};

