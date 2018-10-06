import React, { Component } from "react";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";

export default observer(
	class App extends Component {
		constructor(props) {
			super(props);

			this.joinRoom = this.joinRoom.bind(this);
		}
		componentDidMount() {
			//
			// 	setTimeout(() => {
			// 		socket.emit("message", "what is going on, party people?");
			// 		console.log("emit");
			// 	}, 5000);
			//
			// 	socket.on("message", function(data) {
			// 		console.log("Incoming message:", data);
			// 	});
		}

		joinRoom(evt) {
			evt.preventDefault();

			globalStore.socket.emit("newPlayer", {
				roomCode: globalStore.roomCode,
				name: globalStore.playerName
			});

			this.props.history.push("/waitingRoom");
		}

		render() {
			return (
				<div className="container">
					<form onSubmit={this.joinRoom}>
						<p>Enter Room Code:</p>
						<input
							type="text"
							className="form-control"
							value={globalStore.roomCode}
							onChange={evt => {
								globalStore.roomCode = evt.target.value;
							}}
						/>
						<input
							type="text"
							className="form-control"
							value={globalStore.playerName}
							onChange={evt => {
								globalStore.playerName = evt.target.value;
							}}
						/>
						<button type="submit" className="btn btn-primary">
							Join
						</button>
					</form>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.props.history.push("/start");
						}}
					>
						Start Game
					</button>
				</div>
			);
		}
	}
);
