import React, { Component } from "react";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import openSocket from "socket.io-client";

export default observer(
	class StartGame extends Component {
		constructor(props) {
			super(props);

			this.gotItCount = 0;
			this.voteCount = 0;

			this.state = {};

			if (!globalStore.roomCode) {
				globalStore.roomCode = this.makeid();
			}
		}

		shuffle(a) {
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		}

		randomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		componentDidMount() {
			if (!globalStore.socket) {
				globalStore.socket = openSocket("http://localhost:3000");
			}

			globalStore.socket.on("connect", () => {
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

				globalStore.socket.on("setPlayerOrderOnHost", data => {
					let roles = [];
					if (data.players.length === 5) {
						roles = ["liberal", "liberal", "liberal", "fascist", "hitler"];
					} else if (data.players.length === 6) {
						roles = [
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"fascist",
							"hitler"
						];
					} else if (data.players.length === 7) {
						roles = [
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"fascist",
							"fascist",
							"hitler"
						];
					} else if (data.players.length === 8) {
						roles = [
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"fascist",
							"fascist",
							"hitler"
						];
					} else if (data.players.length === 9) {
						roles = [
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"fascist",
							"fascist",
							"fascist",
							"hitler"
						];
					} else if (data.players.length === 10) {
						roles = [
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"liberal",
							"fascist",
							"fascist",
							"fascist",
							"hitler"
						];
					}

					roles = this.shuffle(roles);
					let index = 0;
					for (const player of data.players) {
						player.role = roles[index];
						index++;
					}

					data.players[
						this.randomInt(0, data.players.length - 1)
					].president = true;

					globalStore.players = data.players;

					globalStore.socket.emit("hostState", {
						players: globalStore.players,
						roomCode: globalStore.roomCode,
						goToPartyReveal: true
					});
				});

				globalStore.socket.on("partyAcknowledge", data => {
					this.gotItCount++;

					if (this.gotItCount === globalStore.players.length) {
						globalStore.socket.emit("everyoneKnowsTheirParty", {
							roomCode: globalStore.roomCode
						});
					}
				});

				globalStore.socket.on("nominateChancellor", data => {
					globalStore.votes = [];
					globalStore.nominatedChancellor = data.index;
					globalStore.nominatedPresident = globalStore.players.findIndex(
						player => {
							return player.president;
						}
					);

					globalStore.socket.emit("hostState", {
						players: globalStore.players,
						roomCode: globalStore.roomCode,
						nominatedChancellor: globalStore.nominatedChancellor,
						nominatedPresident: globalStore.nominatedPresident,
						goToVote: true
					});
				});

				globalStore.socket.on("vote", data => {
					this.voteCount++;

					globalStore.votes = [
						...globalStore.votes,
						{ socketID: data.socketID, position: data.position }
					];

					if (globalStore.votes.length === globalStore.players.length) {
						let yesCount = 0,
							noCount = 0;
						for (const vote of globalStore.votes) {
							if (vote.position) {
								yesCount++;
							} else {
								noCount++;
							}
						}

						if (noCount >= yesCount) {
						} else {
							globalStore.players[
								globalStore.nominatedPresident
							].president = true;
							globalStore.players[
								globalStore.nominatedChancellor
							].chancellor = true;
						}

						globalStore.socket.emit("hostState", {
							players: globalStore.players,
							roomCode: globalStore.roomCode,
							votes: globalStore.votes,
							goToVoteResults: true
						});
						// delete globalStore.nominatedChancellor;
						// delete globalStore.nominatedPresident;
					}
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
