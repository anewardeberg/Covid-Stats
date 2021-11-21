import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import ListItem from "../components/ListItem";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function StatList(
  { navigation }: NativeStackScreenProps<RootStackParamList, "StatList">,
  { loading }: Props
) {
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  async function getCovidStats() {
    const allCovidData = await CovidApi.getAllCovidStats();
    const covidDataCountry = await CovidApi.getCovidStatForCountry(250);
    setCases(allCovidData.cases);
    setDeaths(allCovidData.deaths);
    setRecovered(allCovidData.recovered);
    console.log(covidDataCountry.country);
  }

  getCovidStats();
  return (
    <>
      <View style={styles.container}>
        <Statistics cases={cases} deaths={deaths} recovered={recovered} />
        <ListItem title="HEJ" subtitle="halla" />
      </View>
    </>
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
