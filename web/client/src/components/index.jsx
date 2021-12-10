import React, { Component } from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
const SERVER = "http://localhost:9000/index"
let count = 0
function Index() {
    let socket = io(SERVER, {
        autoConnect: false,
        transports:["websocket"],
        auth:{token:'client'},
        upgrade: false
    });
    count++
    socket.connect()
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
            <button onClick={callAPI}>button</button>
        </div>
    );
}

export default Index