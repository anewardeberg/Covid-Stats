import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import ListItem from "../components/ListItem";
import Statistics from "../components/Statistics";
import colors from "../config/colors";

type Props = {
  loading: boolean;
};

export default function List(
  { navigation }: NativeStackScreenProps<RootStackParamList, "List">,
  { loading }: Props
) {
  return (
    <>
      <View style={styles.container}>
        <Statistics cases={257707492} deaths={5167029} recovered={232661187} />
        <ListItem title="HEJ" subtitle="halla" />
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
