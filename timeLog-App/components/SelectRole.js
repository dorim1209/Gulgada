import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

export default class SelectRole extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>처음 오셨네요!</Text>
					<Text style={styles.title}>원하시는 것을 선택하세요.</Text>
				</View>
				<View style={styles.itemContainer}>
					<View style={styles.leftItem}>
						<TouchableOpacity
							onPress={() => {
								alert('근로자');
							}}
						>
							<FontAwesome
								name="pencil-square-o"
								size="80"
								color="orange"
							></FontAwesome>
							{/* <Text style={styles.itemText}>근로자</Text> */}
						</TouchableOpacity>
					</View>
					<View style={styles.rightItem}>
						<TouchableOpacity
							onPress={() => {
								alert('사업주');
							}}
						>
							<Foundation
								name="page-search"
								size="80"
								color="orange"
							></Foundation>
							{/* <Text style={styles.itemText}>사업주</Text> */}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 50,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 20,
	},
	titleContainer: {
		flex: 1,
		paddingLeft: 30,
		marginTop: 40,
		// borderWidth: 1,
		// borderColor: '#000000',
		justifyContent: 'center',
	},
	itemContainer: {
		flex: 3,
		flexDirection: 'row',
		// paddingVertical: 10,
		// paddingHorizontal: 10,
		// borderWidth: 1,
		// borderColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 100,
	},
	itemText: {
		fontSize: 15,
		alignItems: 'center',
	},
	leftItem: {
		flex: 1,
		// marginRight: 5,
		paddingLeft: 15,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		// borderWidth: 1,
		// borderColor: '#000000',
	},
	rightItem: {
		flex: 1,
		// marginLeft: 5,
		paddingRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		// borderWidth: 1,
		// borderColor: '#000000',
	},
	// topContainer: {
	// 	flex: 1,
	// 	justifyContent: 'center',
	// 	borderWidth: 1,
	// 	borderColor: '#000000',
	// },
	// bottomContainer: {
	// 	flex: 1,
	// 	backgroundColor: '#ffffff',
	// 	borderWidth: 1,
	// 	borderColor: '#000000',
	// },
});
