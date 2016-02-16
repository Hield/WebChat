

$(document).ready(function () {
	$("#test-btn").click( function() {
		//updateChatDivision("received", "Hello World");
		//updateChatDivision("sent", "Hi Worlddd");
		updateChatDivision1("sent", "Hi this is Lieu", "16.02.2016", "10:51");
		updateChatDivision1("sent", "Hello There", "16.02.2016", "10:52");
		updateChatDivision1("received", "Hi this is Tri", "16.02.2016", "10:53");
		updateChatDivision1("received", "Hello There", "16.02.2016", "10:54");
		updateChatDivision1("sent", "Good Bye", "16.02.2016", "10:55");
		updateChatDivision1("received", "Good Bye", "16.02.2016", "10:56");
		updateChatDivision1("received", "Hi this is Hieu", "17.02.2016", "10:56");
		updateChatDivision1("received", "Can I join you guys", "17.02.2016", "10:57");

	});
});

var component = {
	dateElement : '<div class="bubble buble-middle">' +
						'<p class="date"></p>' +
					'</div>',
	chatElement : '<div class="bubble">' +
								'<p class="chat-message"></p>' +
									'<span class="time"><span>' +
						'</div>'
}




function updateChatDivision(messageType, message, time) {
	if (messageType === "received") {
		var $chatDivision = $(".chat-division");
		console.log(time);
		$chatDivision.append('<div class="bubble"><p class="chat-message">' + message + '</p><span class="time">' + time + '<span></div>');
	}
	else if (messageType === "sent") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble bubble-right"><p class="chat-message">' + message + '</p><span class="time">' + time + '</span</div>');
		var $chatBubble = $(".bubble-right");
		$chatBubble.css("background", "#31353d");

                //#1c1d21
                //#445878
	}
}

function updateChatDivision1(messageType, message, date_param, time) {
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
		$chatDivision.find(".chat-message:last").text(message);
		$chatDivision.find(".time:last").text(time);
		$chatDivision.find(".bubble:last").addClass("bubble-right");
		$chatDivision.find(".bubble-right").css({"background": "#99ffff", "border-bottom-color": "#99ffff"});
	}
}
