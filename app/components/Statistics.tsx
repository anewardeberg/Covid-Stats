import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

type Props = {
  cases: number;
  deaths: number;
  recovered: number;
};

export default function Statistics({ cases, deaths, recovered }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.statisticsContainer}>
        <Text style={styles.headerText}>Cases</Text>
        <Text style={styles.statsText}>{cases}</Text>
      </View>
      <View style={styles.statisticsContainer}>
        <Text style={styles.headerText}>Deaths</Text>
        <Text style={styles.statsText}>{deaths}</Text>
      </View>
      <View style={styles.statisticsContainer}>
        <Text style={styles.headerText}>Recovered</Text>
        <Text style={styles.statsText}>{recovered}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
  },
  statisticsContainer: {
    margin: 9,
    backgroundColor: colors.white,
    width: Dimensions.get("screen").width / 3.5,
    height: 75,
    borderRadius: 20,
    paddingTop: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 11,
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 16,
    color: colors.covidRed,
    flex: 2,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
