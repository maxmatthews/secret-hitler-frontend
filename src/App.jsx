import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

class App extends Component {
	constructor(props) {
		super(props);

		this.room = "abc123";
	}
	componentDidMount() {
		socket.on("connect", function() {
			// Connected, let's sign-up for to receive messages for this room
			socket.emit("room", this.room);
		});

		setTimeout(() => {
			socket.emit("message", "what is going on, party people?");
			console.log("emit");
		}, 5000);

		socket.on("message", function(data) {
			console.log("Incoming message:", data);
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		);
	}
}

export default App;
