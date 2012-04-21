var queryParams;

$(document).ready(function(){
	now.ready(function() {
		now.receiveNewUser = function(user){
			console.log("new user has joined");
			$("#user-list").append("<li class='user-box small' data-user='"+user+"'>" + user + "</li>");
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
		now.receiveUserLeftMessage = function(name){
			$("#messages").prepend("<br />" + name + " has left.");
			$("li.user-box[data-user="+name+"]").remove();

		}
		now.receiveUserJoinedMessage = function(name){
			$("#messages").prepend("<br />" + name + " has joined.");
		}

		$("#chat-form").submit(function(e){
			e.preventDefault();
			now.distributeMessage($("#text-input").val());
			$("#text-input").val('');
		})
	})

});


