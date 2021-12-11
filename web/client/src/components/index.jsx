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
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
            </style>
            <body>
                <header className="">
                    <nav className="nav">
                        <div className="nav-wrap" id="nav-wrap">
                            <div className="main_link">
                                <a href="/index">AIM Group 4</a>
                            </div>
                            <div className="nav_options">
                                <div className="nav_options_item">
                                    <a className="nav_selected" href="/index">Dashboard</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 1</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 2</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 3</a>
                                </div>
                            </div>
                            <div className="nav_profile">
                                <a href="#">Profile</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="body_main">
                    <p className="App-intro">{state1}</p>
                    <button onClick={sockEmit}>emit</button>
                </div>
            </body>
        </div>
    );


}

export default Index