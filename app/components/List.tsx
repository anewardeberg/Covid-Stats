import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CovidApi from "../../CovidApi";
import ListItem from "./ListItem";

type Props = {
  listType: "infections" | "vaccine";
  data: [];
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
