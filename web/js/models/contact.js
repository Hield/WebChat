/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Contact = function(username) {
    this.username = username;
    this.roomId = -1;
};

Contact.prototype.setRoomId = function(roomId) {
    this.roomId = roomId;
};

