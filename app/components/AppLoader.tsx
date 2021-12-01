import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import colors from "../config/colors";

export default function AppLoader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <View style={styles.loaderContainer}>
        <AnimatedLottieView
          source={require("../assets/loader.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loaderContainer: {
    width: 200,
    height: 80,
    zIndex: 1,
    borderRadius: 20,
  },
  text: {
    color: colors.white,
  },
});
