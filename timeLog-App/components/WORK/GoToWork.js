import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	AsyncStorage,
	StatusBar,
} from 'react-native';
import axios from 'axios';

export default class GoToWork extends React.Component {
	state = {
		pnum: '',
		name: '',
		pubKey: '',
		// 출근퇴근 여부
		// 0 : 출근
		// 1 : 퇴근
		resultFlag: '1',
		// toLocaleString()
		timeLog: '',
		timeLogList: [],
		// getTime()
		milliTime: '',
		// 업무 진행 상황(%)
		workStatus: '',
		// 정산 내역(원)
		salary: 9000,
	};

	componentWillMount = async () => {
		// await alert("ㅁㄴㅇㅁㄴㅇ");
		await AsyncStorage.getItem('name')
			.then(result => {
				this.setState({ name: result });
			})
			.catch(err => {
				alert(err);
			});

		await AsyncStorage.getItem('pubKey')
			.then(result => {
				this.setState({ pubKey: result });
			})
			.catch(err => {
				alert(err);
			});

		await this.startTimeLog();
	};

	startTimeLog = async () => {
		try {
			const {
				data: { result },
				// } = await axios.post('http://192.168.11.146:4000/startTimelog', {
			} = await axios.post('http://192.168.11.146:4000/startTimelog', {
				params: {
					pubKey: this.state.pubKey,
				},
			});

			this.setState({ resultFlag: result });
		} catch (err) {
			alert(err);
		}
	};

	// totalTimeLog = async () => {
	// 	try {
	// 		await axios.post('http://70.12.225.80/totalTimelog', {
	// 			params: {
	//
	// 			}
	// 		}
	// 	}
	// };

	handleAddLog = async () => {
		try {
			await this.setState({
				timeLog: new Date().toLocaleString(),
				timeLogList: [
					new Date().toLocaleString(),
					...this.state.timeLogList,
				],
				milliTime: new Date().getTime(),
			});
		} catch (err) {
			alert(err);
		}

		await this.sendLog();
	};

	sendLog = async () => {
		try {
			const {
				data: { result },
			} = await axios.post('http://192.168.11.146:4000/timelog', {
				params: {
					pubKey: this.state.pubKey,
					name: '',
					resultFlag: this.state.resultFlag === '1' ? '0' : '1',
					timeLog: this.state.timeLog,
					milliTime: this.state.milliTime,
				},
			});

			if (this.state.resultFlag === '1') {
				await this.setState({ resultFlag: '0' });
			} else {
				await this.setState({ resultFlag: '1' });
			}
		} catch (err) {
			alert(err);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.topContainer}>
					<View style={styles.navContainer}></View>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>
							{this.state.name} 님,
						</Text>
						<Text style={styles.titleContent}>
							오늘의 업무 내용입니다.
						</Text>
					</View>
					<View style={styles.buttonContainer}>
						{this.state.resultFlag === '1' ? (
							<TouchableOpacity onPress={this.handleAddLog}>
								<View style={styles.buttonView}>
									<Text
										style={{
											color: '#FFA904',
											fontSize: 20,
										}}
									>
										출근 버튼
									</Text>
								</View>
							</TouchableOpacity>
						) : this.state.resultFlag === '0' ? (
							<TouchableOpacity onPress={this.handleAddLog}>
								<View style={styles.buttonView}>
									<Text
										style={{
											color: '#FFA904',
											fontSize: 20,
										}}
									>
										퇴근 버튼
									</Text>
								</View>
							</TouchableOpacity>
						) : (
									<TouchableOpacity onPress={this.handleAddLog}>
										<View style={styles.buttonView}>
											<Text
												style={{
													color: '#FFA904',
													fontSize: 20,
												}}
											>
												출•ּ퇴근 버튼
									</Text>
										</View>
									</TouchableOpacity>
								)}
					</View>
					<View style={styles.stateContainer}>
						<View style={styles.leftContainer}></View>
						<View style={styles.midContainer}>
							<Text style={styles.stateTitleText}>
								업무 진행 상황
							</Text>
							<Text style={styles.stateContentText}>
								{this.state.workStatus}%
							</Text>
						</View>
						<View style={styles.rightContainer}>
							<Text style={styles.stateTitleText}>정산 내역</Text>
							<Text style={styles.stateContentText}>
								{this.state.salary
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								원
							</Text>
						</View>
					</View>
				</View>
				<ScrollView alwaysBounceVertical="true">
					<View style={styles.bottomContainer}>
						<View style={styles.logContainer}>
							{this.state.timeLogList.map(timeLog => {
								return (
									<Text style={styles.logText}>
										{timeLog}
										{this.state.resultFlag === '0' ? (
											<Text style={styles.logText}>
												출근
											</Text>
										) : (
												<Text style={styles.logText}>
													퇴근
											</Text>
											)}
									</Text>
								);
							})}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	topContainer: {
		flex: 1,
		backgroundColor: '#000000',
		justifyContent: 'center',
		color: '#ffffff',
		paddingTop: 50,
		paddingHorizontal: 30,
		minHeight: '50%',
		maxHeight: '50%',
	},
	bottomContainer: {
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	navContainer: {
		flex: 1,
		// borderColor: '#ffffff',
		// borderWidth: 1,
	},
	titleContainer: {
		flex: 2,
		// borderColor: '#ffffff',
		// borderWidth: 1,
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 1,
		// borderColor: '#ffffff',
		// borderWidth: 1,
		justifyContent: 'center',
	},
	stateContainer: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		// borderColor: '#ffffff',
		// borderWidth: 1,
	},
	titleText: {
		color: '#ffffff',
		fontSize: 40,
		fontWeight: 'bold',
	},
	titleContent: {
		color: '#ffffff',
		fontSize: 30,
	},
	button: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFA904',
	},
	leftContainer: {
		flex: 1,
		// borderColor: '#ffffff',
		// borderWidth: 1,
	},
	midContainer: {
		flex: 1,
		// borderColor: '#ffffff',
		// borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightContainer: {
		flex: 1,
		// borderColor: '#ffffff',
		// borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stateTitleText: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 17,
	},
	stateContentText: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 25,
		paddingTop: 15,
	},
	buttonView: {
		borderWidth: 1,
		borderRadius: 30,
		borderColor: '#FFA904',
		width: '40%',
		height: '77%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logIconContainer: {
		flex: 1,
		borderColor: '#000000',
		borderWidth: 1,
	},
	logContainer: {
		flex: 2,
		paddingTop: 20,
		// borderColor: '#000000',
		// borderWidth: 1,
	},
	logText: {
		fontSize: 20,
		// paddingVertical: 20,
		// marginLeft: 10,
	},
});