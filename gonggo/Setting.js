import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { reload } from 'expo/build/Updates/Updates';

export default Setting = () => {
    logout = () => {
        AsyncStorage.clear();

        reload();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    alert('알림 설정');
                }}
            >
                <Text style={styles.buttonText}>알림 설정</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    alert('위치 설정');
                }}
            >
                <Text style={styles.buttonText}>위치 설정</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.logout}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 30,
        borderWidth: 1,
        borderColor: '#FFA904',
        borderRadius: 6,
        backgroundColor: '#FFA904',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});