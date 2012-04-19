$(document).ready(function(){
	now.name = prompt("Whats your name?", "");
	
	now.receiveMessage = function(name, message){
	    $("#messages").append("<br />" + name + " : " + message);
	}
	$("#send-button").click(function() {
		
	});

	$("#chat-form").submit(function(){
		now.distributeMessage($("#text-input").val());
		$("#text-input").val('');
		return false;
	})
});

