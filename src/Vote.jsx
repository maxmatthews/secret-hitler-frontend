import React, { Component } from "react";
import autoBind from "react-autobind";
import globalStore from "./GlobalStore";
import { observer } from "mobx-react";

export default observer(
	class Vote extends Component {
		constructor(props) {
			super(props);
			autoBind(this);

			this.state = {};
		}

		vote(position) {
			globalStore.socket.emit("vote", { position });
			this.props.history.push("/waiting");
		}

		render() {
			return (
				<div>
					<h3>
						President:{" "}
						{globalStore.players[globalStore.nominatedPresident].name}
					</h3>
					<h3>
						Chancellor:
						{globalStore.players[globalStore.nominatedChancellor].name}
					</h3>
					<div
						onClick={() => {
							this.vote("yes");
						}}
						style={{
							color: "blue",
							cursor: "hand",
							textDecoration: "underline"
						}}
					>
						ja! (yes)
					</div>
					<div
						onClick={() => {
							this.vote("no");
						}}
						style={{
							color: "blue",
							cursor: "hand",
							textDecoration: "underline"
						}}
					>
						nein! (no)
					</div>
				</div>
			);
		}
	}
);
