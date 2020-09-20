//Woo!!!
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);


//Default Route thoughtssea.com
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/content/static/html/index.html'));
});

//Content Route
app.use(express.static('content/static'));

//Message array- to be replaced by Database
let messageArray = [];


function randomBottle(){

}


//Connection event (to listen for incoming sockets and log onto console after)
io.on('connection', (socket) => {

    console.log('a user connected');

    //TODO- Send them 3 different bottles if array is larger than 3

    socket.on('disconnect', ()=> {
        console.log('user disconnected');
    });


    //When someone sends a Bottle
    socket.on('outgoingBottle', (bottle) =>{
        console.log('Bottle: ' + bottle);
        io.emit('incomingBottle', bottle);
    });

});





//Listener
http.listen(80, () => {
    console.log('listening on *:80');
});


