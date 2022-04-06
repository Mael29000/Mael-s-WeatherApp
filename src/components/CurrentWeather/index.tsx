import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { isSameDay } from "date-fns";
import { PRIMARY, SECONDARY } from "../../styles/colors/weatherDisplayColors";
import WeatherIcon from "../WeatherIcon";

export default function CurrentWeather({ data }: any) {
  const [CurrentWeather, setCurrentWeather] = useState<any>(null);
  useEffect(() => {
    const CurrentW = data.list.filter((forecast: { dt: any }) => {
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
      const forecastDate = new Date(forecast.dt * 1000);
      return isSameDay(today, forecastDate);
    });
    setCurrentWeather(CurrentW[0]);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data?.city?.name}</Text>
      <Text style={styles.today}>Aujourd'hui</Text>
      <WeatherIcon icon={CurrentWeather?.weather[0].icon} width={150} />
      <Text style={styles.temp}>{Math.round(CurrentWeather?.main.temp)}°C</Text>
      <Text style={styles.description}>
        {CurrentWeather?.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: "17%",
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    color: PRIMARY,
  },
  city: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY,
  },
  today: {
    fontSize: 20,
    color: SECONDARY,
  },
  description: {
    fontSize: 20,
    color: SECONDARY,
    fontStyle: "italic",
  },
});
