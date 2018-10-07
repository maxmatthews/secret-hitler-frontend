import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import { Redirect } from "react-router";

export default class ChancellorPolicySelection extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {};
	}

	chancellorVote() {
		globalStore.socket.emit("chancellorPolicySelection", {
			roomCode: globalStore.roomCode
		});
		this.setState({ redirect: "/waiting" });
	}

	render() {
		return this.state.redirect ? (
			<Redirect to={this.state.redirect} />
		) : (
			<div>
				<ul>
					<li
						onClick={() => {
							this.chancellorVote();
						}}
					>
						Fascist
					</li>
					<li
						onClick={() => {
							this.chancellorVote();
						}}
					>
						Liberal
					</li>
				</ul>
			</div>
		);
	}
}
