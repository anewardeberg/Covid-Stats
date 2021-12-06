import React, { Dispatch, SetStateAction, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import { Button } from "./Exports";

// used code from previous collaborative project
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
  const [activeButton, setActiveButton] = useState(1);
  function getPreviousWeeks(amount: number) {
    var weeks = [];
    var current = new Date();
    var oneJan = new Date(current.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (current.valueOf() - oneJan.valueOf()) / (24 * 60 * 60 * 1000)
    );
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
      <View style={activeButton == 1 ? styles.border : null}>
        <Button
          onPress={() => {
            period.setCurrent("all");
            labels.setCurrent({
              data: ["Dec. 2019", " ", " ", " ", " ", "Today"],
              loading: false,
            });
            setActiveButton(1);
          }}
          type="timeStamp"
          title="All"
        />
      </View>
      <View style={activeButton == 2 ? styles.border : null}>
        <Button
          onPress={() => {
            period.setCurrent("365");
            getPreviousMonths(12);
            setActiveButton(2);
          }}
          type="timeStamp"
          title="1 year"
        />
      </View>
      <View style={activeButton == 3 ? styles.border : null}>
        <Button
          onPress={() => {
            period.setCurrent("90");
            getPreviousMonths(3);
            setActiveButton(3);
          }}
          type="timeStamp"
          title="3 months"
        />
      </View>
      <View style={activeButton == 4 ? styles.border : null}>
        <Button
          onPress={() => {
            period.setCurrent("30");
            getPreviousWeeks(4);
            setActiveButton(4);
          }}
          type="timeStamp"
          title="1 month"
        />
      </View>
      <View style={activeButton == 5 ? styles.border : null}>
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
            setActiveButton(5);
          }}
          type="timeStamp"
          title="1 week"
        />
      </View>
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
    marginBottom: 10,
  },
  border: {
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.covidRed,
  },
});
