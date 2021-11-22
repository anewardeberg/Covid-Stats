import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

type Props = { uri: string; type: "detail" | "icon" };

export default function Flag({ uri, type }: Props) {
  if (type == "detail") {
    const source: ImageSourcePropType = {
      uri,
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").width / 1.5,
    };
    return <Image source={source} style={styles.flag} />;
  } else {
    const source: ImageSourcePropType = {
      uri,
      width: 30,
      height: 23,
    };
    return <Image source={source} />;
  }
}

const styles = StyleSheet.create({
  flag: {
    position: "absolute",
    opacity: 0.3,
    bottom: 0,
  },
});
