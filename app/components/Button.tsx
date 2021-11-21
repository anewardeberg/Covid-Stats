import React from "react";
import colors from "../config/colors";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  icon: string;
  type: "primary" | "navigation";
};

export default function Button({ onPress, title, icon, type }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    backgroundColor: colors.white,
    width: 150,
    height: 100,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonIcon: {
    flex: 1,
    width: 30,
    height: 30,
    backgroundColor: colors.covidRed,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  buttonText: {
    flex: 1,
    fontSize: 12,
    color: colors.covidRed,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
