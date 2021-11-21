import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

type Props = {
  title: string;
  subtitle: string;
};

export default function ListItem({ title, subtitle }: Props) {
  return (
    <View style={[styles.row, styles.container]}>
      <View>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <Text style={[styles.text]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  container: { margin: 10, backgroundColor: colors.white },
  title: { fontWeight: "600" },
  text: {
    color: colors.black,
    textTransform: "capitalize",
    marginLeft: 10,
    fontSize: 16,
  },
});
