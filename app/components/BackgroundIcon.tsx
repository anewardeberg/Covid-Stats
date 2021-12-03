import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BackgroundIcon() {
  return (
    <View>
      <Image source={require("../assets/covid-red.png")} />
    </View>
  );
}

const styles = StyleSheet.create({});
