var mongoose = require('mongoose'), 
	User = new mongoose.Schema({
    	name : String,
    	joined : Date
	}),
	ChatMessage = new mongoose.Schema({
		name: String,
		message: String,
		createdAt: Date
	}),
	MS_PER_MINUTE = 60000,
	SHOW_CONNECTED_USERS_FOR = 30,
  homeViewModel;

mongoose.model('User', User);
var User = mongoose.model('User');

mongoose.model('ChatMessage', ChatMessage);
var ChatMessage = mongoose.model('ChatMessage');

homeViewModel = function(){
  this.Users = [],
  this.ChatMessages = []
}

function findAllUsers(homeViewModel, callback) {
	var myStartDate = new Date(new Date() - (SHOW_CONNECTED_USERS_FOR * MS_PER_MINUTE));
  	User.find({ joined: {$gte: myStartDate, $lt: new Date()}}, function (err, users) {
      homeViewModel.Users = users || [];
    callback(homeViewModel);
  });
};

function findAllChatMessages(homeViewModel, callback) {
    ChatMessage.find({}, function (err, chatMessages) {
      console.log("chat messages", chatMessages);
      homeViewModel.ChatMessages = chatMessages || []; 
      callback(homeViewModel);
  });
};

module.exports = 
{
    index : function index(req, res){
    	findAllUsers(new homeViewModel(), function(homeViewModel){
        findAllChatMessages(homeViewModel, function(homeViewModel){
          res.render("index", { 
            users : homeViewModel.Users,
            chatMessages : homeViewModel.ChatMessages
          });
        })
     	})
    },
    User : User,
    ChatMessage: ChatMessage
}

