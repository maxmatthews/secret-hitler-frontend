import React, { Component } from "react";
import autoBind from "react-autobind";
import { observer } from "mobx-react";
import globalStore from "./GlobalStore";

export default observer(
	class NominateChancellor extends Component {
		constructor(props) {
			super(props);
			autoBind(this);

			this.state = {};
		}

		nominate(index) {
			globalStore.socket.emit("nominateChancellor", {
				index,
				roomCode: globalStore.roomCode
			});
		}

		render() {
			return (
				<div>
					<h1>Select your chancellor:</h1>
					<ul>
						{globalStore.players.map((player, index) => {
							if (player.socketID !== globalStore.socket.id) {
								return (
									<li
										key={player.socketID}
										onClick={evt => {
											evt.preventDefault();
											this.nominate(index);
										}}
										style={{
											color: "blue",
											cursor: "hand",
											textDecoration: "underline"
										}}
									>
										{player.name}
									</li>
								);
							} else {
								return <li>{player.name}</li>;
							}
						})}
					</ul>
				</div>
			);
		}
	}
);
