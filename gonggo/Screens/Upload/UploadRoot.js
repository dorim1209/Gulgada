import * as React from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createBottomTabNavigator } from "react-navigation-tabs";

import UploadMain from "./UploadMain";
import MyCurrentApply from "./MyCurrentApply";

const UploadRoot = createStackNavigator(
  {
    UploadMain: UploadMain,
    MyCurrentApply: MyCurrentApply
  },
  {
    initialRouteName: "MyCurrentApply"
  }
);

const AppContainer = createAppContainer(UploadRoot);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
