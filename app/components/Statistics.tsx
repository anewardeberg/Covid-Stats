import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

type Props = {
  title: string;
  amount: number;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Statistics({ title, amount, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.statisticsContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.statsText}>{amount}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statisticsContainer: {
    margin: 9,
    backgroundColor: colors.white,
    width: Dimensions.get("screen").width / 3.5,
    height: 75,
    borderRadius: 20,
    paddingTop: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 11,
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 16,
    color: colors.covidRed,
    flex: 2,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
