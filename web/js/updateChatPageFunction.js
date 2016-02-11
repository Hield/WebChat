$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision("received", "Hello World");
		updateChatDivision("sent", "Hi Worlddd");
	});
});


function updateChatDivision(messageType, message, time) {
	if (messageType === "received") {
		var $chatDivision = $(".chat-division");
		console.log(time);
		$chatDivision.append('<div class="bubble"><p class="receiver">' + message + '</p><span class="time">' + time + '<span></div>');
	}
	else if (messageType === "sent") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble bubble-right"><p class="sender">' + message + '</p><span class="time">' + time + '</span</div>');
		var $chatBubble = $(".bubble-right");
		$chatBubble.css("background", "#99ffff");
		$chatBubble.css("border-bottom-color", "#99ffff");
	}
}
