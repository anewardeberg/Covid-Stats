import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import Button from "../components/Exports";
import InputField from "../components/InputField";
import colors from "../config/colors";

export default function Search({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Search">) {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search for country..."
        />
        <Button
          onPress={() =>
            navigation.navigate("Detail", { country: text.toLowerCase() })
          }
          type="navigation"
          icon=""
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
  searchContainer: {
    flexDirection: "row",
  },
  input: {
    width: 300,
    marginRight: 10,
    borderRadius: 10,
    textAlign: "center",
    height: 45,
    backgroundColor: colors.white,
    padding: 10,
  },
});
