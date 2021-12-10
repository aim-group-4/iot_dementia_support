const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
let sequenceNumberByClient = new Map();

// event fired every time a new client connects:
io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    console.log(socket.handshake.auth)
    let role = socket.handshake.auth.token
    // for client (PC, mobile) devices
    if(role == 'client'){
        // initialize this client's sequence number
        sequenceNumberByClient.set(socket, 1);
        console.log(sequenceNumberByClient.size)
        // when socket disconnects, remove it from the list:
        socket.on("disconnect", () => {
            sequenceNumberByClient.delete(socket);
            /*
            socket.removeAllListeners('send message');
            socket.removeAllListeners('disconnect');
            socket.removeAllListeners('connection');

             */
            console.info(`Client gone [id=${socket.id}]`);
        });

        socket.on('alert', ()=> {
            console.log("server alerted")
            socket.broadcast.emit("alert", 'hello')
        })
    }
    //for arduino boards
    else if(role == 'device'){

    }
    else{

    }

});

io.on('reconnect', ()=>{
    console.log("reconnect")
})


io.on("message", (socket) => {

})

io.on("alert", (socket) => {
    console.log("alert on server")
    socket.broadcast.emit("alert", "alerted")
})

io.on("error", socket => {
    console.log("error")
})

// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 1000);


/*
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
});
// end of socket.io logic

 */

module.exports = socketapi;