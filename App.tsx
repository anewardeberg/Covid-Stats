import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "./app/components/Button";
import colors from "./app/config/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => alert("hej")}
          title="hej"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() => alert("hej")}
          title="hej"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() => alert("hej")}
          title="hej"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() => alert("hej")}
          title="hej"
          icon="jeehh"
          type="primary"
        />

        <StatusBar style="auto" />
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
