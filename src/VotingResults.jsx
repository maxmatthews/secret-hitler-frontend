import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";
import { Redirect } from "react-router";

export default observer(
	class VotingResults extends Component {
		constructor(props) {
			super(props);
			autoBind(this);

			this.state = { partyAcknowledged: false, redirect: null };
		}

		componentDidMount() {
			globalStore.socket.on("everyoneKnowsVotingResults", data => {
				const myPlayer = globalStore.players.find(player => {
					return player.socketID === globalStore.socket.id;
				});

				if (myPlayer.president) {
					this.setState({ redirect: "/presidentPolicySelection" });
				} else {
					this.setState({ redirect: "/waiting" });
				}
			});
		}

		render() {
			return this.state.redirect ? (
				<Redirect to={this.state.redirect} />
			) : (
				<div>
					<ul>
						{globalStore.votes.map(vote => {
							return (
								<li key={vote.socketID}>
									{
										globalStore.players.find(player => {
											return player.socketID === vote.socketID;
										}).name
									}: {vote.position}
								</li>
							);
						})}
					</ul>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.setState({ partyAcknowledged: true });
							globalStore.socket.emit("acknowledgeVote", {
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
