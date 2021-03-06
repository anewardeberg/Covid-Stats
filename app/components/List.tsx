import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { country } from "../data/country";
import { ListItem } from "./Exports";

type Props = {
  listType: "infections" | "vaccine";
  data: country[];
};

export default function List({ listType, data }: Props) {
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
          contentContainerStyle={{ paddingBottom: 500 }}
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
