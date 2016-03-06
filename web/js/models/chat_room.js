/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ChatRoom = function (id) {
    this.id = id;
    this.users = [];
    this.chatEntries = [];
};

ChatRoom.prototype.addUser = function (user) {
    this.users.push(user);
};

ChatRoom.prototype.addChatEntry = function(chatEntry) {
    this.chatEntries.push(chatEntry);
};

