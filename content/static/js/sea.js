const socket = io(); // you don't actually need the url for now, it works magically -Michal 

let sender = ""; // allows people to enter name



/*
* ok guys so 'outgoingBottle and incomingBottle are both gonna have
Bottles as their payload. but these are just the socket.io names like
*/


//Send bottle to server
socket.emit('outgoingBottle', bottleHere); 

//Receive bottle from server
socket.on('incomingBottle', (bottle) => {
    //do something with the bottle

});


let bottle = {
    "empty": false,
    "message": message,
    "timestamp":  new Date(),
    "senders": ["jamie"]
}

function makeBottle() {
    //"Enter a message to be sent:",
    //document.getElementById("message").value; //the text inside message if message was a text field
    //document.getElementById("canvas").asdjhasdkj.asdkjashdkjas = message text

}

function requestBottle() {
    // request a bottle from the server
    
}

let bottleHere = {
    "bottle": bottle,
    // other stuff to send out??
}

// let messageSent = {
//     "writeMsg": "Enter a message to be sent:", 
//     "outgoingMessage": outgoingBottle,
//     socket.emit('outgoingBottle', bottleHere);
// }

let incomingBottle = {
    "messageInBottle": messageRecieved
    
}

let messageReceived = {
    "foundMsg": "You've found a message! Would you like to open it?",
    
    "showMessage": incomingBottle.messageReceived,
    
}



//JSON uses colon not equals