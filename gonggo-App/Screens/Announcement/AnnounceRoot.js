import * as React from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "./HomeScreen";
import AnnounceDetail from "./AnnounceDetail";
import AnnounceCard from "./AnnounceCard";

const AnnounceRoot = createStackNavigator(
  {
    Home: HomeScreen,
    AnnounceDetail: AnnounceDetail,
    AnnounceCard: AnnounceCard
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AnnounceRoot);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
