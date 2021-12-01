import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import AppLoader from "../components/AppLoader";
import Button from "../components/Exports";
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
  const [cases, setCases] = useState({ cases: 0, loading: true });
  const [flagUri, setFlagUri] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [labels, setLabels] = useState({ data: [], loading: true });
  const [data, setData] = useState({ data: [], loading: true });
  const [period, setPeriod] = useState("all");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getCovidStats();
    getCovidTimeSeriesData(period);
  }, []);

  useEffect(() => {
    getCovidTimeSeriesData(period);
  }, [period]);

  async function getCovidTimeSeriesData(period: string) {
    setData({ data: [], loading: true });
    const covidTimeSeriesData = await CovidApi.getCovidTimeSeriesDataForCountry(
      country,
      period
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
  }

  async function getCovidStats() {
    const countryCovidStats = await CovidApi.getCovidStatForCountry(country);
    setCountryName(countryCovidStats.country);
    setCountryCode(countryCovidStats.countryInfo.iso3);
    setDeaths(countryCovidStats.deaths);
    setRecovered(countryCovidStats.recovered);
    setFlagUri(countryCovidStats.countryInfo.flag);
    setCases({ cases: countryCovidStats.cases, loading: false });
  }
  if (pageType == "infections") {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <Statistics cases={cases.cases} deaths={deaths} recovered={recovered} />
        <View style={styles.timeStampsContainer}>
          <Button
            onPress={() => setPeriod("all")}
            type="timeStamp"
            title="All"
          />
          <Button
            onPress={() => setPeriod("365")}
            type="timeStamp"
            title="1 year"
          />
          <Button
            onPress={() => setPeriod("90")}
            type="timeStamp"
            title="3 months"
          />
          <Button
            onPress={() => setPeriod("30")}
            type="timeStamp"
            title="1 month"
          />
          <Button
            onPress={() => setPeriod("7")}
            type="timeStamp"
            title="1 week"
          />
        </View>
        {data.loading ? (
          <AppLoader />
        ) : (
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
  timeStampsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },
});
