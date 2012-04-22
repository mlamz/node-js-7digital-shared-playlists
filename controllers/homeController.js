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
  PlaylistTrack = new mongoose.Schema({
    trackId: Number,
    trackName: String,
    artistName: String,
    addedBy : String,
    image: String 
  }),
	MS_PER_MINUTE = 60000,
	SHOW_CONNECTED_USERS_FOR = 30,
  homeViewModel;

mongoose.model('User', User);
var User = mongoose.model('User');

mongoose.model('ChatMessage', ChatMessage);
var ChatMessage = mongoose.model('ChatMessage');

mongoose.model('PlaylistTrack', PlaylistTrack);
var PlaylistTrack = mongoose.model('PlaylistTrack');

homeViewModel = function(){
  this.Users = [],
  this.ChatMessages = [],
  this.PlaylistTracks = []
}

function findAllPlaylistTracks(homeViewModel, callback) {
  PlaylistTrack.find({}, function (err, playlistTracks) {
    homeViewModel.PlaylistTracks = playlistTracks || [];
    callback(homeViewModel);
  })
}

function findAllUsers(homeViewModel, callback) {
	var myStartDate = new Date(new Date() - (SHOW_CONNECTED_USERS_FOR * MS_PER_MINUTE));
  	User.find({ joined: {$gte: myStartDate, $lt: new Date()}}, function (err, users) {
      homeViewModel.Users = users || [];
    callback(homeViewModel);
  });
};

function findAllChatMessages(homeViewModel, callback) {
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
        homeViewModel.ChatMessages = chatMessages || []; 
        callback(homeViewModel);
      }
    );
};

module.exports = 
{
    index : function index(req, res){
    	findAllUsers(new homeViewModel(), function(homeViewModel){
        findAllChatMessages(homeViewModel, function(homeViewModel){
          findAllPlaylistTracks(homeViewModel, function(homeViewModel){
            res.render("index", { 
            users : homeViewModel.Users,
            chatMessages : homeViewModel.ChatMessages,
            playlistTracks : homeViewModel.PlaylistTracks
            });
          })
        })
     	})
    },
    User : User,
    ChatMessage: ChatMessage,
    PlaylistTrack: PlaylistTrack
}

