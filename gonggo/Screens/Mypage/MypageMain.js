import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Avatar } from "react-native-paper";
import { reload } from "expo/build/Updates/Updates";

export default class MyPageMain extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    name: "",
    pnum: "",
    ptype: "",
    birth: ""
  };
  componentDidMount = () => {
    AsyncStorage.getItem("name")
      .then((result) => {
        this.setState({ name: result });
      })
      .catch((err) => {
        alert(err);
      });
    AsyncStorage.getItem("birth")
      .then((result) => {
        this.setState({ birth: result });
      })
      .catch((err) => {
        alert(err);
      });
    AsyncStorage.getItem("pnum")
      .then((result) => {
        this.setState({ pnum: result });
      })
      .catch((err) => {
        alert(err);
      });
    AsyncStorage.getItem("ptype")
      .then((result) => {
        this.setState({ ptype: result });
      })
      .catch((err) => {
        alert(err);
      });
  };
  logout = () => {
    AsyncStorage.clear();
    reload();
  };
  render() {
    return (
      <ScrollView
        alwaysBounceVertical={true}
        style={{
          backgroundColor: "#ffa904"
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#772ea2" />
        <View style={styles.container}>
          <View style={{ paddingTop: 150 }}></View>
          <View style={styles.bottomBox}>
            <View>
              <View style={styles.avatarSt}>
                <Avatar.Image
                  size={130}
                  source={require("../../assets/splash_img.png")}
                  style={{
                    backgroundColor: "green",
                    position: "absolute"
                  }}
                />
              </View>
            </View>
            <View style={styles.myInfoDetail}>
              <View
                style={{
                  paddingTop: 30,
                  paddingBottom: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {this.state.name}
                </Text>
              </View>
              <View
                style={{
                  paddingBottom: 10
                }}
              >
                <Text
                  style={{ fontSize: 23, textAlign: "center" }}
                >{`만 27세  |  남`}</Text>
              </View>
              <View style={styles.Myrate}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 20
                    }}
                  >
                    나의 근무 평점
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 20
                    }}
                  >
                    4.5
                  </Text>
                </View>
              </View>
              <View style={styles.bottomText}>
                <View style={{ paddingTop: 20 }}>
                  <View style={styles.myInfoDetailBox}>
                    <Text style={styles.titleMyInfoDetail}>이름</Text>
                    <Text style={styles.contentMyInfoDetail}>
                      {this.state.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.myInfoDetailBox}>
                  <Text style={styles.titleMyInfoDetail}>고객유형</Text>
                  <Text style={styles.contentMyInfoDetail}>
                    {this.state.ptype === "1" ? "고용주" : "근로자"}
                  </Text>
                </View>
                <View style={styles.myInfoDetailBox}>
                  <Text style={styles.titleMyInfoDetail}>생년월일</Text>
                  <Text style={styles.contentMyInfoDetail}>
                    {this.state.birth}
                  </Text>
                </View>
                <View style={styles.myInfoDetailBox}>
                  <Text style={styles.titleMyInfoDetail}>휴대폰번호</Text>
                  <Text style={styles.contentMyInfoDetail}>
                    {this.state.pnum}
                  </Text>
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 20 }}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
{
  /* <TouchableHighlight
                    onPress={() =>
                      this.props.navigation.navigate("AnnounceCard", {
                        screen: "AnnounceCard"
                      })
                    }
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>로그아웃</Text>
                  </TouchableHighlight> */
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  },
  bottomBox: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  avatarSt: {
    marginTop: -80,
    marginLeft: 123
  },

  myInfoDetail: {
    paddingTop: 30
  },
  Myrate: {
    paddingTop: 10,
    paddingLeft: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20
  },
  bottomText: {
    paddingLeft: 20
  },

  myInfoDetailBox: {
    paddingRight: 20,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    paddingTop: 20,
    width: "95%"
  },
  titleMyInfoDetail: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#808080",
    marginBottom: 10
  },
  contentMyInfoDetail: {
    fontSize: 30,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#ffa904",
    alignSelf: "stretch",
    marginRight: 20,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center"
  }
});
