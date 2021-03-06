import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Choices from "./app/screens/Choices";
import Landing from "./app/screens/Landing";
import StatList from "./app/screens/StatList";
import Detail from "./app/screens/Detail";
import Search from "./app/screens/Search";
import Compare from "./app/screens/Compare";
export type RootStackParamList = {
  Landing: undefined;
  Choices: { pageType: string };
  StatList: { pageType: string };
  Detail: { country: string; pageType: string };
  Search: { pageType: string };
  Compare: { pageType: string };
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing}></Stack.Screen>
        <Stack.Screen name="Choices" component={Choices}></Stack.Screen>
        <Stack.Screen name="StatList" component={StatList}></Stack.Screen>
        <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
        <Stack.Screen name="Search" component={Search}></Stack.Screen>
        <Stack.Screen name="Compare" component={Compare}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
