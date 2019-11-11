/* ******************************************* */

import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  LayoutAnimation,
  Alert
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import * as ImagePicker from "expo-image-picker";

import { ScrollView } from "react-native-gesture-handler";

import axios from "axios";

function getMonth(monthStr) {
  return new Date(monthStr + "-1-01").getMonth() + 1;
}

export default class UploadMain extends Component {
  state = {
    howManyMember: 0,
    money: 0,
    StartTime: new Date(),
    EndTime: new Date(),

    h1: 0,
    h2: 0,
    flag1: true,
    flag2: true,

    addition: "",

    start: null,
    end: null,

    title: "",
    type: "",
    address: "",
    image: null
  };

  onDateChange = (date, type) => {
    //function to handle the date change
    console.log("asdasdasdasd@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: ", type);

    if (type === "END_DATE") {
      const EndDate = date.toString();
      console.log(Date.parse(EndDate));

      this.setState({ end: Date.parse(EndDate) });
    } else if (type === "START_DATE") {
      const StartDate = date.toString();
      console.log(Date.parse(StartDate));

      this.setState({ start: Date.parse(StartDate) });
    }
  };

  static navigationOptions = {
    header: null
  };
  onChangeText = async (text) => {
    this.setState({ address: text });
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ");
    console.log(
      "ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㄴㅇㅁㄴ : ",
      result
    );
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ");
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      /* AsyncStorage.setItem('image', result.uri) */
    }
  };

  pushButton = async () => {
    await AsyncStorage.setItem("title", this.state.title);
    await AsyncStorage.setItem("type", this.state.type);
    await AsyncStorage.setItem("address", this.state.address);
  };

  setStartWorkTime = (newDate) => {
    this.setState({ StartTime: newDate });
    console.log(newDate);
  };
  setEndWorkTime = (newDate) => {
    this.setState({ EndTime: newDate });
    console.log(newDate);
  };

  reward = async (money) => {
    this.setState({ money: money });
  };

  plus = () => {
    this.setState({
      howManyMember: parseInt(this.state.howManyMember) + 1
    });
  };
  minus = () => {
    this.setState({
      howManyMember: parseInt(this.state.howManyMember) - 1
    });
  };

  addition = async (text) => {
    this.setState({ addition: text });
  };

  showStartWorkTime = async () => {
    LayoutAnimation.spring();
    await this.setState({
      flag1: !this.state.flag1
    });
    await this.setState({ h1: this.state.flag1 ? 0 : null });
  };

  showEndWorkTime = async () => {
    LayoutAnimation.spring();
    await this.setState({
      flag2: !this.state.flag2
    });
    await this.setState({ h2: this.state.flag2 ? 0 : null });
  };
  render() {
    const minDate = new Date(2018, 1, 1);
    const maxDate = new Date(2050, 6, 3);
    let { image } = this.state;
    return (
      <ScrollView style={styles.calendarContainer} alwaysBounceVertical={true}>
        <KeyboardAvoidingView style={{ height: "65%" }} behavior="position">
          <View style={{ paddingBottom: 30 }}>
            <View style={{ paddingBottom: 20 }}>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#FFA904",
                  paddingTop: 50,
                  paddingLeft: 20,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5
                  },
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,

                  elevation: 5
                }}
              >
                <Text
                  style={{ fontSize: 30, fontWeight: "bold", color: "black" }}
                >
                  {`일손이 필요한 날짜를 \n선택해주세요.`}
                </Text>

                <CalendarPicker
                  startFromMonday={false}
                  allowRangeSelection={true}
                  minDate={minDate}
                  maxDate={maxDate}
                  weekdays={["일", "월", "화", "수", "목", "금", "토"]}
                  months={[
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월"
                  ]}
                  previousTitle="이전"
                  nextTitle="다음"
                  todayBackgroundColor="#808080"
                  selectedDayColor="#000000"
                  selectedDayTextColor="#ffffff"
                  scaleFactor={375}
                  textStyle={{
                    // fontFamily: 'NanumGothicCoding.ttf',
                    color: "#ffffff",
                    fontSize: 17
                  }}
                  onDateChange={this.onDateChange}
                />
              </View>
            </View>

            <View>
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 20
                  }}
                >
                  <Button
                    title="근무환경 사진을 업로드해주세요."
                    onPress={this._pickImage}
                  />
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 30
                    }}
                  >
                    {" "}
                    상호명{" "}
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 20
                    }}
                    multiline
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ title: text })}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 30
                    }}
                  >
                    {" "}
                    업종{" "}
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 20
                    }}
                    multiline
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ type: text })}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10
                  }}
                >
                  {" "}
                  주소를 입력해 볼테야?{" "}
                </Text>

                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 20
                  }}
                  keyboardType="default"
                  onChangeText={(text) => this.onChangeText(text)}
                />
              </View>
              <View
                style={{ paddingLeft: 20, paddingTop: 30, paddingRight: 20 }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 30
                  }}
                >
                  인원과 시급, 근무시간을 알려주세요
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 15
                    }}
                  >
                    인원
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between"
                    }}
                  >
                    <TouchableOpacity onPress={this.minus}>
                      <Image
                        source={require("../../assets/minus.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                    <Text>{this.state.howManyMember}명</Text>
                    <TouchableOpacity onPress={this.plus}>
                      <Image
                        source={require("../../assets/plus.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 15
                    }}
                  >
                    시급
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between"
                    }}
                  >
                    <TextInput
                      style={{
                        width: 50,
                        justifyContent: "flex-end"
                      }}
                      keyboardType="number-pad"
                      placeholder="시급입력"
                      placeholderTextColor="gray"
                      onChangeText={(text) => this.reward(text)}
                    />
                    <Text>원</Text>
                  </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                  <TouchableHighlight
                    onPress={() => {
                      this.showStartWorkTime(true);
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 15 }}>출근시각</Text>
                    </View>
                  </TouchableHighlight>
                  <DatePickerIOS
                    date={this.state.StartTime}
                    onDateChange={this.setStartWorkTime}
                    mode="time"
                    style={{
                      backgroundColor: "grey",
                      height: this.state.h1,
                      opacity: !this.state.flag1 ? 100 : 0
                    }}
                  />
                </View>

                <View style={{ marginVertical: 10 }}>
                  <TouchableHighlight
                    onPress={() => {
                      this.showEndWorkTime(true);
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 15 }}>퇴근시각</Text>
                    </View>
                  </TouchableHighlight>
                  <DatePickerIOS
                    date={this.state.EndTime}
                    onDateChange={this.setEndWorkTime}
                    mode="time"
                    style={{
                      backgroundColor: "grey",
                      height: this.state.h2,
                      opacity: !this.state.flag2 ? 100 : 0
                    }}
                  />
                </View>

                <View>
                  <View>
                    <Text style={{ paddingTop: 10 }}>추가 사항</Text>
                    <TextInput
                      style={{
                        height: 80,
                        borderWidth: 1,
                        borderStartColor: "gray",
                        borderRadius: 10
                      }}
                      keyboardType="default"
                      onChangeText={(text) => this.addition(text)}
                    />
                    <View
                      style={{
                        borderBottomColor: "gray",
                        marginVertical: 10,
                        borderBottomWidth: 1
                      }}
                    />
                  </View>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                      if (this.state.image === null) {
                        alert("이미지를 넣어주세요");
                      } else {
                        Alert.alert(
                          "구인 공고를 등록할까요?",
                          "등록후, 수정할 수 없으니 꼼꼼히 확인 부탁~!!",
                          [
                            {
                              text: "Cancel",
                              onPress: () => alert("%~"),
                              style: "cancel"
                            },
                            {
                              text: "OK",
                              onPress: async () => {
                                const formData = new FormData();
                                formData.append("db_title", this.state.title);
                                formData.append("db_wtype", this.state.type);
                                formData.append("db_sdate", this.state.start);
                                formData.append("db_edate", this.state.end);
                                formData.append("db_money", this.state.money);
                                formData.append(
                                  "db_address",
                                  this.state.address
                                );
                                formData.append(
                                  "db_description",
                                  this.state.addition
                                );
                                formData.append("file", this.state.image);
                                formData.append("db_stime", "9");
                                formData.append("db_etime", "18");
                                formData.append("db_smin", "00");
                                formData.append("db_emin", "30");
                                await AsyncStorage.getItem("pubKey").then(
                                  (pubKey) => {
                                    formData.append("db_pubkey", pubKey);
                                  }
                                );

                                console.log("안녕 칭구들 : ", formData);

                                const {
                                  data: { result }
                                } = await axios.post(
                                  "http://172.20.10.3:4000/upload",
                                  formData
                                );
                                console.log(result);
                                alert(result);
                                this.props.navigation.navigate("HomeScreen");
                              }
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>공고등록 </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFA904",
    alignSelf: "stretch",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    alignSelf: "center"
  },
  calendarContainer: {
    // flex: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
    paddingTop: 20,
    minHeight: "50%"
  }
});
