var express = require('express'),
    homeController = require('./controllers/homeController')
    nowjs = require('now'),
    port = 3000;

var app = express.createServer();

var everyone = nowjs.initialize(app);
app.configure(function(){
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
    console.log("loading home");
    homeController.index(request, response);
});


everyone.now.distributeMessage = function(str){
    console.log("distributing message");
    everyone.now.receiveMessage(this.now.name,str);
}

app.listen(port);

console.log("app listening on port: "+port);