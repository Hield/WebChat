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

            <!---- Login Page/Register Page ---->
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
            </div><!---- Login Page/Register Page ---->

            <!---- Chat Page ---->

            <div class="chat-page page">

                <!---- Profile Container ---->
                <div class="profile-container">
                    <div class='profile-info'>
                        <div class='profile-info-name'>
                            <h2></h2>
                        </div>
<!--                        <div class='profile-info-job'>
                            <p>Doctor</p> 
                        </div>-->
                    </div>
                </div><!---- /Profile Container ---->

                <!---- Navigation bar ---->
                <nav class="navbar">
                    <div class="group-info">
                        <h1 class="group-info-name"></h1>
<!--                        <div class="arrow-down"></div>
                        <h4 class="group-info-number">6 members</h4>-->
                    </div>

                    <div class='navbar-buttons'>

                        <div class="plus">
                            <span class="fa-stack fa-2x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-plus fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>

                        <div class="dropdown">
                            <span class="fa-stack fa-2x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-wrench fa-stack-1x fa-inverse" id="wrench"></i>
                            </span>
                            <div id="myDropdown" class="dropdown-content" style="display: none">
                                <a href="#">PATIENT MANAGEMENT</a>
                                <a href="#">SETTING</a>
                                <a href="#" class="logout-button">LOGOUT</a>
                            </div> 
                        </div>
                    </div>
                </nav><!---- /Navigation bar ---->

                <!---- Sidebar ---->
                <aside class='chat-sidebar'>

                    <div id="wrapper">

                        <ul id="tabs">
                            <li class="tab current-tab" data-id="tab1">
                                Contact
                            </li>
                            <li class="tab" data-id="tab2">
                                Group
                            </li>
                            <li class="tab search-tab" data-id="tab3">
                                Search
                            </li>
                        </ul>

                    </div>

                    <div class="tabs-content">
                        <div id="tab1" class="tab-content">
                            <div class="search">
                                <input type="search" class="search-input" 
                                       id="search-input-local" placeholder="Search Local">
                            </div>

                            <ul class="search-contacts">
                                <!-- ***Example search contact***
                                <li class='contact'>
                                    <div class='contact-box'>
                                        <p>Tina Chang</p>
                                    </div>
                                    </a>
                                 </li>
                                -->
                            </ul>
                            <ul class="contacts">
                                <!-- ***Example search contact***
                                <li class='contact'>
                                    <div class='contact-box'>
                                        <p>Tina Chang</p>
                                    </div>
                                    </a>
                                 </li>
                                -->
                            </ul>

                        </div>

                        <div id="tab3" class="tab-content" style="display: none">
                            <div class="search">
                                <input type="search" class="search-input" 
                                       id="search-input-global" placeholder="Search Global"> 
                            </div>

                            <ul class="search-contacts">

                                <!-- ***Example search contact***
                                <li class='contact'>
                                    <div class='contact-box'>
                                        <p>Tina Chang</p>
                                    </div>
                                    </a>
                                 </li>
                                -->
                            </ul>
                        </div>
                    </div>


                    <!--                    
                    <ul class="search-contacts">
                    <!--
                    ***Example search contact***
                    <li class='contact'>
                        <div class='contact-box'>
                            <p>Tina Chang</p>
                        </div>
                        </a>
                    </li>
                
            </ul>


            <ul class='contacts'>
                <li class='contact'>
                    <div class='contact-box'>
                        <div class='contact-box-info'>
                            <p>Tina Chang</p>
                        </div>
                        <div class="status">
                            <div class="status-icon status-online">
                            </div>
                        </div>
                    </div>
                    </a>
                </li>
            </ul>
            !-->

                </aside><!---- /Sidebar ---->

                <!---- Chat rooms ---->
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
                </div><!---- /Chat rooms ---->

            </div>

            <div class="user-page page">
                <h2 class="user-page-username"></h2>

            </div>

            <div class="error-page page">
                <h3>Sorry, something went wrong</h3>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<!--        <script src="js/components/components.js"></script>-->
        <script src="js/classes.js"></script>
        <script src="js/models/user.js"></script>
        <script src="js/models/data.js"></script>
        <script src="js/controllers/user_controller.js"></script>
        <script src="js/controllers/data_controller.js"></script>
        <script src="js/handlers/init_handler.js"></script>
        <script src="js/handlers/login_handler.js"></script>
        <script src="js/handlers/logout_handler.js"></script>
        <script src="js/handlers/register_handler.js"></script>
        <script src="js/renderFunction.js"></script>
        <script src="js/function.js"></script>
        <script src="js/displayFunction.js"></script>
        <script src="js/searchFunction.js"></script>
        <script src="js/chatFunction.js"></script>
    </body>
</html>
