var mongoose = require('mongoose'), 
	User = require('../models/user'),
	ChatMessage = require('../models/chatMessage'),
  PlaylistTrack = require('../models/playlistTrack'),
  homeViewModel = function(){
    this.Users = [],
    this.ChatMessages = [],
    this.PlaylistTracks = []
  }

module.exports = 
{
    index : function index(req, res){
    	User.findAllUsers(new homeViewModel(), function(homeViewModel){
        ChatMessage.findAllChatMessages(homeViewModel, function(homeViewModel){
          PlaylistTrack.findAllPlaylistTracks(homeViewModel, function(homeViewModel){
            res.render("index", { 
            users : homeViewModel.Users,
            chatMessages : homeViewModel.ChatMessages,
            playlistTracks : homeViewModel.PlaylistTracks
            });
          })
        })
     	})
    }
}

