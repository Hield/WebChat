/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Class that represents an user
var User = function (username) {
    this.username = username;
    this.contacts = [];
};

User.prototype.setUsername = function (username) {
    this.username = username;
};

User.prototype.addContact = function (user) {
    this.contacts.push(user);
};

// Class that represents a chat entry
var ChatEntry = function (username, message, timeStamp) {
    this.username = username;
    this.message = message;
    this.timeStamp = timeStamp;
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



