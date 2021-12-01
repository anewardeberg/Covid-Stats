import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../components/Exports";
import colors from "../config/colors";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import { LineChart } from "react-native-chart-kit";
import AppLoader from "../components/AppLoader";

async function getCovidStats() {
  const allCovidData = await CovidApi.getGlobalCovidStats();
}

export default function Landing({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">) {
  const [pageType, setPageType] = useState("infections");
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.navigate("Choices", { pageType: "infections" })
          }
          title="infections"
          icon="jeehh"
          type="primary"
        />
        <Button
          onPress={() =>
            navigation.navigate("Choices", { pageType: "vaccine" })
          }
          title="vaccine"
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
