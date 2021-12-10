import React, {Component, useEffect} from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
const SERVER = "http://localhost:9000/"
let count = 0
function Index() {
    let socket
    let sock
    useEffect(() => {
        socket = io(SERVER, {
            autoConnect: false,
            reconnection: false,
            transports:["websocket"],
            auth:{token:'client'},
            upgrade: false
        });
        sock = socket.connect()
        sock.on('message', (data) => {
            console.log("message")
        })
        sock.on('alert', data => {
            console.log('alertted!')
        })
    })

    function sockEmit(){
        console.log("sockEmit function called")
        console.log(sock)
        if(sock){
            console.log("emitting...")
            sock.emit('alert', 'message')
        }
    }

    const [state1, setState1]= React.useState("Nothing yet")
    function callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setState1(res))
            .catch(err => err)
    }

    return (
        <div className="App">
            <header>
            </header>
            <p className="App-intro">{state1}</p>
            <button onClick={sockEmit}>emit</button>
        </div>
    );
}

export default Index