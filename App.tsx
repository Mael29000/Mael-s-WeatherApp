import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { ActivityIndicator } from "react-native";
import CurrentWeather from "./src/components/CurrentWeather";
import Forecast from "./src/components/Forecast";
import { BACKGROUND } from "./src/styles/colors/weatherDisplayColors";

const API_URL = (lat: number, lon: number) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0427e15d3a56f62e4f18a98fa80b0bde&lang=fr&units=metric`;

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
      const location: LocationObject = await getCurrentPositionAsync();
      getWeather(location);
    };
    getLocation();
  }, []);

  const getWeather = async (location: LocationObject) => {
    try {
      const response = await fetch(
        API_URL(location?.coords.latitude, location?.coords.longitude)
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <CurrentWeather data={data} />
          <Forecast data={data} />
        </>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
});
