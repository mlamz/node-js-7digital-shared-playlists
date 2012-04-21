var express = require('express'),
    homeController = require('./controllers/homeController'),
    trackSearchController = require('./controllers/trackSearchController')
    nowjs = require('now'),
    port = process.env.PORT || 3000;

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
    console.log("home");
    homeController.index(request, response);
});

app.post('/trackSearch', function(request, response){
    trackSearchController.index(request, response);
});


everyone.now.distributeMessage = function(str){
    console.log("distributing message");
    everyone.now.receiveMessage(this.now.name,str);
}

everyone.now.distributeNewPlaylistTrack = function(str){
    console.log("distributing track to shared playlist");
    everyone.now.receiveNewPlaylistTrack(this.now.name,str);
}
everyone.now.distributeRemovalOfFinishedTrack = function(str){
    console.log("removing finished track from shared playlist");
    everyone.now.receiveRemovalOfPlaylistTrack(this.now.name,str);
}

app.listen(port);

console.log("app listening on port: "+port);