<%-- 
    Document   : index
    Created on : Feb 2, 2016, 6:49:48 PM
    Author     : hieu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webchat</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <nav class="navigation">            
            <div class="container">
                <a class="navigation-title" href="#">HOME</a>
                <ul class="navigation-list float-right">
                    <li class="navigation-item login-state-control">
                        <a class="logout-button button">
                            Logout
                        </a>
                    </li>
                    <li class="navigation-item login-state-control">
                        <a href="#login" class="show-login-form-button button">
                            Login
                        </a>
                    </li>
                    <li class="navigation-item login-state-control">
                        <a href="#register" class="show-register-form-button button">
                            Register
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        
        <div class="container">
            
            <div class="register-page page" >
                <form class="register-form">
                    <h1>Register form</h1>
                    <input type="text" name="username" placeholder="Username"><br/>
                    <input type="password" name="password" placeholder="Password"><br/>
                    <span class="alert register-form-error-span"></span>
                    <button type="submit">Register</button>
                </form>
            </div>
            
            <div class="login-page page">
                <form class="login-form">
                    <h1>Login form</h1>
                    <input type="text" name="username" placeholder="Username"><br/>
                    <input type="password" name="password" placeholder="Password"><br/>
                    <span class="alert login-form-error-span"></span>
                    <button type="submit" id="logInButton">Log In</button>
                </form>
            </div>
            
            <div class="chat-page page">
                <h1>Welcome</h1>
                <div id="chat-room-0" class="chat-room">
                    <div class="chat-division"></div>
                    <form class="chat-form">
                        <input type="text" name="message" class="message-input" 
                               autofocus autocomplete="off"
                               placeholder="Type your message" id="sendingInput">
                        <button type="submit" id="sendingButton"><i class="fa fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            
            <div class="error-page page">
                <h3>Sorry, something went wrong</h3>
            </div>
        </div>
        
        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="js/updateChatPageFunction.js"></script>
		<script src="js/function1.js"></script>
        <script src="js/renderFunction.js"></script>
    </body>
</html>
