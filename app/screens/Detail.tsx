import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
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
  const [apiType, setApiType] = useState("cases");

  useEffect(() => {
    getCovidStats();
    getCovidTimeSeriesData(period, apiType);
    getPreviousWeeks(4);
  }, []);

  useEffect(() => {
    getCovidTimeSeriesData(period, apiType);
  }, [period, apiType]);

  async function getCovidTimeSeriesData(period: string, apiType: string) {
    setData({ data: [], loading: true });
    setApiType(apiType);
    const covidTimeSeriesData = await CovidApi.getCovidTimeSeriesDataForCountry(
      country,
      period
    );
    // https://github.com/indiespirit/react-native-chart-kit/issues/237
    /* setLabels({
      data: Object.keys(covidTimeSeriesData.timeline.cases) as never,
      loading: false,
    }); */
    if (apiType == "deaths") {
      setData({
        data: Object.values(covidTimeSeriesData.timeline.deaths),
        loading: false,
      });
    } else if (apiType == "recovered") {
      setData({
        data: Object.values(covidTimeSeriesData.timeline.recovered),
        loading: false,
      });
    } else {
      setData({
        data: Object.values(covidTimeSeriesData.timeline.cases),
        loading: false,
      });
    }
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

  function getPreviousMonths(amount: number) {
    var months = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var current = new Date();
    for (var i = 0; i < amount; i++) {
      months.push(monthNames[current.getMonth() - i]);
    }
    setLabels({ data: months.reverse() as never, loading: false });
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
    setLabels({ data: weeks.reverse() as never, loading: false });
  }

  if (pageType == "infections") {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <View style={styles.statisticsContainer}>
          <Statistics
            title="cases"
            amount={cases.cases}
            onPress={() => {
              getCovidTimeSeriesData(period, "cases");
              getPreviousMonths(3);
            }}
          />
          <Statistics
            title="deaths"
            amount={deaths}
            onPress={() => getCovidTimeSeriesData(period, "deaths")}
          />
          <Statistics
            title="recovered"
            amount={recovered}
            onPress={() => getCovidTimeSeriesData(period, "recovered")}
          />
        </View>
        <View style={styles.timeStampsContainer}>
          <Button
            onPress={() => {
              setPeriod("all");
              setLabels({
                data: ["Dec. 2019", " ", " ", " ", " ", "Today"] as never,
                loading: false,
              });
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
              setLabels({
                data: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ] as never,
                loading: false,
              });
            }}
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width,
  },
  timeStampsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },
});
