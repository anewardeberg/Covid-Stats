import React, { Component } from "react";
import { FlatList, View } from "react-native";
import CovidApi from "../../CovidApi";
import { country } from "../data/country";
import ListItem from "./ListItem";
/* 
https://www.youtube.com/watch?v=IuYo009yc8w
*/

export default class CovidList extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.fetchCovidData();
  }

  fetchCovidData = async () => {
    const countriesCovidData = await CovidApi.getAllCountriesCovidStats();
    const ascendingCountries = countriesCovidData.sort(
      (a: country, b: country) => {
        return b.cases - a.cases;
      }
    );
    this.setState({ data: ascendingCountries });
  };

  fetchVaccineData = async () => {
    const countriesVaccineData = await CovidApi.getGlobalVaccineCoverage("all");
    this.setState({ data: countriesVaccineData });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item, index }: { item: country; index: number }) => (
            <ListItem
              num={index + 1}
              title={item.country}
              flagUri={item.countryInfo.flag}
            />
          )}
        />
      </View>
    );
  }
}
