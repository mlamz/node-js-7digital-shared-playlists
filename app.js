var express = require('express'),
    homeController = require('./controllers/homeController')
    nowjs = require('now');

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
    homeController.index(request, response);
});


everyone.now.distributeMessage = function(str){
  everyone.now.receiveMessage(str,this.now.name);
}

app.listen(process.env.PORT);