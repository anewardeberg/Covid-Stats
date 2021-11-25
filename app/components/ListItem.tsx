import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";
import colors from "../config/colors";
import Flag from "./Flag";

type Props = {
  num: number;
  title: string;
  flagUri: string;
};

export default function ListItem({ num, title, flagUri }: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail" as never, { country: title } as never)
      }
      style={[styles.row, styles.container]}
    >
      <View style={styles.countryContainer}>
        <Text style={styles.number}>{num.toString()}</Text>
        <Text style={[styles.text]}>{title}</Text>
        <View style={styles.flagContainer}>
          <Flag uri={flagUri} type={"icon"} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
  },
  countryContainer: {
    width: 370,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  number: {
    fontSize: 24,
    flex: 1.4,
  },
  text: {
    textAlignVertical: "center",
    flex: 10,
    color: colors.black,
    textTransform: "uppercase",
    marginLeft: 10,
    fontSize: 18,
  },
  flagContainer: {
    justifyContent: "center",
    flex: 1,
  },
});
