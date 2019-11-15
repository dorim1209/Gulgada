import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import TypePhone from './TypePhone';
import Index from './index';

export default class App extends React.Component {
	state = {
		isLoggedIn: '',
		isSignedUp: false,
		id: '',
		pw: '',
	};

	componentDidMount = () => {
		AsyncStorage.getItem('pnum').then(result => {
			this.setState({ isLoggedIn: result })
		}).catch(e => {
			alert(e)
		})
	};
	render() {
		return (
			<View style={styles.container}>
				{this.state.isLoggedIn == null ? <TypePhone /> : <Index />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
