var queryParams;

$(document).ready(function(){
	now.ready(function() {
		now.receiveNewUser = function(user){
			console.log("new user has joined");
			$("#user-list").append("<li class='user-box small'>" + user + "</li>");
		}

		now.name = prompt("Whats your name?", "");

		if (!now.name){
			now.name = "user with no name";
		}
		$("#welcome-message").text("Welcome, " + now.name);

		queryParams = { usersName : now.name };
		console.log("saving user", now.name);
		now.distributeNewUser(now.name);

		
		
		
		now.receiveMessage = function(name, message){
			var chatHtml = "<br />" + name + " : " + message;
		    $("#messages").prepend(chatHtml);
		}

		$("#chat-form").submit(function(e){
			e.preventDefault();
			now.distributeMessage($("#text-input").val());
			$("#text-input").val('');
		});
	});
});

