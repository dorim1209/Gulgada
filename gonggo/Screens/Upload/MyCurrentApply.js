import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import axios from "axios";
import MypageCard from "./MypageCard";

export default class MyCurrentApply extends React.Component {
  state = {
    articles: [],
    name: ""
  };
  callArticles1 = () => {
    AsyncStorage.getItem("pubKey").then(async (pubKey) => {
      const {
        data: { result }
      } = await axios.post("http://172.20.10.3:4000/myapplylist", {
        params: {
          db_pubkey: pubKey
        }
      });
      this.setState({ articles: result });
    });
    console.log("this.state.articles : ", this.state.articles);
  };

  callArticles2 = () => {
    AsyncStorage.getItem("pubKey").then(async (pubKey) => {
      const {
        data: { result }
      } = await axios.post("http://172.20.10.3:4000/jobSeekerList", {
        params: {
          db_pubkey: pubKey
        }
      });
      this.setState({ articles: result });
    });
    console.log("this.state.articles : ", this.state.articles);
  };

  static navigationOptions = {
    header: null
  };

  approve1 = async (db_articleId) => {
    alert("계약이 체결되었습니다.");
    await axios.post("http://172.20.10.3:4000/myapplylist/accept", {
      params: {
        db_accept: 1,
        db_articleId: db_articleId
      }
    });
  };

  cancel = async (db_articleId) => {
    alert("지원을 취소하셨습니다.");
    await axios.post("http://172.20.10.3:4000/myapplylist/accept", {
      params: {
        db_accept: 1,
        db_articleId: db_articleId
      }
    });
  };
  deny = () => {
    alert("넌 짤렸다");
  };

  approve2 = async (id) => {
    alert("사업주에게 채용을 요청합니다.");
    await axios.post("http://172.20.10.3:4000/jobSeekerList/accept", {
      params: {
        accept: 0,
        articleId: id
      }
    });
  };

  reject = async (id) => {
    alert("지원자를 탈락시켰습니다.");
    await axios.post("http://172.20.10.3:4000/jobSeekerList/accept", {
      params: {
        accept: 1,
        articleId: id
      }
    });
  };
  componentDidMount = () => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    AsyncStorage.getItem("name").then((result) => {
      this.setState({ name: result });
    });
    AsyncStorage.getItem("ptype").then((result) => {
      this.setState({ ptype: result });
      if (result == "1") {
        this.callArticles2();
      } else {
        this.callArticles1();
      }
    });
  };

  render() {
    return (
      <ScrollView
        alwaysBounceVertical={true}
        style={{
          backgroundColor: "#ffa904",
          display: "flex"
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#772ea2" />
        <View style={styles.container}>
          <View style={{ paddingTop: 150 }}></View>
          <View style={styles.bottomBox}>
            {this.state.ptype == "1" ? (
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.props.navigation.navigate("UploadMain");
                    }}
                  >
                    <Text style={styles.buttonText}>공고 올리기</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.myInfoDetail}>
                  {this.state.articles.map(
                    ({ db_title, db_name, db_articleId, db_accept }) => (
                      <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
                        <Card style={styles.cardradius}>
                          <View style={styles.article}>
                            <MypageCard db_title={db_title} db_name={db_name} />
                          </View>
                          {db_accept == null ? (
                            <>
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.approve2(db_articleId)}
                              >
                                <Text style={styles.buttonText}>승인</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.reject(db_articleId)}
                              >
                                <Text style={styles.buttonText}>거부</Text>
                              </TouchableOpacity>
                            </>
                          ) : db_accept == 0 ? (
                            <>
                              <TouchableOpacity
                                style={styles.button}
                                disabled={true}
                              >
                                <Text style={styles.buttonText}>대기</Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                                <TouchableOpacity
                                  style={styles.button}
                                  disabled={true}
                                >
                                  <Text style={styles.buttonText}>종료</Text>
                                </TouchableOpacity>
                              )}
                        </Card>
                      </View>
                    )
                  )}
                </View>
              </View>
            ) : (
                <View style={styles.myInfoDetail}>
                  {this.state.articles.map(
                    ({ db_title, db_name, db_articleId, db_accept }) => (
                      <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
                        <Card style={styles.cardradius}>
                          <View style={styles.article}>
                            <MypageCard db_title={db_title} db_name={db_name} />
                          </View>
                          {db_accept == null ? (
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.cancel(db_articleId)}
                            >
                              <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                          ) : db_accept == 0 ? (
                            <>
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.approve1(db_articleId)}
                              >
                                <Text style={styles.buttonText}>승인</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.cancel(db_articleId)}
                              >
                                <Text style={styles.buttonText}>취소</Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                                <TouchableOpacity
                                  style={styles.button}
                                  disabled={true}
                                >
                                  <Text style={styles.buttonText}>종료</Text>
                                </TouchableOpacity>
                              )}
                        </Card>
                      </View>
                    )
                  )}
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    justifyContent: "center"
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
  itemContainer: {
    flex: 1,
    // borderColor: '#000000',
    // borderWidth: 1,,,,,
    maxHeight: "10%",
    minHeight: "10%",
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10
  },
  article: {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row"
  },
  cardradius: {
    width: "100%",
    marginRight: 10,
    height: 400,
    //Below lines will help to set the border radius
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11
  },
  button: {
    marginVertical: 30,
    borderWidth: 1,
    borderColor: "#FFA904",
    borderRadius: 6,
    backgroundColor: "#FFA904"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});