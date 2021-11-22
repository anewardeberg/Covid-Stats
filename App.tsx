import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Choices from "./app/screens/Choices";
import Landing from "./app/screens/Landing";
import StatList from "./app/screens/StatList";
import Detail from "./app/screens/Detail";
export type RootStackParamList = {
  Landing: undefined;
  Choices: undefined;
  StatList: undefined;
  Detail: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
