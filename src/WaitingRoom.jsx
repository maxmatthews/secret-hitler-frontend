import React, { Component } from "react";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";

export default observer(
	class WaitingRoom extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		render() {
			return (
				<div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							background: "#F7E3C1",
							textTransform: "uppercase"
						}}
					>
						<h1>Waiting Room</h1>
						<ul>
							{globalStore.players.map(player => {
								return <li key={player.socketID}>{player.name}</li>;
							})}
						</ul>
						{globalStore.players.length >= 5 ? (
							<button
								className="btn btn-primary"
								onClick={() => {
									this.props.history.push("/setOrder");
								}}
							>
								Start Game
							</button>
						) : (
							<p>Waiting for more players</p>
						)}
					</div>
				</div>
			);
		}
	}
);
