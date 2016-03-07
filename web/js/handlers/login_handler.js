/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var loginHandler = function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var username = $(form).find("[name='username']").val();
    var password = $(form).find("[name='password']").val();
    new UserController().login(username, password);
};

