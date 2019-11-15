import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class WorkHistory extends React.Component {
	render() {
		return (
			<ScrollView alwaysBounceVertical="true">
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>업무 기록</Text>
					</View>
					<View style={styles.subtitleContainer}>
						<Text style={styles.nameText}>윤영욱</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: 'orange',
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		marginTop: 50,
		borderColor: '#000000',
		borderWidth: 1,
	},
	titleText: {
		fontSize: 40,
		fontWeight: 'bold',
		marginLeft: 10,
		justifyContent: 'center',
	},
	subtitleContainer: {
		flex: 1,
		alignItems: 'center',
		marginTop: 50,
		borderColor: '#000000',
		borderWidth: 1,
	},
	nameText: {
		fontSize: 30,
		marginLeft: 10,
	},
});
