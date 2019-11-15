import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

export default Contract = ({ setModalVisible }) => {
	return (
		<ScrollView alwaysBounceVertical="true">
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>귤 가 다</Text>
					<Text style={styles.titleText}>근 로 계 약 서</Text>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.contentSubTitleText}>
						ㅇㅇ시 ㅇㅇ구 ㅇㅇ길 ㅇㅇ에 소재한 귤가다하우스(이하
						"사업주"라 칭한다) 선과장과 아르바이트 근무자
						ㅇㅇㅇ(이하 "근로자"라 칭한다)는 다음과 같이 아르바이트
						계약을 체결한다.
					</Text>
					<Text style={styles.contentTitleText}>
						[제1조] 근무시간
					</Text>
					<Text style={styles.contentSubTitleText}>
						1) 근무시간: ㅇㅇ시간 ㅇㅇ분{'\n'}2) 휴게시간: ㅇㅇ시간
						ㅇㅇ분{'\n'}3) 휴무일: 매주 ㅇ요일
					</Text>
					<Text style={styles.contentTitleText}>
						[제2조] 계약기간
					</Text>
					<Text style={styles.contentSubTitleText}>
						1) 본 계약서 작성일로부터 ㅇ년간 유효한다.{'\n'}2)
						아르바이트를 그만둘 시에는 ㅇㅇ일 이전에 "사업주"에게
						통지하여 후임자를 뽑을 수 있도록 하여야 한다.
					</Text>
					<Text style={styles.contentTitleText}>[제3조] 급여</Text>
					<Text style={styles.contentSubTitleText}>
						1) 시간당 일급 ㅇㅇ,ㅇㅇㅇ원정(W ㅇㅇ,ㅇㅇㅇ)으로
						계산하여 매월 말일 정산하여 익월 ㅇㅇ일에 "근로자"의
						계좌로 현금입금한다.{'\n'}
						2) 지각이 ㅇㅇ분을 초과할 시에는 ㅇㅇ시간의 임금을
						공제하며 ㅇㅇ분 이상 지각횟수가 ㅇ개월 ㅇ회 이상이 될
						시에는 ㅇ일치 급여를 공제한다. 이러한 경우 "사업주"는
						근로관계의 종료를 취할 수 있다.
					</Text>
					<Text style={styles.contentTitleText}>
						[제4조] 근무수칙
					</Text>
					<Text style={styles.contentSubTitleText}>
						1) 출근 즉시 매장의 물품을 정리하고 편의점 내부의 청소를
						시행한다.{'\n'}고객에 대하여 언제나 친절하게 대하여
						고객의 불만이 발생하지 않도록 한다.{'\n'}3) 고객이 수표
						등의 제시를 한 경우 반드시 해당 수표 등의 위조 여부를
						사전에 확인하고 고객의 연락처 등의 기재유무를 확인 후
						결제를 행한다.{'\n'}4) 퇴근 시 물건의 정리정돈 및
						후임자의 근무에 차질이 없도록 한다.{'\n'}5) 점장의
						업무지시에 성실히 응하여야 한다.
					</Text>
					<Text style={styles.contentTitleText}>
						[제5조] 지급품 관리
					</Text>
					<Text style={styles.contentSubTitleText}>
						1) "근로자"는 지급된 물품에 대한 보관 관리에 만전을
						기하며 훼손, 분실 등이 발생하지 않도록 한다.{'\n'}2)
						"근로자"는 바코드 인식기, 카드 결제기 등의 업무관련
						물품의 고장 발생 시 즉각 점장에게 이를 고지하고 관련
						조치를 취하여야 한다.
					</Text>
					<Text style={styles.contentTitleText}>
						[제6조] 물품정리
					</Text>
					<Text style={styles.contentSubTitleText}>
						1) "근로자"는 판매된 물품의 수시적 재진열 및 고객이
						희망하는 부족물품에 대하여 점장에게 통지한다.
					</Text>
				</View>
				<TouchableOpacity onPress={setModalVisible}>
					<View style={styles.btnContainer}>
						<Text style={styles.btnText}>완 료</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// borderWidth: 1,
		// borderColor: '#000000',
		marginTop: 50,
		marginHorizontal: 10,
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
		// borderColor: '#000000',
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	contentContainer: {
		flex: 6,
		// borderWidth: 1,
		// borderColor: '#000000',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#d3d3d3',
	},
	contentTitleText: {
		fontSize: 12,
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 5,
	},
	contentSubTitleText: {
		fontSize: 12,
	},
	btnContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
		// borderColor: '#000000',
		backgroundColor: 'orange',
		borderRadius: 5,
		marginBottom: 20,
	},
	btnText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#ffffff',
		paddingVertical: 10,
	},
});
