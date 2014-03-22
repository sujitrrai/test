
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , id = require('./routes/id')
  , alerts = require('./data/alerts')
  , latlon = require('./data/latlon')
 // , io = require('socket.io')
 ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options',{layout:false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/', id.id);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
/*
io.listen(app).on('connection',function(socket){
  console.log('got connection');
  socket.on('clientMessage',function(data){
    console.log(data);
    socket.emit('serverMessage','you said '+data);
    socket.broadcast.emit('serverMessage','he said ' +data);
    });
  
  });
*/