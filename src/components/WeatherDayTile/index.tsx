import React from "react";
import { View, StyleSheet, Text } from "react-native";
import WeatherTile from "../WeatherTile";

export default function WeatherDayTile({ f }: any) {
  return (
    <View style={styles.container}>
      {f && f.data.map((d: any) => <WeatherTile key={d.hour} d={d} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    // backgroundColor: "red",
    marginHorizontal: 10,
    maxWidth: 300,
    justifyContent: "center",
    alignContent: "space-between",
  },
});
