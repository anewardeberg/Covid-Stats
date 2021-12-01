import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import App, { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import AppLoader from "../components/AppLoader";
import Graph from "../components/Graph";
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
  const [labels, setLabels] = useState({ data: [], loading: true });
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({ data: [], loading: true });
  const [pending, setPending] = useState(false);
  const [sortBy, setSortBy] = useState("cases");

  async function getCovidStats() {
    setPending(true);
    const allCovidData = await CovidApi.getGlobalCovidStats();
    const covidDataCountry = await CovidApi.getCovidStatForCountry(250);
    setCases(allCovidData.cases);
    setDeaths(allCovidData.deaths);
    setRecovered(allCovidData.recovered);
    setPending(false);
  }

  async function fetchCovidListData(sortBy: string) {
    setPending(true);
    const countriesCovidData = await CovidApi.getAllCountriesCovidStats();
    var countriesList;
    if (sortBy == "deaths") {
      countriesList = countriesCovidData.sort((a, b) => {
        return b.deaths - a.deaths;
      });
    } else if (sortBy == "recovered") {
      countriesList = countriesCovidData.sort((a, b) => {
        return b.recovered - a.recovered;
      });
    } else {
      countriesList = countriesCovidData.sort((a, b) => {
        return b.cases - a.cases;
      });
    }
    setListData(countriesList);
    setPending(false);
  }

  async function fetchVaccineListData() {
    setPending(true);
    const countriesVaccineData =
      await CovidApi.getVaccineCoveragePeriodCountries(1);
    const ascendingCountries = countriesVaccineData.sort((a, b) => {
      return b.timeline[0].total - a.timeline[0].total;
    });
    setListData(ascendingCountries);
    setPending(false);
  }

  async function getGlobalVaccineHistory() {
    setPending(true);
    const vaccineHistory = await CovidApi.getGlobalVaccineCoverage("all");
    setLabels({
      data: Object.keys(vaccineHistory) as never,
      loading: false,
    });
    setData({
      data: Object.values(vaccineHistory),
      loading: false,
    });
    setPending(false);
  }

  useEffect(() => {
    getCovidStats();
    getGlobalVaccineHistory();
    if (pageType == "infections") {
      fetchCovidListData("cases");
    } else if (pageType == "vaccine") {
      fetchVaccineListData();
    }
  }, []);
  if (pageType == "infections") {
    return (
      <SafeAreaView style={styles.container}>
        {pending ? <AppLoader /> : null}
        <View style={styles.innerContainer}>
          <Heading text="world statistics" type="screen" />
          <View style={styles.statisticsContainer}>
            <Statistics
              title="cases"
              amount={cases}
              onPress={() => fetchCovidListData("cases")}
            />
            <Statistics
              title="deaths"
              amount={deaths}
              onPress={() => fetchCovidListData("deaths")}
            />
            <Statistics
              title="recovered"
              amount={recovered}
              onPress={() => fetchCovidListData("recovered")}
            />
          </View>
          <List listType="infections" data={listData as never} />
        </View>
        {pending ? <AppLoader /> : null}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {pending ? <AppLoader /> : null}
        <View style={styles.innerContainer}>
          <Heading text="world statistics" type="screen" />
          {data.loading ? null : (
            <Graph labels={labels.data as never} data={data.data as never} />
          )}
          <List listType="vaccine" data={listData as never} />
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
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width,
  },
  innerContainer: { flex: 1, margin: 20 },
});
