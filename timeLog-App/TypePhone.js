import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { reload } from 'expo/build/Updates/Updates';

// 아무 곳이나 터치하면 키보드 숨기는 기능
const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

export default class TypePhone extends React.Component {
	state = {
		pnum: '',
		pw: '',
	};

	_signInAsync = async () => {
		await AsyncStorage.setItem('userToken', 'abc');

		this.props.navigation.navigate('Index');
	};

	login = async () => {
		const {
			data: { result, pnum, name },
		} = await axios.post('http://70.12.225.80:4000/login', {
			params: {
				pnum: this.state.pnum,
			},
		});

		console.log('pnum : ', pnum);

		if (result === 1) {
			await AsyncStorage.setItem('pnum', pnum);
			reload()
		}
	};

	onChange = e => {
		this.setState({
			pnum: e,
		});
	};

	render() {
		return (
			<DismissKeyboard>
				<View style={styles.container}>
					{/* 키보드를 띄우면 방해되지 않도록 하면을 올리는 View */}
					<KeyboardAvoidingView behavior="position">
						<View style={styles.halfContainer}>
							<Text style={styles.title}>
								휴대폰 번호를 입력해주세요.
							</Text>
							<TextInput
								style={styles.textInput}
								keyboardType="number-pad"
								placeholder="하이픈(-) 없이 입력해주세요."
								// value={this.state.pnum}
								onChangeText={pnum => this.onChange(pnum)}
							></TextInput>
							<TouchableOpacity
								style={styles.submitButton}
								onPress={this.login}
							>
								<Text style={styles.submitText}>다 음</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</View>
			</DismissKeyboard>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	halfContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	submitButton: {
		flex: 1,
		backgroundColor: '#FFA904',
		maxHeight: 40,
		marginTop: 30,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	disabledButton: {
		flex: 1,
		backgroundColor: '#d3d3d3',
		maxHeight: 40,
		marginTop: 30,
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 25,
		marginBottom: 30,
		textAlign: 'left',
	},
	subtitle: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 15,
		textAlign: 'left',
		marginBottom: 10,
	},
	textInput: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		fontSize: 23,
	},
	submitText: {
		color: '#ffffff',
		fontSize: 20,
	},
	disabledText: {},
});
