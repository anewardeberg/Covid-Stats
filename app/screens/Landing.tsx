import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/Exports";
import colors from "../config/colors";
import { RootStackParamList } from "../../App";

export default function Landing({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.navigate("Choices", { pageType: "infections" })
          }
          title="infections"
          icon="head-side-mask"
          type="primary"
        />
        <Button
          onPress={() =>
            navigation.navigate("Choices", { pageType: "vaccine" })
          }
          title="vaccine"
          icon="syringe"
          type="primary"
        />
      </View>
    </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
