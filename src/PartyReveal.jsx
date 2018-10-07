import React, { Component } from "react";
import autoBind from "react-autobind";
import { observer } from "mobx-react";
import globalStore from "./GlobalStore";

export default observer(
	class PartyReveal extends Component {
		constructor(props) {
			super(props);
			autoBind(this);

			this.state = { partyAcknowledged: false };
		}

		render() {
			const myPlayer = globalStore.players.find(player => {
				return player.socketID === globalStore.socket.id;
			});
			return (
				<div>
					{myPlayer.role === "liberal" ? <h1>You're a liberal!</h1> : null}
					{myPlayer.role === "fascist" ? (
						<div>
							<h1>You're a fascist! You're fellow fascists are:</h1>
							<ul>
								{globalStore.players.map(player => {
									if (player.role === "fascist" || player.role === "hitler") {
										return (
											<li>
												{player.name} ({player.role})
											</li>
										);
									} else {
										return null;
									}
								})}
							</ul>
						</div>
					) : null}
					{myPlayer.role === "hitler" ? (
						globalStore.players.length <= 6 ? (
							<div>
								<h1>You're Hitler! You're fellow fascists are:</h1>
								<ul>
									{globalStore.players.map(player => {
										if (player.role === "fascist") {
											return (
												<li>
													{player.name}
												</li>
											);
										} else {
											return null;
										}
									})}
								</ul>
							</div>
						) : (
							<div>
								<h1>You're Hitler!</h1>
							</div>
						)
					) : null}
					<button
						className="btn btn-primary"
						onClick={() => {
							this.setState({ partyAcknowledged: true });
							globalStore.socket.emit("partyAcknowledge", {
								roomCode: globalStore.roomCode,
								playerIndex: globalStore.players.findIndex(player => {
									return player.socketID === globalStore.socket.id;
								})
							});
						}}
						disabled={this.state.partyAcknowledged}
					>
						{this.state.partyAcknowledged
							? "Waiting on other players..."
							: "Got it!"}
					</button>
				</div>
			);
		}
	}
);
