import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Waiting extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {};
	}

	render() {
		return (
			<div>
				<h1>Waiting on other players</h1>
			</div>
		);
	}
}
