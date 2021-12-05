import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  name: string | undefined;
  size: number;
};

export default function GetIcon({ name, size }: Props) {
  return (
    <View>
      <FontAwesome5 name={name} color="#a81818" size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {},
});
