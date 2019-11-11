import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
const AnnounceCard = ({
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
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.index}>{db_wtype}</Text>
      <Text style={styles.title}>{db_title}</Text>
      <Text style={styles.info}>날짜</Text>
      {db_sdate && db_edate ? <Text style={styles.detail}>
        {new Date(parseInt(db_sdate)).toLocaleDateString()} ~ {new Date(parseInt(db_edate)).toLocaleDateString()}
      </Text> : null}
      <Text style={styles.info}>근무시간</Text>
      <Text style={styles.detail}>
        {db_stime}:{db_smin} ~ {db_etime}:{db_emin}
      </Text>
      <Text style={styles.info}>시급</Text>
      <Text style={styles.detail}>₩{db_money}</Text>
      <Text style={styles.info}>주소</Text>
      <Text style={styles.detail}>{db_address}</Text>
      <Text style={styles.info}>이미지</Text>
      <Image
        style={{ width: "100%", height: 100 }}
        source={{ uri: `http://172.20.10.3:4000/안녕디지몬.jpeg` }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    justifyContent: "center",
    paddingTop: 24,
    paddingLeft: 20
  },
  index: {
    fontSize: 14,
    color: "gray"
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 30
  },
  info: {
    color: "#ffa904",
    fontSize: 20
  },
  detail: {
    paddingBottom: 10
  }
});

export default AnnounceCard;
