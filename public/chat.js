$(document).ready(function(){

	now.name = prompt("Whats your name?", "");
	$("#welcome-message").text("Welcome, " + now.name);

	loadChatMessagesInPlay();
	
	now.receiveMessage = function(name, message){
		var chatHtml = "<br />" + name + " : " + message;
		addToChatMessageCollection(chatHtml);

	    $("#messages").prepend(chatHtml);
	}

	$("#chat-form").submit(function(e){
		e.preventDefault();
		now.distributeMessage($("#text-input").val());
		$("#text-input").val('');
	});

	function loadChatMessagesInPlay(){
		
	}
});

