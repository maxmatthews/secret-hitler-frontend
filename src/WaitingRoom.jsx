import React, { Component } from "react";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";

export default observer(
	class WaitingRoom extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		render() {
			return (
				<div>
					<h1>Waiting Room</h1>
					<ul>
						{globalStore.players.map(player => {
							return <li key={player.socketID}>{player.name}</li>;
						})}
					</ul>
					{globalStore.players.length >= 5 ? (
						<button
							className="btn btn-primary"
							onClick={()=>{globalStore.socket.emit("startGame", {
								roomCode: globalStore.roomCode
							}); this.props.history.push("/setOrder")}}
						>
							Start Game
						</button>
					) : (
						<p>Waiting for more players</p>
					)}
				</div>
			);
		}
	}
);
