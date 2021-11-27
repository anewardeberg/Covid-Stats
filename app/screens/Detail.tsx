import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import Flag from "../components/Flag";
import Graph from "../components/Graph";
import Heading from "../components/Heading";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function Detail(
  { navigation, route }: NativeStackScreenProps<RootStackParamList, "Detail">,
  { loading }: Props
) {
  const { pageType } = route.params;
  const { country } = route.params;
  const [cases, setCases] = useState(0);
  const [flagUri, setFlagUri] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [labels, setLabels] = useState({ data: [], loading: true });
  const [data, setData] = useState({ data: [], loading: true });

  useEffect(() => {
    getCovidStats();
    getCovidTimeSeriesData();
  }, []);

  async function getCovidTimeSeriesData() {
    const covidTimeSeriesData = await CovidApi.getCovidTimeSeriesDataForCountry(
      country,
      "all"
    );
    // https://github.com/indiespirit/react-native-chart-kit/issues/237
    setLabels({
      data: Object.keys(covidTimeSeriesData.timeline.deaths) as never,
      loading: false,
    });
    setData({
      data: Object.values(covidTimeSeriesData.timeline.cases),
      loading: false,
    });
    console.log(labels);
    console.log(data);
  }

  async function getCovidStats() {
    const countryCovidStats = await CovidApi.getCovidStatForCountry(country);
    setCountryName(countryCovidStats.country);
    setCountryCode(countryCovidStats.countryInfo.iso3);
    setCases(countryCovidStats.cases);
    setDeaths(countryCovidStats.deaths);
    setRecovered(countryCovidStats.recovered);
    setFlagUri(countryCovidStats.countryInfo.flag);
  }
  if (pageType == "infections") {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <Statistics cases={cases} deaths={deaths} recovered={recovered} />
        {data.loading ? null : (
          <Graph labels={labels.data as never} data={data.data as never} />
        )}
        <Flag uri={flagUri} type="detail" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <Flag uri={flagUri} type="detail" />
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
});
