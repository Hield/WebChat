/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var initHandler = function () {
    new DataController().reset();
    if (localStorage.getItem("sessionId")) {
        new DataController().init();
    } else {
        console.log("No session ID!");
        //new PagesController().renderChat();
    }
};

