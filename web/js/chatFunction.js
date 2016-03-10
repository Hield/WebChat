/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//----- Event when clicking on contact-box -----//
$('#tab1').on('click', '.contact-box', function (event) {
    $('#tab1 .contact-box').removeClass('current-contact-box');
    $(this).addClass('current-contact-box');
    chatWithUser(event);
});


//----- Function that find room Id for specified user -----//
function chatWithUser(event) {
    var contact = $(event.currentTarget).find("p").html();
    $.ajax({
        type: "GET",
        url: "api/rooms/" + contact,
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function (data) {
            console.log(data);
            var result = $(data).find("result").html();
            if (result === "success") {
                var roomId = $(data).find("roomId").html();
                $('.group-info-name').html("Chat Room " + roomId);
                switchRoom(roomId);
            } else {
                console.log(data);
            }
        }
    });
}

//----- Send message function -----//
function sendMessage(event, form) {
    event.preventDefault();
    var message = $(form).find("[name='message']").val();
    var roomId = $(form).parent().attr("id").split("-room-")[1];
    $(".message-input").val("");
    if (message) {
        $.ajax({
            type: "POST",
            url: "api/events/chat",
            headers: {
                "sessionId": localStorage.getItem("sessionId")
            },
            contentType: "application/xml",
            data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                    "<chatEntry>" +
                    "<roomId>" + roomId + "</roomId>" +
                    "<message>" + message + "</message>" +
                    "</chatEntry>",
            cache: false
        });
    }

}

