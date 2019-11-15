import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AnnounceRoot from "./Screens/Announcement/AnnounceRoot";
import MypageRoot from "./Screens/Mypage/MypageRoot";
import Setting from "./Setting";
import MyCurrentApply from "./Screens/Upload/MyCurrentApply";
import UploadRoot from "./Screens/Upload/UploadRoot";
/* 
class App extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
} */

const BottomTabNavigator = createBottomTabNavigator({
  공고: {
    screen: AnnounceRoot,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = "ios-paper";
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: "#FFA904",
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold"
        },
        style: {
          backgroundColor: "#ffffff"
        }
      }
    }
  },
  마이페이지: {
    screen: MypageRoot,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = "ios-calendar";
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: "#FFA904",
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold"
        },
        style: {
          backgroundColor: "#ffffff"
        }
      }
    }
  },
  계약체결: {
    screen: UploadRoot,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = "ios-apps";
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: "#FFA904",
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold"
        },
        style: {
          backgroundColor: "#ffffff"
        }
      }
    }
  },
  설정: {
    screen: Setting,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = "ios-settings";
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: "#FFA904",
        labelStyle: {
          fontSize: 15
        },
        style: {
          backgroundColor: "#ffffff"
        }
      }
    }
  }
});
export default createAppContainer(BottomTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
