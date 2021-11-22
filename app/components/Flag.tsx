import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

type Props = { uri: string };

export default function Flag({ uri }: Props) {
  const source: ImageSourcePropType = {
    uri,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width / 1.5,
  };

  return <Image source={source} style={styles.flag} />;
}

const styles = StyleSheet.create({
  flag: {
    position: "absolute",
    opacity: 0.3,
    bottom: 0,
  },
});
