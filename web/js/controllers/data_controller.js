/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var DataController = function () {
};

//----- Init controller -----//
DataController.prototype.init = function() {
    $.ajax({
        type: "GET",
        url: "api/sessions/" + localStorage.getItem("sessionId"),
        dataType: "xml",
        success: data.init
    });
};

DataController.prototype.reset = function() {
    data.reset();
};

