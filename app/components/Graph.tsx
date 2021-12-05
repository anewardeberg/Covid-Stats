import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { country } from "../data/country";
import { graphInfo } from "../data/graphInfo";

type Props = {
  labels: string[] | undefined;
  data: country[] | graphInfo[];
  multiple?: boolean;
  legend1?: string;
  legend2?: string;
};

export default function Graph({
  labels,
  data,
  multiple,
  legend1,
  legend2,
}: Props) {
  return (
    <View style={styles.container}>
      <LineChart
        data={
          multiple
            ? ({
                labels: labels,
                datasets: data,
                legend: [legend1, legend2],
              } as LineChartData)
            : ({
                labels: labels,
                datasets: [
                  {
                    data: data,
                  },
                ],
              } as unknown as LineChartData)
        }
        width={Dimensions.get("window").width / 1.05} // from react-native
        height={250}
        withDots={false}
        yAxisInterval={7}
        formatYLabel={(yValue) => {
          return yValue.substring(0, yValue.length - 3);
        }}
        verticalLabelRotation={20}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(168, 24, 24, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(168, 24, 24, ${opacity})`,
          style: {
            padding: 10,
            borderRadius: 16,
          },
        }}
        bezier
        fromZero
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});
