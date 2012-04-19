$(document).ready(function(){
	now.name = prompt("Whats your name?", "");
	$("#welcome-message").text("Welcome, " + now.name);
	
	now.receiveMessage = function(name, message){
	    $("#messages").prepend("<br />" + name + " : " + message);
	}
	$("#send-button").click(function() {
		
	});

	$("#chat-form").submit(function(e){
		e.preventDefault();
		now.distributeMessage($("#text-input").val());
		$("#text-input").val('');
	});

	$("#track-search").submit(function(e){
		e.preventDefault();

		$.post("/trackSearch", { query : "u2" },
   			function(data) {
     			console.log(data);
   			});
	})
});

