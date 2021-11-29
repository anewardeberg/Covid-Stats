import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CovidApi from "../../CovidApi";
import ListItem from "./ListItem";

type Props = {
  listType: "infections" | "vaccine";
};

export default function List({ listType }: Props) {
  const [data, setData] = useState([]);
  async function fetchCovidData() {
    const countriesCovidData = await CovidApi.getAllCountriesCovidStats();
    const ascendingCountries = countriesCovidData.sort((a, b) => {
      return b.cases - a.cases;
    });
    setData(ascendingCountries);
  }

  async function fetchVaccineData() {
    const countriesVaccineData =
      await CovidApi.getVaccineCoveragePeriodCountries(1);
    const ascendingCountries = countriesVaccineData.sort((a, b) => {
      return b.timeline[0].total - a.timeline[0].total;
    });
    setData(ascendingCountries);
  }

  if (listType == "infections") {
    fetchCovidData();
  } else if (listType == "vaccine") {
    fetchVaccineData();
  }

  if (listType == "infections") {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              num={index + 1}
              title={item.country}
              flagUri={item.countryInfo.flag}
              pageType={listType}
            />
          )}
        />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              num={index + 1}
              title={item.country}
              pageType={listType}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
