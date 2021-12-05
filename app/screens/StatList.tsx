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
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import AppLoader from "../components/AppLoader";
import Graph from "../components/Graph";
import Heading from "../components/Heading";
import List from "../components/List";
import Statistics from "../components/Statistics";
import colors from "../config/colors";
import { country } from "../data/country";
import { vaccineData } from "../data/vaccineData";

export default function StatList({
  route,
}: NativeStackScreenProps<RootStackParamList, "StatList">) {
  const { pageType } = route.params;
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [labels, setLabels] = useState<{ data: string[]; loading: boolean }>();
  const [listData, setListData] =
    useState<{ data: string[]; loading: boolean }>();
  const [data, setData] = useState({ data: [], loading: true });
  const [pending, setPending] = useState(false);
  const [sortBy, setSortBy] = useState("cases");
  const [activeButton, setActiveButton] = useState(1);

  async function getCovidStats() {
    setPending(true);
    const allCovidData = await CovidApi.getGlobalCovidStats();
    setCases(allCovidData.cases);
    setDeaths(allCovidData.deaths);
    setRecovered(allCovidData.recovered);
    setPending(false);
  }

  async function fetchCovidListData(sortBy: string) {
    setPending(true);
    setSortBy(sortBy);
    const countriesCovidData = await CovidApi.getAllCountriesCovidStats();
    var countriesList;
    if (sortBy == "deaths") {
      countriesList = countriesCovidData.sort((a: country, b: country) => {
        return b.deaths - a.deaths;
      });
    } else if (sortBy == "recovered") {
      countriesList = countriesCovidData.sort((a: country, b: country) => {
        return b.recovered - a.recovered;
      });
    } else {
      countriesList = countriesCovidData.sort((a: country, b: country) => {
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
    const ascendingCountries = countriesVaccineData.sort(
      (a: vaccineData, b: vaccineData) => {
        return b.timeline[0].total - a.timeline[0].total;
      }
    );
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
            <View style={activeButton == 1 ? styles.border : null}>
              <Statistics
                title="cases"
                amount={cases}
                onPress={() => {
                  fetchCovidListData("cases");
                  setActiveButton(1);
                }}
              />
            </View>
            <View style={activeButton == 2 ? styles.border : null}>
              <Statistics
                title="deaths"
                amount={cases}
                onPress={() => {
                  fetchCovidListData("deaths");
                  setActiveButton(2);
                }}
              />
            </View>
            <View style={activeButton == 3 ? styles.border : null}>
              <Statistics
                title="recovered"
                amount={cases}
                onPress={() => {
                  fetchCovidListData("recovered");
                  setActiveButton(3);
                }}
              />
            </View>
          </View>
          <Text
            style={styles.text}
          >{`List is sorted by total amount of ${sortBy}.`}</Text>
          <List listType="infections" data={listData as never} />
        </View>
        {pending ? <AppLoader /> : null}
      </SafeAreaView>
    );
  } else if (pageType == "vaccine" && labels != undefined) {
    return (
      <SafeAreaView style={styles.container}>
        {pending ? <AppLoader /> : null}
        <View style={styles.innerContainer}>
          <Heading text="world statistics" type="screen" />
          {data.loading ? null : (
            <Graph labels={labels.data} data={data.data} />
          )}
          <List listType="vaccine" data={listData as never} />
        </View>
      </SafeAreaView>
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
    alignItems: "center",
    justifyContent: "center",
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width,
    padding: 10,
  },
  text: {
    alignSelf: "center",
    color: colors.covidRed,
    fontStyle: "italic",
    paddingBottom: 10,
  },
  innerContainer: {
    flex: 1,
    margin: 20,
  },
  border: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.covidRed,
  },
});
