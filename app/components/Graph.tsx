import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Props = {
  labels: [];
  data: [];
};

export default function Graph({ labels, data }: Props) {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
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
