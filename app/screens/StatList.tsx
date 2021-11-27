import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import CovidList from "../components/CovidList";
import Heading from "../components/Heading";
import List from "../components/List";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function StatList(
  { navigation, route }: NativeStackScreenProps<RootStackParamList, "StatList">,
  { loading }: Props
) {
  const { pageType } = route.params;
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  async function getCovidStats() {
    const allCovidData = await CovidApi.getGlobalCovidStats();
    const covidDataCountry = await CovidApi.getCovidStatForCountry(250);
    setCases(allCovidData.cases);
    setDeaths(allCovidData.deaths);
    setRecovered(allCovidData.recovered);
    console.log(covidDataCountry.country);
  }

  getCovidStats();
  if (pageType == "infections") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Heading text="world statistics" type="screen" />
          <Statistics cases={cases} deaths={deaths} recovered={recovered} />
          <List listType="infections" />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Heading text="world statistics" type="screen" />
          <List listType="vaccine" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: { flex: 1, margin: 20 },
});
