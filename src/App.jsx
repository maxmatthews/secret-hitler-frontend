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
					<div
						style={{
							display: "grid",
							gridGap: "0",
							backgroundColor: "#373634",
							gridRowGap: "1em",
							gridTemplateColumns: "1fr 1fr 1fr 1fr"
						}}
					>
						<form
							onSubmit={this.joinRoom}
							style={{
								gridColumn: "1/4",
								gridRow: "2/3",
								backgroundColor: "#F7E3C1",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr 1fr",
								gridTemplateRows: "1fr 1fr 1fr 5em",
								gridGap: "1em"
							}}
						>
							<p
								style={{
									color: "#373634",
									fontSize: "1em",
									gridColumn: "2/5",
									gridRow: "1/2",
									textTransform: "uppercase",
									alignSelf: "flex-end",
									backgroundColor: "#F7E3C1",
									paddingTop: "1em"
								}}
							>
								Enter Room Code:
							</p>
							<input
								style={{
									fontWeight: "bold",
									gridColumn: "2/4",
									gridRow: "2/3"
								}}
								type="text"
								className="form-control"
								value={globalStore.roomCode}
								onChange={evt => {
									globalStore.roomCode = evt.target.value;
								}}
							/>
							<input
								style={{
									// backgroundColor: "#F7E3C1",
									fontWeight: "bold",
									gridColumn: "2/4",
									gridRow: "3/4"
								}}
								type="text"
								className="form-control"
								value={globalStore.playerName}
								onChange={evt => {
									globalStore.playerName = evt.target.value;
								}}
							/>
							<button
								type="submit"
								className="btn btn-primary"
								style={{
									color: "#fff",
									backgroundColor: "#373634",
									borderColor: "transparent",
									boxShadow: "2px 2px 2px #373634",
									alignSelf: "baseline",
									fontWeight: "bold",
									gridColumn: "3/4",
									gridRow: "4/5",
									alignSelf: "start"
								}}
							>
								Join
							</button>
						</form>
						<button
							style={{
								color: "#fff",
								backgroundColor: "#E46249",
								borderColor: "transparent",
								boxShadow: "2px 2px 2px #373634",
								justifySelf: "center",
								textTransform: "uppercase",
								fontWeight: "bold",
								textShadow: "2px 2px 2px #373634",
								gridColumn: "4/5",
								gridRow: "2/3",
								alignSelf: "center"
							}}
							className="btn btn-primary"
							onClick={() => {
								this.props.history.push("/start");
							}}
						>
							Start Game
						</button>
						<img
							src="shlogo.png"
							alt="logo"
							style={{
								width: "100%",
								// height: "100%",
								gridColumn: "1/5"
							}}
						/>
					</div>
				</div>
			);
		}
	}
);
