var mongoose = require('mongoose'),
	SHOW_CONNECTED_USERS_FOR = 30,
	MS_PER_MINUTE = 60000,
	User = new mongoose.Schema({
    	name : String,
    	joined : Date
	});

mongoose.model('User', User);
var User = mongoose.model('User');

module.exports = {
	UserEntity: User,
	findAllUsers : function findAllUsers(viewModel, callback) {
		var myStartDate = new Date(new Date() - (SHOW_CONNECTED_USERS_FOR * MS_PER_MINUTE));
  		User.find({ joined: {$gte: myStartDate, $lt: new Date()}}, function (err, users) {
      		viewModel.Users = users || [];
    		callback(viewModel);
  		});
	}
}