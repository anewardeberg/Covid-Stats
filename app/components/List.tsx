import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import ListItem from "../components/ListItem";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function List() {
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  async function getCovidStats() {
    const allCovidData = await CovidApi.getAllCovidStats();
    setCases(allCovidData.cases);
    setDeaths(allCovidData.deaths);
    setRecovered(allCovidData.recovered);
  }

  getCovidStats();

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 100,
          backgroundColor: colors.covidRed,
        }}
      >
        <Text>No countries to show</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    console.log("item", item);

    return (
      <TouchableOpacity>
        <Text>Country Stat</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          renderItem={renderItem}
          data={countriesArray}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.backgroundBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
