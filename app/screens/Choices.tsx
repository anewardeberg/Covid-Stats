import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import Button from "../components/Exports";
import Heading from "../components/Heading";
import colors from "../config/colors";

export default function Choices({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Choices">) {
  const { pageType } = route.params;
  return (
    <View style={styles.container}>
      <Heading text={pageType} type="screen" />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.navigate("StatList", { pageType: pageType })
          }
          title="list"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() => navigation.navigate("Search")}
          title="search"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() => navigation.navigate("Compare")}
          title="compare"
          icon="jeehh"
          type="primary"
        />
      </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
