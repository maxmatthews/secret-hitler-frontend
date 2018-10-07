import React, { Component } from "react";
import { observer } from "mobx-react";
import globalStore from "./GlobalStore";

export default observer(
	class SetOrder extends Component {
		constructor(props) {
			super(props);

			this.state = { playerOrder: [] };

			this.setOrder = this.setOrder.bind(this);
		}

		setOrder() {
			globalStore.socket.emit("playerOrder", {playerOrder: this.state.playerOrder, roomCode: globalStore.roomCode});
		}

		render() {
			return (
				<div>
					<p>Select the order of players by taping on their names in order</p>
					<table>
						<thead>
							<tr>
								<th>Order</th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{globalStore.players.map(player => {
								const playerIndex = this.state.playerOrder.findIndex(
									playerInOrder => {
										return playerInOrder.socketID === player.socketID;
									}
								);
								return (
									<tr
										key={player.socketID}
										onClick={() => {
											if (playerIndex !== -1) {
												let playerOrder = [...this.state.playerOrder];
												playerOrder.pop(playerIndex, 1);
												this.setState({ playerOrder });
											} else {
												this.setState({
													playerOrder: [...this.state.playerOrder, player]
												});
											}
										}}
									>
										<td>{playerIndex !== -1 ? playerIndex + 1 : null}</td>
										<td>{player.name}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{this.state.playerOrder.length === globalStore.players.length ? (
						<button onClick={this.setOrder} className="btn btn-primary">
							Continue
						</button>
					) : null}
				</div>
			);
		}
	}
);
