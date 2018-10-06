import React, { Component } from "react";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import openSocket from "socket.io-client";

export default observer(
	class StartGame extends Component {
		constructor(props) {
			super(props);

			this.state = {};

			if (!globalStore.roomCode) {
				globalStore.roomCode = this.makeid();
			}
		}

		componentDidMount() {
			if (!globalStore.socket) {
				globalStore.socket = openSocket("http://localhost:3000");
			}

			globalStore.socket.on("connect", function() {
				globalStore.socket.emit("newHost", {
					roomCode: globalStore.roomCode
				});

				globalStore.socket.on("tellHostNewPlayer", function(data) {
					globalStore.players = [...globalStore.players, data];

					globalStore.socket.emit("hostState", {
						players: globalStore.players,
						roomCode: globalStore.roomCode
					});
				});

				globalStore.socket.on("gameStarted", function(data) {
					globalStore.gameStarted = true;

					globalStore.socket.emit("hostState", {
						players: globalStore.players,
						roomCode: globalStore.roomCode,
						gameStarted: globalStore.gameStarted
					});
				});

				globalStore.socket.on("setPlayerOrderOnHost", data => {
					globalStore.players = data.players;

					console.log(data.players);
				});
			});
		}

		makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

			for (var i = 0; i < 4; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}

		render() {
			console.log(toJS(globalStore.players));
			return (
				<div>
					<h1>Room Code:</h1>
					<h2>{globalStore.roomCode}</h2>

					<h3>Connected players: {globalStore.players.length}</h3>
					<ul>
						{globalStore.players.map(user => {
							return <li key={user.socketID}>{user.name}</li>;
						})}
					</ul>
				</div>
			);
		}
	}
);
