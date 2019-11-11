import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Card, CardItem, Body } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

class AnnounceDetail extends React.Component {
  state = {
    article: []
  };
  article = async () => {
    const {
      data: { article }
    } = await axios.get("http://172.20.10.3:4000/articleDetail", {
      params: {
        id: JSON.stringify(this.props.navigation.getParam("id"))
      }
    });
    console.log(article);
    this.setState({ article });
  };
  componentDidMount = () => {
    this.article();
  };

  render() {
    const { article } = this.state;
    return (
      <ScrollView alwaysBounceVertical={true}>
        {article.map(
          ({
            id,
            db_wtype,
            db_title,
            db_sdate,
            db_edate,
            db_stime,
            db_smin,
            db_etime,
            db_emin,
            db_money,
            db_address,
            db_img
          }) => (
              <View key={id}>
                <View style={{ paddingBottom: 20 }}>
                  <Card style={styles.cardST}>
                    <Image
                      style={styles.ImgSt}
                      source={{ uri: `http://172.20.10.3:4000/안녕디지몬.jpeg` }}
                    />
                  </Card>
                </View>
                <View style={styles.container}>
                  <Text style={styles.title}>{db_title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="ios-home"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>주소</Text>
                  </View>
                  <Text style={styles.detail}>{db_address}</Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons
                      name="ios-calendar"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>날짜</Text>
                  </View>
                  {db_sdate && db_edate ? <Text style={styles.detail}>
                    {new Date(parseInt(db_sdate)).toLocaleDateString()} ~ {new Date(parseInt(db_edate)).toLocaleDateString()}
                  </Text> : null}
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons
                      name="ios-contacts"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>모집인원</Text>
                  </View>
                  <Text style={styles.detail}>1명</Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons
                      name="ios-wallet"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>시급</Text>
                  </View>
                  <Text style={styles.detail}>{db_money}원</Text>

                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons
                      name="ios-time"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>노동시간</Text>
                  </View>
                  <Text style={styles.detail}>
                    {db_stime}:{db_smin} ~ {db_etime}:{db_emin}
                  </Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons
                      name="ios-rocket"
                      style={{ fontSize: 20, color: "#ffa904" }}
                    />
                    <Text style={styles.info}>평점</Text>
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Ionicons
                        name="ios-star"
                        style={{ fontSize: 25, color: "#ffa904" }}
                      />
                      <Ionicons
                        name="ios-star"
                        style={{ fontSize: 25, color: "#ffa904" }}
                      />
                      <Ionicons
                        name="ios-star"
                        style={{ fontSize: 25, color: "#ffa904" }}
                      />
                      <Ionicons
                        name="ios-star-half"
                        style={{ fontSize: 25, color: "#ffa904" }}
                      />
                      <Ionicons
                        name="ios-star-outline"
                        style={{ fontSize: 25, color: "#ffa904" }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <TouchableHighlight
                      onPress={() => {
                        AsyncStorage.getItem("pubKey").then(pubKey => {
                          AsyncStorage.getItem("name").then(name => {
                            alert('지원 확인')
                            const {
                              data: { article }
                            } = axios.post("http://172.20.10.3:4000/apply", {
                              params: {
                                articleId: id,
                                apubKey: pubKey,
                                name: name
                              }
                            });
                          })
                        })
                      }}
                      style={styles.button}>
                      <Text style={styles.buttonText}>지원하기 </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            )
        )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingTop: 24,
    paddingLeft: 20
  },
  index: {
    fontSize: 14,
    color: "gray",
    paddingBottom: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 20,
    paddingTop: 20,
    color: "#ffa904"
  },
  info: {
    color: "#ffa904",
    fontSize: 23,
    paddingLeft: 5
  },
  detail: {
    paddingBottom: 10,
    fontSize: 15
  },
  logo: {
    height: 128,
    width: 128
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
  },
  cardST: {
    width: "100%",
    height: 250,
    //Below lines will help to set the border radius
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
  },
  ImgSt: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
});

export default AnnounceDetail;