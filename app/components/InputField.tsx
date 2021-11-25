import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";

export default function InputField() {
  const [text, onChangeText] = React.useState("");

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search for country..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
