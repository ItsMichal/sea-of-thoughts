//Woo!!!
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);

//Bottle Thing
class Bottle{
    constructor(message){
      this.empty = false;
      this.message = message;
      this.timestamp = new Date();
      this.senders = user_config.name;
    }

  }


//Default Route thoughtssea.com
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/content/static/html/index.html'));
});

//Content Route
app.use(express.static('content/static'));

//Message array- to be replaced by Database


function randomBottle(){

}

let usersConnected = 0;

//Connection event (to listen for incoming sockets and log onto console after)
io.on('connection', (socket) => {

    usersConnected++;
    //console.log('a user connected');
    io.emit('users', "There are " + usersConnected + " thinkers at the Sea of Thoughts.");

    //TODO- Send them 3 different bottles if array is larger than 3

    socket.on('disconnect', ()=> {
        console.log('user disconnected');
        io.emit('users', "There are " + usersConnected + " thinkers at the Sea of Thoughts.");
        usersConnected--;
    });


    //When someone sends a Bottle
    socket.on('outgoingBottle', (bottle) =>{
        console.log('Bottle: ' + bottle.senders + " - " + bottle.message);
        socket.broadcast.emit('incomingBottle', bottle);
    });

});





//Listener
http.listen(process.env.PORT, () => {
    console.log('listening on *:80');
});


