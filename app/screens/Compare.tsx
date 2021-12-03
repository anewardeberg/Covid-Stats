import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import AppLoader from "../components/AppLoader";
import CompareData from "../components/CompareData";
import Button from "../components/Exports";
import Flag from "../components/Flag";
import Graph from "../components/Graph";
import Heading from "../components/Heading";
import colors from "../config/colors";

export default function Compare({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Compare">) {
  const { pageType } = route.params;
  const [text1, onChangeText1] = useState("norway");
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
  const [period, setPeriod] = useState("30");
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
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

  function getPreviousMonths(amount: number) {
    var months = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var current = new Date();
    for (var i = 0; i < amount; i++) {
      months.push(monthNames[current.getMonth() - i]);
    }
    setLabels(months.reverse() as never);
  }

  function getPreviousWeeks(amount: number) {
    var weeks = [];
    var current = new Date();
    var oneJan = new Date(current.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((current - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((current.getDay() + 1 + numberOfDays) / 7);
    for (var i = 0; i < amount; i++) {
      weeks.push(`Week ${result - i}`);
    }
    setLabels(weeks.reverse() as never);
  }

  if (pageType == "infections") {
    return (
      <View style={styles.container}>
        {loading ? <AppLoader /> : null}
        <Heading text="Compare" type="screen" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 1"
            onChangeText={onChangeText1}
          />
          <Button
            onPress={() => {
              getCovidStatsCountry1(text1.toLowerCase()),
                getCovidStatsCountry2(text2.toLowerCase());
            }}
            type="navigation"
            icon="compare"
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
  } else {
    return (
      <View style={styles.container}>
        {loading ? <AppLoader /> : null}
        <Heading text="Compare" type="screen" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="COUNTRY 1"
            onChangeText={onChangeText1}
          />
          <Button
            onPress={() => {
              getVaccineDataCountry1(text1.toLowerCase()),
                getVaccineDataCountry2(text2.toLowerCase());
              getCovidStatsCountry1(text1.toLowerCase()),
                getCovidStatsCountry2(text2.toLowerCase());
            }}
            type="navigation"
            icon="compare"
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
        <View style={styles.timeStampsContainer}>
          <Button
            onPress={() => {
              setPeriod("all");
              setLabels(["Dec. 2019", " ", " ", " ", " ", "Today"] as never);
            }}
            type="timeStamp"
            title="All"
          />
          <Button
            onPress={() => {
              setPeriod("365");
              getPreviousMonths(12);
            }}
            type="timeStamp"
            title="1 year"
          />
          <Button
            onPress={() => {
              setPeriod("90");
              getPreviousMonths(3);
            }}
            type="timeStamp"
            title="3 months"
          />
          <Button
            onPress={() => {
              setPeriod("30");
              getPreviousWeeks(4);
            }}
            type="timeStamp"
            title="1 month"
          />
          <Button
            onPress={() => {
              setPeriod("7");
              setLabels([
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ] as never);
            }}
            type="timeStamp"
            title="1 week"
          />
        </View>

        {/* https://github.com/indiespirit/react-native-chart-kit/issues/23 */}
        {country1VaccineData.loading ? null : (
          <View style={styles.chartContainer}>
            <Graph multiple labels={labels as never} data={graphData} />
          </View>
        )}
      </View>
    );
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
