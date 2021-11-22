import React, { Component } from "react";
import { FlatList, View } from "react-native";
import CovidApi from "../../CovidApi";
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
    this.setState({ data: countriesCovidData });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => (
            <ListItem
              num={1}
              title={item.country}
              flagUri={item.countryInfo.flag}
            />
          )}
        />
      </View>
    );
  }
}
