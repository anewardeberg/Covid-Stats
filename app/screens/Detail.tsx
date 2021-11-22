import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import Heading from "../components/Heading";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function Detail(
  { navigation }: NativeStackScreenProps<RootStackParamList, "Detail">,
  { loading }: Props
) {
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  async function getCovidStats() {
    const countryCovidStats = await CovidApi.getCovidStatForCountry("NOR");
    setCases(countryCovidStats.cases);
    setDeaths(countryCovidStats.deaths);
    setRecovered(countryCovidStats.recovered);
    console.log(countryCovidStats.country);
  }
  getCovidStats();
  return (
    <View style={styles.container}>
      <Heading text="NOR" subtitle="Norway" type="detail" />
      <Statistics cases={cases} deaths={deaths} recovered={recovered} />
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
