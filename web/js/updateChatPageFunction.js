

$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision1("sent", "Hi this is Lieu", "16.02.2016", "10:51");
		updateChatDivision1("sent", "Hello There", "16.02.2016", "10:52");
		updateChatDivision1("received", "Hi this is Tri", "16.02.2016", "10:53");
		updateChatDivision1("received", "Hello There", "16.02.2016", "10:54");
		updateChatDivision1("sent", "Good Bye", "16.02.2016", "10:55");
		updateChatDivision1("received", "Good Bye", "16.02.2016", "10:56");
		updateChatDivision1("received", "Hi this is Hieu", "17.02.2016", "10:56");
		updateChatDivision1("received", "Can I join you guys", "17.02.2016", "10:57");
		updateChatDivision1("received", "Hi this is Nam", "18.02.2016", "10:56");
	});
});

var component = {
	dateElement : '<div class="bubble bubble-middle">' +
						'<p class="date"></p>' +
					'</div>',
	chatElement : '<div class="bubble">' +
						'<p class="chat-message"></p>' +
						'<span class="time"><span>' +
					'</div>'
	searchElement: ' <li class="contact">' +
                        '<div class="contact-box">' +
                            '<p></p>' +
                         '</div>' + 
                        '</a>' +
                    '</li>' +
}

function updateChatDivision(messageType, message, date_param, time) {
	var $chatDivision = $(".chat-division");
	var date = $chatDivision.find(".date:last").html();

	if(!date || date !== date_param) {
		console.log(date_param);
		$chatDivision.append(component.dateElement);
		$chatDivision.find(".date:last").text(date_param);
	}

	if (messageType === "received") {
		console.log(messageType);
		$chatDivision.append(component.chatElement);
		$chatDivision.find(".chat-message:last").text(message);
		$chatDivision.find(".time:last").text(time);
	}
	else if (messageType === "sent") {
		console.log("In sent");
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

}

//--- Search contacts action ---//
$(".search-input").on("input", function() {
	var searchedData = $(this).val();
	$.ajax({
        type: "GET",
        url: "api/users",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function(responseXML) {
            var $contacts = responseXML.getElementsByTagName("users")[0];
            var contacts = [];
            for (var i = 0; i < $contacts.childNodes.length; i++) {
            	var contact = $contacts.childNodes[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
            	contacts.push(contact);
            }

           	contacts.forEach( function(val) {
           		if (val.indexOf(searchedData) !== -1 && searchedData != "")  {
            		console.log(searchedData);
            		console.log(val);
            		//updateSearchPage(val);
            	}
            });
   		}
    });
});

//--- Search contacts function ---//
function searchContactsFunction(data) {
    $.ajax({
        type: "GET",
        url: "api/users",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function(responseXML) {
            var $contacts = responseXML.getElementsByTagName("users")[0];
            var contacts = [];
            for (var i = 0; i < $contacts.childNodes.length; i++) {
            	var contact = $contacts.childNodes[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
            	contacts.push(contact);
            }data

           	contacts.forEach( function(val) {
           		if (val.indexOf(data) !== -1 && data != "")  {
            		console.log(data);
            		console.log(val);
            		//updateSearchPage(val);
            	}
            });

            
        }
    });

}


