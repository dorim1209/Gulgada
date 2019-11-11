import * as React from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createBottomTabNavigator } from "react-navigation-tabs";

import MypageMain from "./MypageMain";

const MypageRoot = createStackNavigator(
  {
    MypageMain: MypageMain
  },
  {
    initialRouteName: "MypageMain"
  }
);

const AppContainer = createAppContainer(MypageRoot);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
