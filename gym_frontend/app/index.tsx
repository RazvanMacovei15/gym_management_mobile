import { Text, View, StyleSheet, ScrollView } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButon from "@/components/CustomButton";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center px-4 h-full justify-center">
          <Text className="text-3xl font-bold text-center mt-10">
            Welcome to {"\n"} Gym Management App
          </Text>
          <Text className="text-center mt-5 mb-10">
            This is a gym app that helps you to keep track all your gym tasks
            and activities.
          </Text>
          <CustomButon
            title="GO TO DASHBOARD"
            handlePress={() => router.push("/dashboard")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
