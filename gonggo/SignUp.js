import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";
import axios from "axios";

let radio_props = [
    { label: "근로자", value: 0 },
    { label: "고용주", value: 1 }
];

export default SignUp = ({ setModalVisible }) => {
    let name = "";
    let pnum = "";
    let birth = "";
    let ptype = "";

    onChangeName = (val) => {
        name = val;
    };
    onChangePnum = (val) => {
        pnum = val;
    };
    onChangeBirth = (val) => {
        birth = val;
    };
    onChangePtype = (val) => {
        ptype = val;
    };

    signUp = async () => {
        try {
            const {
                data: { result }
            } = await axios.post("http://172.20.10.3:4000/join", {
                params: {
                    pnum: pnum,
                    name: name,
                    birth: birth,
                    ptype: ptype
                }
            });

            alert(`회원가입되셨습니다.\n 화면을 닫고 로그인해주세요.`);

            // alert('user successfully signed up!: ', success);
        } catch (err) {
            // alert('error signing up: ', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text>회원가입</Text>
            <TextInput
                style={styles.input}
                placeholder="01054884480"
                autoCapitalize="none"
                placeholderTextColor="gray"
                keyboardType="number-pad"
                onChangeText={(val) => this.onChangePnum(val)}
            />
            <TextInput
                style={styles.input}
                placeholder="성명"
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={(val) => this.onChangeName(val)}
            />
            <TextInput
                style={styles.input}
                placeholder="YYMDD"
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={(val) => this.onChangeBirth(val)}
            />
            <View style={styles.input}>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    buttonColor={"#FFA904"}
                    // buttonInnerColor={'#FFA904'}
                    animation={true}
                    onPress={(val) => this.onChangePtype(val)}
                />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={this.signUp}>
                <Text style={styles.submitText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={setModalVisible}>
                <Text style={styles.cancelText}>닫기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 55,
        margin: 10,
        padding: 8,
        color: "#000000",
        borderColor: "#000000",
        borderWidth: 0.5,
        borderRadius: 14,
        fontSize: 18,
        fontWeight: "500"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 300
    },
    submitButton: {
        width: 250,
        height: 55,
        margin: 10,
        backgroundColor: "#FFA904",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelButton: {
        width: 250,
        height: 55,
        margin: 10,
        backgroundColor: "#d3d3d3",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center"
    },
    submitText: {
        fontSize: 18,
        color: "#ffffff"
        // fontWeight: 'bold',
    },
    cancelText: {
        fontSize: 18,
        color: "#ffffff"
        // fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "left"
    },
    radioContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});