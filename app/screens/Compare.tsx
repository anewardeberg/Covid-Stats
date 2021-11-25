import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
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
    getCovidStatsCountry1(text1);
    getCovidStatsCountry2(text2);
  }, []);
  const [text1, onChangeText1] = useState("italy");
  const [text2, onChangeText2] = useState("norway");
  const [country1, setCountry1] = useState({
    name: "",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png",
    population: 1,
    cases: 1,
    tests: 1,
    deaths: 1,
    recovered: 1,
    casesPerOneMillion: 1,
    testsPerOneMillion: 1,
    deathsPerOneMillion: 1,
    recoveredPerOneMillion: 1,
  });
  const [country2, setCountry2] = useState({
    name: "",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png",
    population: 1,
    cases: 1,
    tests: 1,
    deaths: 1,
    recovered: 1,
    casesPerOneMillion: 1,
    testsPerOneMillion: 1,
    deathsPerOneMillion: 1,
    recoveredPerOneMillion: 1,
  });
  const [loading, setLoading] = useState(true);

  async function getCovidStatsCountry1(text1: string) {
    setLoading(true);
    const country1CovidStats = await CovidApi.getCovidStatForCountry(text1);
    setCountry1({
      name: country1CovidStats.country,
      flag: country1CovidStats.countryInfo.flag,
      population: country1CovidStats.population,
      cases: country1CovidStats.cases,
      tests: country1CovidStats.tests,
      deaths: country1CovidStats.deaths,
      recovered: country1CovidStats.recovered,
      casesPerOneMillion: country1CovidStats.casesPerOneMillion,
      testsPerOneMillion: country1CovidStats.testsPerOneMillion,
      deathsPerOneMillion: country1CovidStats.deathsPerOneMillion,
      recoveredPerOneMillion: country1CovidStats.recoveredPerOneMillion,
    });
    setLoading(false);
  }

  async function getCovidStatsCountry2(text2: string) {
    setLoading(true);
    const country2CovidStats = await CovidApi.getCovidStatForCountry(text2);
    setCountry2({
      name: country2CovidStats.country,
      flag: country2CovidStats.countryInfo.flag,
      population: country2CovidStats.population,
      cases: country2CovidStats.cases,
      tests: country2CovidStats.tests,
      deaths: country2CovidStats.deaths,
      recovered: country2CovidStats.recovered,
      casesPerOneMillion: country2CovidStats.casesPerOneMillion,
      testsPerOneMillion: country2CovidStats.testsPerOneMillion,
      deathsPerOneMillion: country2CovidStats.deathsPerOneMillion,
      recoveredPerOneMillion: country2CovidStats.recoveredPerOneMillion,
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Heading text="Compare" type="screen" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="COUNTRY 1"
          onChangeText={onChangeText1}
        />
        <Button
          onPress={() => {
            getCovidStatsCountry1(text1), getCovidStatsCountry2(text2);
          }}
          type="navigation"
          icon="jeehh"
        />
        <TextInput
          style={styles.input}
          placeholder="COUNTRY 2"
          onChangeText={onChangeText2}
        />
      </View>
      <View style={styles.flagContainer}>
        <Flag uri={country1.flag} type="icon" />
        <Flag uri={country2.flag} type="icon" />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    width: 150,
    borderRadius: 10,
    textAlign: "center",
    height: 45,
    backgroundColor: colors.white,
    padding: 10,
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
