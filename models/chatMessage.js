var mongoose = require('mongoose'), 
	ChatMessage = new mongoose.Schema({
		name: String,
		message: String,
		createdAt: Date
	});

mongoose.model('ChatMessage', ChatMessage);
var ChatMessage = mongoose.model('ChatMessage');

module.exports = {
	ChatMessageEntity: ChatMessage,
	findAllChatMessages : function findAllChatMessages(viewModel, callback) {
    	ChatMessage.find(
      		{},
      		['name','message'], 
      		{
      			skip: 0,
	          	limit:10,
	          	sort:{  createdAt: -1 }
	      	},
      function (err, chatMessages) {
        console.log("error if exists", err);
        console.log("chat messages", chatMessages);
        viewModel.ChatMessages = chatMessages || []; 
        callback(viewModel);
      });
	}
}