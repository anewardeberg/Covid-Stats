import React from "react";
import colors from "../config/colors";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GetIcon } from "../components/Exports";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  icon?: string;
  type: "primary" | "navigation" | "timeStamp";
};

export default function Button({ onPress, title, icon, type }: Props) {
  if (type == "navigation") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.navigationButtonContainer}
      >
        <View style={styles.navigationButtonIcon}>
          <GetIcon name={icon} size={25} />
        </View>
      </TouchableOpacity>
    );
  } else if (type == "primary") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.primaryButtonContainer}>
        <View style={styles.buttonIcon}>
          <GetIcon name={icon} size={25} />
        </View>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.timeButtonContainer}>
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
    height: 45,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  timeButtonContainer: {
    backgroundColor: colors.white,
    alignSelf: "center",
    height: 35,
    borderRadius: 20,
    padding: 10,
  },
  buttonIcon: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  navigationButtonIcon: {
    marginTop: 3,
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
