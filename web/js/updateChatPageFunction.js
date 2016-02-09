$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision("received", "Hello World");
		updateChatDivision("sent", "Hisd");
	});
});


function updateChatDivision(messageType, message, timeStamp) {
	if (messageType == "received") {
		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var $chatDivision = $(".chat-division");
		var timeStamp = hour + ":" + minute;
		console.log(timeStamp);
		$chatDivision.append('<div class="bubble"><p class="receiver">' + message + '</p><span>' + timeStamp + '<span></div>');
	}
	else if (messageType == "sent") {
		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var $chatDivision = $(".chat-division");
		var timeStamp = hour + ":" + minute;
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble bubble-right"><p class="sender">' + message + '</p><span>' + timeStamp + '</span</div>');
		var $chatBubble = $(".bubble-right");
		$chatBubble.css("background", "#99ffff");
		$chatBubble.css("border-bottom-color", "#99ffff");
	}
}
