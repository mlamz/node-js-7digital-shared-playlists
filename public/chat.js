$(document).ready(function(){
	now.ready(function() {
		now.receiveNewUser = function(user){
			$("#user-list").append("<li class='user-box small' data-user='" + user + "'>" + user + "</li>");
		}

		now.name = prompt("Whats your name?", "");

		if (!now.name){
			now.name = "user with no name";
		}
		$("#welcome-message").text("Welcome, " + now.name);

		now.distributeNewUser(now.name);
		
		now.receiveMessage = function(name, message){
			if (message) {
				var chatHtml = "<li class='small'><span class='chat-name'>" + name + ": </span>" + message + "</li>";
		    	$("#messages").prepend(chatHtml);
			}
		}
		now.receiveUserLeftMessage = function(name){
			if (name) {
				$("#messages").prepend("<li class='small'>" + name + " has left.</li>");
				$("li.user-box[data-user="+name+"]").remove();
			}

		}
		now.receiveUserJoinedMessage = function(name){
			$("#messages").prepend("<li class='small'>" + name + " has joined.</li>");
		}

		$("#chat-form").submit(function(e){
			e.preventDefault();
			now.distributeMessage($("#text-input").val());
			$("#text-input").val('');
		})
	})
});