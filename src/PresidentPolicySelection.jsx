import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import { Redirect } from "react-router";

export default class PresidentPolicySelection extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = { redirect: null };
	}

	presidentVote(policy) {
		globalStore.socket.emit("presidentPolicySelection", {
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
							this.presidentVote("fascist");
						}}
					>
						Fascist
					</li>
					<li
						onClick={() => {
							this.presidentVote("fascist");
						}}
					>
						Fascist
					</li>
					<li
						onClick={() => {
							this.presidentVote("liberal");
						}}
					>
						Liberal
					</li>
				</ul>
			</div>
		);
	}
}
