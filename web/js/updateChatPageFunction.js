$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision("receiver", "Hello World");
		updateChatDivision("sender", "Hisd");
	});
});

//
function updateChatDivision(object, message) {
	if (object == "receiver") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble"><p>'+message+'</p></div>');
	}
	else if (object == "sender") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble right"><p class="sender">' + message + '</p></div>');
		var $chatBubble = $(".right");
		$chatBubble.css("background", "#99ffff");
		$chatBubble.css("border-bottom-color", "#99ffff");
	}
}
