import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

type Props = {
  title: string;
  number1: number;
  number2: number;
};

export default function CompareData({ title, number1, number2 }: Props) {
  var total = number1 + number2;
  var number1percentage = (number1 / total) * 100;
  var number1width =
    (number1percentage / 100) * (Dimensions.get("screen").width / 1.1);
  var number2percentage = (number2 / total) * 100;
  var number2width =
    (number2percentage / 100) * (Dimensions.get("screen").width / 1.1);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number1}</Text>
        <Text style={styles.number}>{number2}</Text>
      </View>
      <View style={styles.barContainer}>
        <View
          style={{
            backgroundColor: colors.barGreen,
            width: number1width,
            height: 35,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        ></View>
        <View
          style={{
            backgroundColor: colors.barBlue,
            width: number2width,
            height: 35,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    margin: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  number: {
    fontSize: 16,
  },
  barContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  bar1: {
    backgroundColor: colors.barGreen,
    height: 35,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bar2: {
    backgroundColor: colors.barBlue,
    width: Dimensions.get("screen").width / 1.26,
    height: 35,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
