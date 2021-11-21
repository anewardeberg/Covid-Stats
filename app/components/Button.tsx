import React from "react";
import colors from "../config/colors";
import {
  GestureResponderEvent,
  StyleSheet,
  Image,
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
  if (type == "navigation") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.navigationButtonContainer}
      >
        <View style={styles.navigationButtonIcon} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.primaryButtonContainer}>
        <Image
          style={styles.buttonIcon}
          source={require("../assets/favicon.png")}
        />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  primaryButtonContainer: {
    margin: 10,
    flexDirection: "column",
    backgroundColor: colors.white,
    width: 150,
    height: 100,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  navigationButtonContainer: {
    backgroundColor: colors.white,
    width: 60,
    height: 50,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  navigationButtonIcon: {
    margin: 5,
    width: 30,
    height: 30,
    backgroundColor: colors.covidRed,
    alignSelf: "center",
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
