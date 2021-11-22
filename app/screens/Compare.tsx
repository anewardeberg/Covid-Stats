import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import CompareData from "../components/CompareData";
import Button from "../components/Exports";
import Flag from "../components/Flag";
import Heading from "../components/Heading";
import colors from "../config/colors";

export default function Compare({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Compare">) {
  useEffect(() => {
    getCovidStatsCountry1();
    getCovidStatsCountry2();
  }, []);
  const [country1, setCountry1] = useState({});
  const [country2, setCountry2] = useState({});
  const [loading, setLoading] = useState(true);

  async function getCovidStatsCountry1() {
    setLoading(true);
    const country1CovidStats = await CovidApi.getCovidStatForCountry("norway");
    setCountry1(country1CovidStats);
    console.log(country1);
    setLoading(false);
  }

  async function getCovidStatsCountry2() {
    setLoading(true);
    const country2CovidStats = await CovidApi.getCovidStatForCountry(
      "afghanistan"
    );
    setCountry2(country2CovidStats);
    console.log(country2);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Heading text="Compare" type="screen" />
      <Button
        onPress={() => {
          getCovidStatsCountry1(), getCovidStatsCountry2();
        }}
        type="navigation"
        icon="jeehh"
      />
      <View style={styles.flagContainer}>
        <Flag uri={country1.countryInfo.flag} type="icon" />
        <Flag uri={country2.countryInfo.flag} type="icon" />
      </View>
      {country1 && country2 && (
        <ScrollView style={styles.container}>
          <CompareData
            title="population"
            number1={country1.population}
            number2={country2.population}
          />
          <CompareData
            title="cases"
            number1={country1.cases}
            number2={country2.cases}
          />
          <CompareData
            title="tests"
            number1={country1.tests}
            number2={country2.tests}
          />
          <CompareData
            title="deaths"
            number1={country1.deaths}
            number2={country2.deaths}
          />
          <CompareData
            title="recovered"
            number1={country1.recovered}
            number2={country2.recovered}
          />
          <CompareData
            title="cases per million"
            number1={country1.casesPerOneMillion}
            number2={country2.casesPerOneMillion}
          />
          <CompareData
            title="tests per million"
            number1={country1.testsPerOneMillion}
            number2={country2.testsPerOneMillion}
          />
          <CompareData
            title="deaths per million"
            number1={country1.deathsPerOneMillion}
            number2={country2.deathsPerOneMillion}
          />
          <CompareData
            title="recovered per million"
            number1={country1.recoveredPerOneMillion}
            number2={country2.recoveredPerOneMillion}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
  },
  scrollView: {
    backgroundColor: colors.covidRed,
    marginHorizontal: 20,
  },
  flagContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
