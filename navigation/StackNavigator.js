import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "../screens/theme/theme-context";
import Home from "../screens/home";
import Search from "../screens/search";
import Detail from "../components/Detail";
import Setting from "../screens/setting";
import Data from "../components/Data";
import PlayBar from "../components/MySongs/PlayBar";

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
const HomeStackNavigator = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name=" "
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Setting"
          options={screenOptionStyle}
          component={Setting}
        />
        <Stack.Screen
          name="Data"
          options={screenOptionStyle}
          component={Data}
        />
        <Stack.Screen
          name="PlayBar"
          options={screenOptionStyle}
          component={PlayBar}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
};
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
      <Stack.Screen
        name="Detail"
        options={screenOptionStyle}
        component={Detail}
      />
    </Stack.Navigator>
  );
};
export { HomeStackNavigator, SearchStackNavigator };
