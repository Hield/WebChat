/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Data = function () {
    this.chatRooms = {};
};

Data.prototype.addChatRoom = function (chatRoom) {
    this.chatRooms[chatRoom.id] = chatRoom;
};

Data.prototype.getChatRoom = function (roomId) {
    if (this.chatRooms.hasOwnProperty(roomId)) {
        return chatRooms[roomId];
    }
    return null;
};

Data.prototype.hasChatRoom = function (roomId) {
    return this.chatRooms.hasOwnProperty(roomId);
};

Data.prototype.init = function (response) {
    var result = $(response).find("result").html();
    console.log(response);
    if (result === "success") {
        console.log("success from data.init");
    } else {
        console.log("error from data.init");
    }
};

Data.prototype.reset = function () {
    this.chatRooms = {};
    $(".chat-rooms").html("");
    $(".contacts").html("");
};
