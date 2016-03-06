/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var registerHandler = function(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var username = $(form).find("[name='username']").val();
    var password = $(form).find("[name='password']").val();
    var errorMessage = "";
    if (checkUsername(username) !== "passed") {
        errorMessage = checkUsername(username);
    }
    if (checkPassword(password) !== "passed") {
        errorMessage = checkPassword(password);
    }
    if (errorMessage !== "") {
        $(".register-form-error-span").html(errorMessage + "<br/>");
    } else {
        var controller = new UserController();
        controller.register(username, password);
    }
};

