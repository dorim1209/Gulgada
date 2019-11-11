import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    AsyncStorage,
    Modal
} from "react-native";
import axios from "axios";
import { reload } from "expo/build/Updates/Updates";
import { relativeTimeThreshold } from "moment";
import { StackNavigator } from "react-navigation";

import SignUp from "./SignUp";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class TypePhone extends React.Component {
    state = {
        pubKey: "",
        pnum: "",
        name: "",
        ptype: "",
        birth: "",
        modalVisible: false
    };

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    // _signInAsync = async () => {
    // 	await AsyncStorage.setItem('userToken', 'abc');

    // 	this.props.navigation.navigate('Index');
    // };

    // _signUpAsync = async () => {
    // 	// await AsyncStorage.setItem('userToken', 'abc');

    // 	this.props.navigation.navigate('SignUp');
    // };

    onChange = (e) => {
        this.setState({
            pnum: e
        });
    };

    login = async () => {
        const {
            data: { result, name, pubKey, pnum, ptype, birth }
        } = await axios.post("http://172.20.10.3:4000/login", {
            params: {
                pnum: this.state.pnum
            }
        });
        // this.setState({
        // 	name: name,
        // });

        if (result === 1) {
            await AsyncStorage.setItem("pubKey", pubKey);
            await AsyncStorage.setItem("name", name);
            await AsyncStorage.setItem("pnum", pnum);
            await AsyncStorage.setItem("ptype", ptype);
            await AsyncStorage.setItem("birth", birth);
            reload();
        }

        if (!result) {
            alert("회원 아님");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={{ marginTop: 50 }}>
                        <SignUp setModalVisible={this.setModalVisible} />
                    </View>
                </Modal>
                <DismissKeyboard>
                    <View style={styles.container}>
                        {/* 키보드를 띄우면 방해되지 않도록 하면을 올리는 View */}
                        <KeyboardAvoidingView behavior="position">
                            <View style={styles.halfContainer}>
                                <Text style={styles.title}>휴대폰 번호를 입력해주세요.</Text>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="number-pad"
                                    placeholder="하이픈(-) 없이 입력해주세요."
                                    // value={this.state.pnum}

                                    onChangeText={(pnum) => this.onChange(pnum)}
                                ></TextInput>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={this.login}
                                >
                                    <Text style={styles.submitText}>로그인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={this.setModalVisible}
                                >
                                    <Text style={styles.submitText}>회원가입</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </DismissKeyboard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center"
    },
    submitButton: {
        flex: 1,
        backgroundColor: "#FFA904",
        maxHeight: 40,
        marginTop: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    disabledButton: {
        flex: 1,
        backgroundColor: "#d3d3d3",
        maxHeight: 40,
        marginTop: 30
    },
    title: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        marginBottom: 30,
        textAlign: "left"
    },
    subtitle: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 15,
        textAlign: "left",
        marginBottom: 10
    },
    textInput: {
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 1,
        fontSize: 23
    },
    submitText: {
        color: "#ffffff",
        fontSize: 20
    },
    disabledText: {}
});