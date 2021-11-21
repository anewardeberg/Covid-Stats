import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

export default function List({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "List">) {
  return (
    <View style={styles.container}>
      <Statistics cases={257707492} deaths={5167029} recovered={232661187} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
