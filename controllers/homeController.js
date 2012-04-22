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
	SHOW_CONNECTED_USERS_FOR = 30;

mongoose.model('User', User);
var User = mongoose.model('User');

mongoose.model('ChatMessage', ChatMessage);
var ChatMessage = mongoose.model('ChatMessage');





function findAllUsers(callback) {
	var myStartDate = new Date(new Date() - (SHOW_CONNECTED_USERS_FOR * MS_PER_MINUTE));
  	User.find({ joined: {$gte: myStartDate, $lt: new Date()}}, function (err, users) {
    callback(users || []);
  });
};

module.exports = 
{
    index : function index(req, res){
    	findAllUsers(function(users){
    		res.render("index", { users : users });
     	});
    },
    User : User
}