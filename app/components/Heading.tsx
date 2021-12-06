import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";

type Props = {
  text: string;
  subtitle?: string;
  type: "screen" | "detail";
};
export default function Heading({ text, subtitle, type }: Props) {
  if (type == "detail") {
    return (
      <>
        <Text style={[styles.heading, styles.detail]}>{text}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </>
    );
  } else {
    return (
      <>
        <Text style={[styles.heading, styles.screen]}>{text}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  screen: {
    fontSize: 40,
    marginTop: 10,
    color: colors.covidRed,
    alignSelf: "center",
  },
  detail: {
    fontSize: 70,
    color: colors.black,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 10,
    textTransform: "capitalize",
  },
});
