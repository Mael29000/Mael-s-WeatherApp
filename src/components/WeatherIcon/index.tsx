import React from "react";
import { Image, StyleSheet } from "react-native";

export default function WeatherIcon({ icon, width }: any) {
  const styles = StyleSheet.create({
    icon: {
      width: width,
      height: width,
    },
  });
  const getIcon = (icon: string) =>
    `http://openweathermap.org/img/wn/${icon}@4x.png`;
  return <Image source={{ uri: getIcon(icon) }} style={styles.icon} />;
}
