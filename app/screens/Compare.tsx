import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CompareData from "../components/CompareData";
import Heading from "../components/Heading";
import colors from "../config/colors";

export default function Compare({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Compare">) {
  return (
    <View style={styles.container}>
      <Heading text="Compare" type="screen" />
      <CompareData title="Skala" number1={2} number2={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
  },
});
