import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import CovidApi from "../../CovidApi";
import Button from "../components/Exports";
import InputField from "../components/InputField";
import colors from "../config/colors";

export default function Search({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Search">) {
  const { pageType } = route.params;
  const [text, onChangeText] = useState("");
  const [response, setResponse] = useState({});

  async function checkInput() {
    const countryCovidStats = await CovidApi.getCovidStatForCountry(text);
    setResponse(countryCovidStats);
    if (response == "message") {
      styles.error.opacity = 1;
    } else {
      navigation.navigate("Detail", {
        country: text.toLowerCase(),
        pageType: pageType,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search for country..."
          returnKeyType="search"
          onSubmitEditing={checkInput}
        />
        <Button onPress={() => checkInput()} type="navigation" icon="search" />
      </View>
      <Text style={styles.error}>
        Could not find country "{text}". Please try again
      </Text>
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
  error: {
    opacity: 0,
  },
});
