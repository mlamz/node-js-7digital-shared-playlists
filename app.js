var express = require('express'),
    homeController = require('./controllers/homeController'),
    trackSearchController = require('./controllers/trackSearchController'),
    nowjs = require('now'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./models/user').UserEntity,
    ChatMessage = require('./models/chatMessage').ChatMessageEntity,
    PlaylistTrack = require('./models/playlistTrack').PlaylistTrackEntity;

mongoose.connect('mongodb://'+process.env.MONGOLABS_USER+':'+process.env.MONGOLABS_PASSWORD+'@ds031947.mongolab.com:31947/shared-playlists');

var app = express.createServer();

var everyone = nowjs.initialize(app);
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(request, response){
    homeController.index(request, response);
});

app.post('/trackSearch', function(request, response){
    trackSearchController.index(request, response);
});

everyone.now.distributeMessage = function(str){
    console.log("distributing message");
    var chatMessage = new ChatMessage({ name: this.now.name, message: str, createdAt: new Date() });
    chatMessage.save(function(err) { console.log(err); });
    everyone.now.receiveMessage(this.now.name,str);
}

everyone.now.distributeNewPlaylistTrack = function(playlistTrackDto){
    console.log("distributing track to shared playlist");
    var playlistTrack = new PlaylistTrack({
        trackId: playlistTrackDto.trackId,
        trackName: playlistTrackDto.trackName,
        artistName: playlistTrackDto.artistName,
        addedBy : playlistTrackDto.addedBy,
        image: playlistTrackDto.image 
    });
    playlistTrack.save(function(err){ console.log(err); });
    everyone.now.receiveNewPlaylistTrack(this.now.name,playlistTrackDto);
}
everyone.now.distributeRemovalOfFinishedTrack = function(trackId){
    console.log("removing finished track from shared playlist");

    var playlistTrack = PlaylistTrack.findOne({ trackId : trackId }, function (err, track) {
        console.log("track removed from mongo: ", playlistTrack);
        playlistTrack.remove();
    });

    everyone.now.receiveRemovalOfPlaylistTrack(this.now.name,trackId);
}

everyone.now.distributeNewUser = function(str){
    console.log("distributing new user", str);
    var user = new User({name: str, joined: new Date()});
    user.save(function(err) { console.log(err); });
    everyone.now.receiveNewUser(str);
}

everyone.disconnected(function(){
    everyone.now.receiveUserLeftMessage(this.now.name);
    var user = User.findOne({ name : this.now.name }, function (err, user) {
        console.log("users found in mongo: ", user);
        user.remove();
    });
    
    console.log(this.now.name + " has left.");
});

everyone.connected(function(){
  //  everyone.now.receiveUserJoinedMessage(this.now.name);
    console.log(this.now.name + " has joined.");
});


app.listen(port);

console.log("app listening on port: "+port);