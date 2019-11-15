import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';

import GoToWork from './GoToWork';
import TypePhone from './../../TypePhone';

export default Main = () => {
	return (
		<View style={styles.container}>
			{!AsyncStorage.getItem('pnum') ? <GoToWork /> : <TypePhone />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
