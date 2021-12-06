import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import {
  AppLoader,
  Flag,
  Graph,
  GraphController,
  Heading,
  Statistics,
} from "../components/Exports";
import colors from "../config/colors";

export default function Detail({
  route,
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { pageType } = route.params;
  const { country } = route.params;
  const [cases, setCases] = useState({ cases: 0, loading: true });
  const [flagUri, setFlagUri] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png"
  );
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  // used code from previous collaborative project
  const [labels, setLabels] = useState<{
    data: string[];
    loading: boolean;
  } | null>({
    data: ["Dec. 2019", " ", " ", " ", " ", "Today"],
    loading: false,
  });
  const [data, setData] = useState({ data: [], loading: true });
  const [period, setPeriod] = useState<string | null>("all");
  const [apiType, setApiType] = useState("cases");
  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    getCovidStats();
    period && getCovidTimeSeriesData(period, apiType);
    console.log(labels?.data);
  }, []);

  useEffect(() => {
    period && getCovidTimeSeriesData(period, apiType);
  }, [period, apiType]);

  async function getCovidTimeSeriesData(period: string, apiType: string) {
    setData({ data: [], loading: true });
    setApiType(apiType);
    const covidTimeSeriesData = await CovidApi.getCovidTimeSeriesDataForCountry(
      country,
      period
    );
    // https://github.com/indiespirit/react-native-chart-kit/issues/237
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

  if (pageType == "infections") {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <View style={styles.statisticsContainer}>
          <View style={activeButton == 1 ? styles.border : null}>
            <Statistics
              title="cases"
              amount={cases.cases}
              onPress={() => {
                period && getCovidTimeSeriesData(period, "cases");
              }}
            />
          </View>
          <View style={activeButton == 2 ? styles.border : null}>
            <Statistics
              title="deaths"
              amount={deaths}
              onPress={() => {
                period && getCovidTimeSeriesData(period, "deaths");
                setActiveButton(2);
              }}
            />
          </View>
          <View style={activeButton == 3 ? styles.border : null}>
            <Statistics
              title="recovered"
              amount={recovered}
              onPress={() => {
                period && getCovidTimeSeriesData(period, "recovered");
                setActiveButton(3);
              }}
            />
          </View>
        </View>
        <GraphController
          labels={{ current: labels, setCurrent: setLabels }}
          period={{ current: period, setCurrent: setPeriod }}
        />
        {data.loading ? (
          <AppLoader />
        ) : (
          labels && <Graph labels={labels.data} data={data.data} />
        )}
        <Flag uri={flagUri} type="detail" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Heading text={countryCode} subtitle={countryName} type="detail" />
        <GraphController
          labels={{ current: labels, setCurrent: setLabels }}
          period={{ current: period, setCurrent: setPeriod }}
        />

        {data.loading ? (
          <AppLoader />
        ) : (
          labels?.data && (
            <Graph labels={labels.data as never} data={data.data as never} />
          )
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
    padding: 10,
  },
  border: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.covidRed,
  },
});
