$(document).ready(function () {
	$("#test-btn").click( function() {
		updateChatDivision("receiver", "Hello World");
		updateChatDivision("sender", "Hi World");
	});
});

//
function updateChatDivision(object, message) {
	var colors = {"p1": "#95c2fd", "p2": "#7acd47", "p3": "#f4e371"};
	if (object == "receiver") {
		var $chatDivision = $(".chat-division");
		var color= colors["p1"];
		console.log(color);
		$chatDivision.append('<div class="bubble"><p>'+message+'</p></div>');
	}
	else if (object == "sender") {
		var $chatDivision = $(".chat-division");
		$chatDivision.append('<div class="bubble bubble-alt"><p>'+message+'</p></div>');
	}
}
