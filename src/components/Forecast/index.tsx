import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PRIMARY } from "../../styles/colors/weatherDisplayColors";
import WeatherTile from "../WeatherTile";
import WeatherDayTile from "../WeatherDayTile";

export default function Forecast({ data }: any) {
  const [forecasts, setForecasts] = useState<any>(null);
  useEffect(() => {
    const forecastsData = data.list.map((f: any) => {
      const dt = new Date(f.dt * 1000);
      return {
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        day:
          format(new Date(), "EEEE", { locale: fr }) ===
          format(dt, "EEEE", { locale: fr })
            ? "Aujourd'hui"
            : capitalize(format(dt, "EEEE", { locale: fr })),
      };
    });
    // group the forecasts by day
    const groupedForecasts = forecastsData.reduce((acc: any, f: any) => {
      if (acc === null) {
        acc = [];
      }
      let added = false;
      acc.map((d: any) => {
        if (d.day == f.day) {
          d.data = [...d.data, { hour: f.hour, temp: f.temp, icon: f.icon }];
          added = true;
        }
      });
      if (!added) {
        acc.push({
          day: f.day,
          data: [{ hour: f.hour, temp: f.temp, icon: f.icon }],
        });
      }
      return acc;
    }, []);
    setForecasts(groupedForecasts);
  }, [data]);

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {forecasts &&
        forecasts.map((f: any) => (
          <View key={f.day} style={styles.forecast}>
            <Text style={styles.day}>{f.day}</Text>
            <WeatherDayTile f={f} />
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  day: {
    fontSize: 25,
    fontWeight: "bold",
    color: PRIMARY,
  },
  forecast: {
    flex: 1,
    alignItems: "center",
  },
});

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
