import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import Button from "./Button";

type Props = {
  labels: {
    current: { data: string[]; loading: boolean } | null;
    setCurrent: Dispatch<
      SetStateAction<{ data: string[]; loading: boolean } | null>
    >;
  };
  period: {
    current: string | null;
    setCurrent: Dispatch<SetStateAction<string | null>>;
  };
};

export default function GraphController({ labels, period }: Props) {
  function getPreviousWeeks(amount: number) {
    var weeks = [];
    var current = new Date();
    var oneJan = new Date(current.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((current - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((current.getDay() + 1 + numberOfDays) / 7);
    for (var i = 0; i < amount; i++) {
      weeks.push(`Week ${result - i}`);
    }
    labels.setCurrent({ data: weeks.reverse(), loading: false });
  }

  function getPreviousMonths(amount: number) {
    var months = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var current = new Date();
    for (var i = 0; i < amount; i++) {
      months.push(monthNames[current.getMonth() - i]);
    }
    labels.setCurrent({ data: months.reverse(), loading: false });
  }

  return (
    <View style={styles.timeStampsContainer}>
      <Button
        onPress={() => {
          period.setCurrent("all");
          labels.setCurrent({
            data: ["Dec. 2019", " ", " ", " ", " ", "Today"],
            loading: false,
          });
        }}
        type="timeStamp"
        title="All"
      />
      <Button
        onPress={() => {
          period.setCurrent("365");
          getPreviousMonths(12);
        }}
        type="timeStamp"
        title="1 year"
      />
      <Button
        onPress={() => {
          period.setCurrent("90");
          getPreviousMonths(3);
        }}
        type="timeStamp"
        title="3 months"
      />
      <Button
        onPress={() => {
          period.setCurrent("30");
          getPreviousWeeks(4);
        }}
        type="timeStamp"
        title="1 month"
      />
      <Button
        onPress={() => {
          period.setCurrent("7");
          labels.setCurrent({
            data: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            loading: false,
          });
        }}
        type="timeStamp"
        title="1 week"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeStampsContainer: {
    width: Dimensions.get("screen").width - 20,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },
});
