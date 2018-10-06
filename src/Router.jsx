import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
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

export default class Router extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		if (!globalStore.socket) {
			globalStore.socket = openSocket("http://localhost:3000");
			globalStore.socket.on("connect", () => {});
		}

		globalStore.socket.on("updateGameState", data => {
			globalStore.players = data.players;
		});
	}

	render() {
		return (
			<BrowserRouter>
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
					<Route path="/" exact component={App} />
				</Switch>
			</BrowserRouter>
		);
	}
}
