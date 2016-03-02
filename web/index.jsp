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
        <link rel="icon" href="favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <!--        <nav class="navigation">            
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
                </nav>-->

        <div class="container">

            <!---- Register Page ---->
            <div class="register-page page" >
                <div class="show-login-page">
                    <a href="#login" class="show-login-form-button button">
                        login
                    </a>   
                </div>

                <div class="banner-register">
                    <span>create an account</span>
                </div>
                <form class="register-form">
                    <label for="username">username</label>
                    <input type="text" name="username" autofocus class="input-username"><br>
                    <label for="password">password</label>
                    <input type="password" name="password" class="input-password"><br>
                    <span class="alert register-form-error-span"></span>
                    <button type="submit" id="registerButton">submit</button>
                </form>
            </div>

            <!---- Login Page ---->
            <div class="login-page page">
                <div class="banner-welcome">
                    <h2 class="banner-h2">welcome to</h2>
                    <h1 class="banner-h1">LOONF</h1>
                </div>

                <div class="banner-login">
                    <span>login</span>
                </div>
                <form class="login-form">
                    <label for="username">username</label>
                    <input type="text" name="username" autofocus class="input-username"><br>
                    <label for="password">password</label>
                    <input type="password" name="password" class="input-password"><br>
                    <span class="alert login-form-error-span"></span>
                    <button type="submit" id="logInButton">sign in</button><br>
                    <a href="#register" class="show-register-form-button button">
                        register
                    </a>
                </form>
            </div>

            <!---- Chat Page ---->

            <!--            <div class="chat-page page">
                            <nav class="navigation">            
                                <div class="container">
                                    <span class="navigation-title">Welcome to chat</span>
                                    <ul class="navigation-list float-right">
                                        <li class="navigation-item login-state-control">
                                            <a class="logout-button button">
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>-->
            <div class="chat-page page">
                <div class="profile">

                </div>



                <nav class="navbar">


                    <div class='navbar-buttons'>
                        <div class="dropdown">
                            <span onclick="myFunction()" class="fa-stack fa-2x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-wrench fa-stack-1x fa-inverse"></i>
                            </span>
                            <div id="myDropdown" class="dropdown-content">
                                <a href="#home">Home</a>
                                <a href="#about">About</a>
                                <a href="#contact">Contact</a>
                            </div> 
                        </div>

                        <div class="plus">
                            <span class="fa-stack fa-2x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-plus fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>

                    </div>




                </nav>
                <aside class='chat-sidebar'>
                    <!--                    <div class="search-container">
                                            <span class="icon"><i class="fa fa-search"></i></span>
                                            <input type="search" id="search" placeholder="Search" />
                                        </div>-->

                    <div class="search">
                        <input type="search" class="search-input" placeholder="Search">
                    </div>

                    <ul class='search-contacts'>
                        <!--
                            ***Example search contact***
                            <li class='contact'>
                                <div class='contact-box'>
                                    <p>Tina Chang</p>
                                </div>
                                </a>
                            </li>
                        -->
                    </ul>


                    <ul class='contacts'>
                        <!--
                            ***Example contact***
                            <li class='contact'>
                                <div class='contact-box'>
                                    <p>Tina Chang</p>
                                </div>
                                </a>
                            </li>
                        -->
                    </ul>
                </aside>
                <div class="chat-rooms">
                    <!--
                        ***Example chatroom***                       
                        <div id="chat-room-0" class="chat-room">
                            <div class="chat-division"></div>
                            <form class="chat-form">
                                <input type="text" name="message" class="message-input" 
                                       autofocus autocomplete="off"
                                       placeholder="Type your message" id="sendingInput">
                                <button type="submit" id="sendingButton"><i class="fa fa-paper-plane"></i></button>
                            </form>
                        </div>
                    -->
                </div>
                <a class="logout-button button">
                    Logout
                </a>
            </div>

            <div class="user-page page">
                <h2 class="user-page-username"></h2>

            </div>

            <div class="error-page page">
                <h3>Sorry, something went wrong</h3>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="js/classes.js"></script>
        <script src="js/function.js"></script>
        <script src="js/updateChatPageFunction.js"></script>
        <script src="js/renderFunction.js"></script>
    </body>
</html>
