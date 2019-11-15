import React, { version } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class Schedule extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStartDate: null,
			selectedEndDate: null,
			workCount: 2,
			list: [
				{
					name: '영찬이네 감귤',
					address: '제주 서귀포시 문성로38길 32-10',
					startDate: `${new Date().getMonth()}월 ${new Date().getDay()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
					endDate: `${new Date().getMonth()}월 ${new Date().getDay() +
						3}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
				},
				{
					name: '천혜향땄도림',
					address: '제주 서귀포시 염솔로 131',
					startDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
					endDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay() +
						3}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
				},
				{
					name: '천혜향땄도림',
					address: '제주 서귀포시 염솔로 131',
					startDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
					endDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay() +
						3}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
				},
				{
					name: '천혜향땄도림',
					address: '제주 서귀포시 염솔로 131',
					startDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
					endDate: `${new Date().getMonth() +
						1}월 ${new Date().getDay() +
						3}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분`,
				},
			],
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			selectedStartDate: null,
			selectedEndDate: null,
		});
	}

	onDateChange(date, type) {
		//function to handle the date change
		if (type === 'END_DATE') {
			this.setState({
				selectedEndDate: date,
			});
		} else {
			this.setState({
				selectedStartDate: date,
				selectedEndDate: null,
			});
		}
	}

	render() {
		const { selectedStartDate, selectedEndDate } = this.state;
		const minDate = new Date(2018, 1, 1);
		const maxDate = new Date(2050, 6, 3);
		const startDate = selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';

		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>일정</Text>
					</View>
					<View style={styles.calendarContainer}>
						<CalendarPicker
							startFromMonday={false}
							allowRangeSelection={true}
							minDate={minDate}
							maxDate={maxDate}
							weekdays={[
								'일',
								'월',
								'화',
								'수',
								'목',
								'금',
								'토',
							]}
							months={[
								'1월',
								'2월',
								'3월',
								'4월',
								'5월',
								'6월',
								'7월',
								'8월',
								'9월',
								'10월',
								'11월',
								'12월',
							]}
							previousTitle="이전"
							nextTitle="다음"
							todayBackgroundColor="#808080"
							selectedDayColor="#000000"
							selectedDayTextColor="#ffffff"
							scaleFactor={375}
							textStyle={{
								// fontFamily: 'NanumGothicCoding.ttf',
								color: '#ffffff',
								fontSize: 17,
							}}
							onDateChange={this.onDateChange}
						/>
					</View>
				</View>
				<View style={styles.listContainer}>
					<View style={styles.listTitleContainer}>
						<Text style={styles.listTitle}>알바 리스트</Text>
						<Text style={styles.listSubtitle}>
							업무 내용 : {this.state.list.length}개
						</Text>
					</View>
					<ScrollView
						alwaysBounceVertical="true"
						showsVerticalScrollIndicator="false"
					>
						<View style={styles.listContentContainer}>
							{/* <Text style={styles.name}>{startDate}</Text>
							<Text style={styles.name}>{endDate}</Text> */}

							{this.state.list.map(item => {
								return (
									<View style={styles.listContentContainer}>
										<Text style={styles.name}>
											{item.name}
										</Text>
										<Text style={styles.address}>
											{item.address}
										</Text>
										<Text style={styles.address}>
											{item.startDate}
										</Text>
										<Text style={styles.address}>
											{item.endDate}
										</Text>
									</View>
								);
							})}
						</View>
					</ScrollView>
				</View>
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
		minHeight: '60%',
		backgroundColor: '#FFA904',
		paddingTop: 50,
	},
	titleContainer: {
		// flex: 1,
		// borderColor: '#000000',
		// borderWidth: 1,
		minHeight: '10%',
	},
	calendarContainer: {
		// flex: 1,
		// borderColor: '#000000',
		// borderWidth: 1,
		minHeight: '50%',
	},
	listContainer: {
		maxHeight: '40%',
		paddingHorizontal: 30,
		paddingTop: 30,
	},
	listTitleContainer: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 0.5,
	},
	listContentContainer: {
		paddingTop: 15,
		paddingLeft: 20,
		paddingBottom: 10,
	},
	titleText: {
		fontSize: 25,
		paddingTop: 10,
		textAlign: 'center',
		color: '#ffffff',
	},
	listTitle: {
		fontWeight: 'bold',
		fontSize: 30,
		marginBottom: 10,
	},
	listSubtitle: {
		color: '#808080',
		fontSize: 20,
		paddingBottom: 15,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000000',
	},
	address: {
		fontSize: 17,
		color: '#808080',
	},
});
