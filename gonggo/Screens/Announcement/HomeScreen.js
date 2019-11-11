import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import axios from "axios";

import AnnounceCard from "./AnnounceCard";

export default class HomeScreen extends React.Component {
  state = {
    article: [],
    name: ""
  };
  static navigationOptions = {
    header: null
  };
  article = async () => {
    const {
      data: { article }
    } = await axios.get("http://172.20.10.3:4000/article");
    console.log(article);
    this.setState({ article });
  };

  componentDidMount = () => {
    this.article();
    AsyncStorage.getItem("name")
      .then((result) => {
        this.setState({ name: result });
      })
      .catch((err) => {
        alert(err);
      });

  };

  render() {
    const { article } = this.state;

    return (
      <ScrollView
        alwaysBounceVertical={true}
        style={{
          backgroundColor: "#ffa904"
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#772ea2" />
        <View style={styles.container}>
          <View style={{ paddingBottom: 30, flex: 1 }}>
            <Text style={styles.name}>{this.state.name}님</Text>
            <Text
              style={styles.whatuneed}
            >{`오늘은 어떤일이 \n필요하신가요?`}</Text>
            <View style={{ paddingLeft: 30 }}>
              <View style={{ flex: 1, paddingTop: 10 }}>
                <View
                  style={{
                    height: 80,
                    backgroundColor: "#ffa904",
                    justifyContent: "center",
                    width: 310,
                    borderColor: "white"
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      backgroundColor: "ffa904",
                      flexDirection: "row",
                      padding: 5,
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                  >
                    <Ionicons
                      name="ios-search"
                      style={{
                        fontSize: 25,
                        color: "white"
                      }}
                    />
                    <TextInput
                      placeholder="Search"
                      style={{
                        fontSize: 25,
                        paddingLeft: 17
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "white", flex: 1, paddingLeft: 8 }}>
            <Text style={styles.tag}>공고 리스트</Text>
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
                  <View key={id} style={{ paddingLeft: 20, paddingBottom: 20 }}>
                    <Card
                      style={styles.cardradius}
                      onPress={() =>
                        this.props.navigation.navigate("AnnounceDetail", {
                          id: id
                        })
                      }
                    >
                      <AnnounceCard
                        db_etime={db_etime}
                        db_emin={db_emin}
                        db_money={db_money}
                        db_address={db_address}
                        db_img={db_img}
                        db_wtype={db_wtype}
                        db_title={db_title}
                        db_sdate={db_sdate}
                        db_stime={db_stime}
                        db_smin={db_smin}
                        db_edate={db_edate}
                      />
                    </Card>
                  </View>
                )
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
    // backgroundColor: '#ffa904',
  },
  name: {
    flex: 0,
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    paddingLeft: 20,
    color: "white"
  },
  search: {
    paddingLeft: 10,
    paddingBottom: 30
  },
  whatuneed: {
    paddingTop: 20,
    fontSize: 35,
    paddingLeft: 20,
    paddingBottom: 15,
    color: "white"
  },
  tag: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 20
  },
  cardradius: {
    width: 310,
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
  }
});