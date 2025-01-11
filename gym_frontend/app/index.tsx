import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButon from "@/components/CustomButton";
import { useAuth } from "./context/AuthContext";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function App() {
  const { authState } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Navigate based on authentication state
      if (authState?.authenticated) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [authState]);

  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../../gym_frontend/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../gym_frontend/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("../../gym_frontend/assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("../../gym_frontend/assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text className="mt-10">Alpha Version 1.0</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center px-4 h-full justify-center"></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
