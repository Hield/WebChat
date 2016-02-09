$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision("received", "Hello World");
		updateChatDivision("sent", "Hi World");
	});
});

//
function updateChatDivision(messageType, message, timeStamp) {
	if (messageType == "received") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble"><p>' + message + '</p><span>' + timeStamp + '<span></div>');
	}
	else if (messageType == "sent") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble bubble-right"><p class="sender">' + message + '</p><span>' + timeStamp + '</span</div>');
		var $chatBubble = $(".bubble-alt");
		$chatBubble.css("background", "#99ffff");
		$chatBubble.css("border-bottom-color", "#99ffff");
	}
}
