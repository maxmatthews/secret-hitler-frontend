import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import { Redirect } from "react-router";

export default class Waiting extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = { redirect: null };
	}

	componentDidMount() {
		const myPlayer = globalStore.players.find(player => {
			return player.socketID === globalStore.socket.id;
		});
		globalStore.socket.on("presidentPolicySelection", data => {
			if (myPlayer.chancellor) {
				this.setState({ redirect: "/chancellorPolicySelection" });
			}
		});
	}

	render() {
		return this.state.redirect ? (
			<Redirect to={this.state.redirect} />
		) : (
			<div>
				<h1>Waiting on other players</h1>
			</div>
		);
	}
}
