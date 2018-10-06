import React, {Component} from 'react';
import autoBind from 'react-autobind';

export default class Board extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {};
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}