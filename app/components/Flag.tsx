import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
} from "react-native";

type Props = { uri: string; type: "detail" | "icon" };

export default function Flag({ uri, type }: Props) {
  if (type == "detail") {
    const source: ImageSourcePropType = {
      uri,
      width: Platform.OS == "ios" ? Dimensions.get("screen").width : 150,
      height: Platform.OS == "ios" ? Dimensions.get("screen").width / 1.5 : 100,
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
    bottom: Platform.OS == "ios" ? 0 : undefined,
    right: Platform.OS == "android" ? 0 : undefined,
    marginTop: Platform.OS == "android" ? 10 : undefined,
    marginRight: Platform.OS == "android" ? 10 : undefined,
  },
});
