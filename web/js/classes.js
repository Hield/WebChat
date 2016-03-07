/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Class that represents an user
var OldUser = function (username) {
    this.username = username;
    this.contacts = [];
};

OldUser.prototype.setUsername = function (username) {
    this.username = username;
};

OldUser.prototype.addContact = function (user) {
    this.contacts.push(user);
    $(".contacts").append("" + 
        "<li class=\"contact\">" +
            "<div class=\"contact-box\" onclick=\"chatWithUser(event);\">" + 
                "<p>" + user + "</p>" + 
            "</div>" +
        "</li>" +
    "");
};

var Contact = function(username, roomId) {
    this.username = username;
    this.roomId = roomId;
};

// Class that represents a chat entry
var ChatEntry = function (username, message, time) {
    this.username = username;
    this.message = message;
    this.timeStamp = time;
};

// Class that represents a chat room which contains list of users and chat entries
var ChatRoom = function (id) {
    this.id = id;
    this.users = [];
    this.chatEntries = [];
};

ChatRoom.prototype.addUser = function (user) {
    this.users.push(user);
};

ChatRoom.prototype.addChatEntry = function (chatEntry) {
    this.chatEntries.push(chatEntry);
};

// Class that holds a map of chat rooms based on their id
var ChatRoomData = function () {
    this.chatRooms = {};
};

ChatRoomData.prototype.addChatRoom = function (chatRoom) {
    this.chatRooms[chatRoom.id] = chatRoom;
};

ChatRoomData.prototype.getChatRoom = function (roomId) {
    if (this.chatRooms.hasOwnProperty(roomId)) {
        return this.chatRooms[roomId];
    } else {
        return null;
    }
};

ChatRoomData.prototype.hasChatRoom = function(roomId) {
    return this.chatRooms.hasOwnProperty(roomId);
};
