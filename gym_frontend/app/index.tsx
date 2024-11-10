import { Text, View, StyleSheet, ScrollView } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButon from "@/components/CustomButton";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

export default function App() {
  const { authState } = useAuth();

  useEffect(() => {
    // If user is authenticated, navigate to the dashboard
    if (authState?.authenticated) {
      router.push("/dashboard");
    }
  }, [authState, router]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center px-4 h-full justify-center">
          {!authState?.authenticated ? (
            <CustomButon
              title="SIGN IN"
              handlePress={() => router.push("/sign-in")}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
