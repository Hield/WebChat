function updateChatDivision(messageType, message, roomId, date_param, time) {
    var $chatDivision = $("#chat-room-" + roomId).find(".chat-division");
    var date = $chatDivision.find(".date:last").html();

    if (!date || date !== date_param) {
        $chatDivision.append(component.dateElement);
        $chatDivision.find(".date:last").text(date_param);
    }

    if (messageType === "received") {
        $chatDivision.append(component.chatElement);
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    }
    else if (messageType === "sent") {
        $chatDivision.append(component.chatElement);
        $chatDivision.find(".bubble:last").addClass("bubble-right");
        $chatDivision.find(".chat-message:last").text(message);
        $chatDivision.find(".time:last").text(time);
    }
    //#1c1d21
    //#445878
}

//--- Update Search Page ---//
function updateSearchPage(foundUser) {
    var $searchContacts = $(".search-contacts");
    $searchContacts.append(component.searchElement);
    $searchContacts.find(".contact-box:last > p").html(foundUser);
}

$(".search-input").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $currentContacts = $(".contacts");
    var $searchContacts = $(".search-contacts");

    if (searchedData != "") {
        $currentContacts.hide();
        $searchContacts.find(".contact").remove();
        $searchContacts.show();

        $.ajax({
            type: "GET",
            url: "api/users",
            headers: {
                "sessionId": localStorage.getItem("sessionId")
            },
            dataType: "xml",
            success: function (responseXML) {
                var $contacts = responseXML.getElementsByTagName("users")[0];
                var contacts = [];
                for (var i = 0; i < $contacts.childNodes.length; i++) {
                    var contact = $contacts.childNodes[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
                    contacts.push(contact);
                }

                contacts.forEach(function (val) {
                    if (val.toLowerCase().indexOf(searchedData) == 0) {
                        console.log(searchedData);
                        console.log(val);
                        updateSearchPage(val);
                    }
                });
            }
        });
    }
    else if (searchedData == "") {
        $currentContacts.show();
        $searchContacts.hide();
    }


    
});

/*****************
//--- Search contacts function ---//
function searchContactsFunction(data) {
    $.ajax({
        type: "GET",
        url: "api/users",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function (responseXML) {
            var $contacts = responseXML.getElementsByTagName("users")[0];
            var contacts = [];
            for (var i = 0; i < $contacts.childNodes.length; i++) {
                var contact = $contacts.childNodes[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
                contacts.push(contact);
            }
            data

            contacts.forEach(function (val) {
                if (val.indexOf(data) !== -1 && data != "") {
                    console.log(data);
                    console.log(val);
                    //updateSearchPage(val);
                }
            });
        }
    });
}
*******************************/