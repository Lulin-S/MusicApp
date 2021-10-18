import * as React from "react";
import Tab from "./navigation/TabNavigator";
import { LogBox } from "react-native";
//import { YellowBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  //YellowBox.ignoreWarnings([""]);
  return <Tab />;
}
