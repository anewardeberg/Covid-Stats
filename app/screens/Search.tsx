import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import InputField from "../components/InputField";
import colors from "../config/colors";

export default function Search({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Search">) {
  return (
    <View style={styles.container}>
      <InputField />
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
