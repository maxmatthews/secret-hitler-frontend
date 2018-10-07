import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import {observer} from "mobx-react"

export default observer(class VotingResults extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {};
	}

	render() {
		return (
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
			</div>
		);
	}
}
)