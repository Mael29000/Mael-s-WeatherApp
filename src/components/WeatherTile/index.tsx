import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { PRIMARY, SECONDARY } from "../../styles/colors/weatherDisplayColors";
import WeatherIcon from "../WeatherIcon";

export default function WeatherTile({ d }: any) {
  return (
    <View style={styles.forecast}>
      <Text style={styles.hour}>{d.hour}h</Text>
      <WeatherIcon icon={d.icon} width={50} />
      <Text style={styles.temp}>{d.temp}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forecast: {
    height: 140,
    justifyContent: "space-around",
    alignItems: "center",
    width: 70,
  },
  temp: {
    fontSize: 17,
    fontWeight: "bold",
    color: PRIMARY,
  },
  hour: {
    fontSize: 15,
    color: SECONDARY,
  },
});
