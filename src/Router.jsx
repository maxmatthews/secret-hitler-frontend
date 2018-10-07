import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import App from "./App";
import StartGame from "./StartGame";
import globalStore from "./GlobalStore";
import openSocket from "socket.io-client";
import WaitingRoom from "./WaitingRoom";
import SetOrder from "./SetOrder";
import ChancellorPolicySelection from "./ChancellorPolicySelection";
import Board from "./Board";
import NominateChancellor from "./NominateChancellor";
import PartyReveal from "./PartyReveal";
import PresidentPolicySelection from "./PresidentPolicySelection";
import Vote from "./Vote";
import VotingResults from "./VotingResults";
import Waiting from "./Waiting";
import autoBind from "react-autobind";

export default class Router extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = { redirect: null };
	}

	componentDidMount() {
		if (!globalStore.socket) {
			globalStore.socket = openSocket("http://localhost:3000");
			globalStore.socket.on("connect", () => {});
		}

		globalStore.socket.on("updateGameState", data => {
			if ("goToPartyReveal" in data) {
				this.setState({ redirect: "/partyReveal" });
			}

			globalStore.players = data.players;

			if ("goToVote" in data) {
				globalStore.nominatedChancellor = data.nominatedChancellor;
				globalStore.nominatedPresident = data.nominatedPresident;

				console.log(data);
				this.setState({ redirect: "/vote" });
			}

			if ("goToVoteResults" in data) {
				globalStore.votingResults = data.votes;
				this.setState({ redirect: "/voteResults" });
			}
		});

		globalStore.socket.on("everyoneKnowsTheirParty", () => {
			const myPlayer = globalStore.players.find(player => {
				return player.socketID === globalStore.socket.id;
			});

			if (myPlayer.president) {
				this.setState({ redirect: "/nominateChancellor" });
			} else {
				this.setState({ redirect: "/waiting" });
			}
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/start" component={StartGame} />
						<Route path="/waitingRoom" component={WaitingRoom} />
						<Route path="/setOrder" component={SetOrder} />
						<Route path="/board" component={Board} />
						<Route
							path="/chancellorPolicySelection"
							component={ChancellorPolicySelection}
						/>
						<Route path="/nominateChancellor" component={NominateChancellor} />
						<Route path="/partyReveal" component={PartyReveal} />
						<Route
							path="/presidentPolicySelection"
							component={PresidentPolicySelection}
						/>
						<Route path="/vote" component={Vote} />
						<Route path="/votingResults" component={VotingResults} />
						<Route path="/waiting" component={Waiting} />
						<Route path="/" exact component={App} />
					</Switch>
					{this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
				</div>
			</BrowserRouter>
		);
	}
}
