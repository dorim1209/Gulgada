import * as React from 'react';
import * as RN from 'react-native';

class MyCalendar extends React.Component {
	state = {
		activeDate: new Date(),
	};

	generateMatrix() {
		var matrix = [];
		// Create header
		matrix[0] = this.weekDays;

		// More code here
	}

	render() {
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var year = this.state.activeDate.getFullYear();
		var month = this.state.activeDate.getMonth();
		var firstDay = new Date(year, month, 1).getDay();

		return <RN.View></RN.View>;
	}
}
