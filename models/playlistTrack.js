var mongoose = require('mongoose'), 
  PlaylistTrack = new mongoose.Schema({
    trackId: Number,
    trackName: String,
    artistName: String,
    addedBy : String,
    image: String 
  });

mongoose.model('PlaylistTrack', PlaylistTrack);
var PlaylistTrack = mongoose.model('PlaylistTrack');

module.exports = {
	PlaylistTrackEntity: PlaylistTrack,
	findAllPlaylistTracks : function findAllUsers(viewModel, callback) {
		PlaylistTrack.find({}, function (err, playlistTracks) {
    	viewModel.PlaylistTracks = playlistTracks || [];
    	callback(viewModel);
  		});
	}
}