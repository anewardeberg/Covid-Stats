import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import {
  Button,
  AppLoader,
  CompareData,
  Flag,
  Graph,
  GraphController,
  Heading,
} from "../components/Exports";
import colors from "../config/colors";
import { country } from "../data/country";

export default function Compare({
  route,
}: NativeStackScreenProps<RootStackParamList, "Compare">) {
  const { pageType } = route.params;
  const [text1, onChangeText1] = useState("norway");
  const [text2, onChangeText2] = useState("norway");
  const [country1, setCountry1] = useState<country | null>();
  const [country2, setCountry2] = useState<country | null>();
  const [country1VaccineData, setCountry1VaccineData] = useState({
    data: [1, 1],
    doses: 1,
    loading: true,
  });
  const [country2VaccineData, setCountry2VaccineData] = useState({
    data: [1, 1],
    doses: 1,
    loading: true,
  });
  const [period, setPeriod] = useState<string | null>("all");
  const [loading, setLoading] = useState(true);
  // used code from previous collaborative project
  const [labels, setLabels] = useState<{
    data: string[];
    loading: boolean;
  } | null>({
    data: ["Dec. 2019", " ", " ", " ", " ", "Today"],
    loading: false,
  });
  const graphData = [
    {
      data: country1VaccineData.data,
      strokeWidth: 3,
      color: (opacity = 1) => `rgba(78,185,128, ${opacity})`,
    },
    {
      data: country2VaccineData.data,
      strokeWidth: 3,
      color: (opacity = 1) => `rgba(78,149,185, ${opacity})`,
    },
  ];

  useEffect(() => {
    getCovidStatsCountry1(text1);
    getCovidStatsCountry2(text2);
    getVaccineDataCountry1(text1);
    getVaccineDataCountry2(text2);
  }, []);

  useEffect(() => {
    getVaccineDataCountry1(text1);
    getVaccineDataCountry2(text2);
  }, [period]);

  async function getCovidStatsCountry1(text1: string) {
    setLoading(true);
    const country1CovidStats = await CovidApi.getCovidStatForCountry(text1);
    setCountry1(country1CovidStats);
    setLoading(false);
  }

  async function getCovidStatsCountry2(text2: string) {
    setLoading(true);
    const country2CovidStats = await CovidApi.getCovidStatForCountry(text2);
    setCountry2(country2CovidStats);
    setLoading(false);
  }

  async function getVaccineDataCountry1(text1: string) {
    setLoading(true);
    const country1VaccineData = await CovidApi.getVaccineCoverageForCountry(
      text1,
      period
    );
    const country1doses = await CovidApi.getVaccineCoverageForCountryFullData(
      text1,
      "1"
    );
    setCountry1VaccineData({
      data: Object.values(country1VaccineData.timeline),
      doses: country1doses.timeline[0].total,
      loading: false,
    });
    setLoading(false);
  }

  async function getVaccineDataCountry2(text2: string) {
    setLoading(true);
    const country2VaccineData = await CovidApi.getVaccineCoverageForCountry(
      text2,
      period
    );
    const country2doses = await CovidApi.getVaccineCoverageForCountryFullData(
      text2,
      "1"
    );
    setCountry2VaccineData({
      data: Object.values(country2VaccineData.timeline),
      doses: country2doses.timeline[0].total,
      loading: false,
    });
    setLoading(false);
  }

  if (pageType == "infections" && country1 != null && country2 != null) {
    return (
      <View style={styles.container}>
        {loading ? <AppLoader /> : null}
        <Heading text="Compare" type="screen" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 1"
            onChangeText={onChangeText1}
            returnKeyType="search"
          />
          <Button
            onPress={() => {
              getCovidStatsCountry1(text1.toLowerCase()),
                getCovidStatsCountry2(text2.toLowerCase());
            }}
            type="navigation"
            icon="balance-scale"
          />
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 2"
            onChangeText={onChangeText2}
          />
        </View>
        <View style={styles.flagContainer}>
          <Flag uri={country1.countryInfo.flag} type="icon" />
          <Flag uri={country2.countryInfo.flag} type="icon" />
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
          <View style={{ height: 300 }} />
        </ScrollView>
      </View>
    );
  } else if (pageType == "vaccine" && country1 != null && country2 != null) {
    return (
      <View style={styles.container}>
        {loading ? <AppLoader /> : null}
        <Heading text="Compare" type="screen" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 1"
            onChangeText={onChangeText1}
            returnKeyType="search"
          />
          <Button
            onPress={() => {
              getVaccineDataCountry1(text1.toLowerCase()),
                getVaccineDataCountry2(text2.toLowerCase());
              getCovidStatsCountry1(text1.toLowerCase()),
                getCovidStatsCountry2(text2.toLowerCase());
            }}
            type="navigation"
            icon="balance-scale"
          />
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 2"
            onChangeText={onChangeText2}
          />
        </View>
        <View style={styles.flagContainer}>
          <Flag uri={country1.countryInfo.flag} type="icon" />
          <Flag uri={country2.countryInfo.flag} type="icon" />
        </View>
        <CompareData
          title="population"
          number1={country1.population}
          number2={country2.population}
        />
        <CompareData
          title={"Doses administered"}
          number1={country1VaccineData.doses}
          number2={country2VaccineData.doses}
        />
        <GraphController
          labels={{ current: labels, setCurrent: setLabels }}
          period={{ current: period, setCurrent: setPeriod }}
        />

        {/* https://github.com/indiespirit/react-native-chart-kit/issues/23 */}
        {country1VaccineData.loading ? null : (
          <View style={styles.chartContainer}>
            <Graph
              multiple
              labels={labels?.data}
              data={graphData}
              legend1={country1.country}
              legend2={country2.country}
            />
          </View>
        )}
      </View>
    );
  } else {
    return <AppLoader />;
  }
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  timeStampsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  chartContainer: {
    alignItems: "center",
  },
});
