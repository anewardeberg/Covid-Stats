import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

type Props = {
  text: string;
};
export default function Heading({ text }: Props) {
  return (
    <>
      <Text style={styles.heading}>{text}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: colors.covidRed,
    alignSelf: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
