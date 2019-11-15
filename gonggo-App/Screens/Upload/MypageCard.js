import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
const MypageCard = ({
    db_title,
    db_name,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{db_title}</Text>
            <Text style={styles.title}>{db_name}</Text>
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

export default MypageCard;
