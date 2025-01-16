import { View, Text } from "react-native";
import React from "react";
import CustomButon from "@/components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

const More = () => {
  const { onLogout } = useAuth();

  const logout = async () => {
    if (onLogout) {
      try {
        await onLogout(); // Await logout to complete

        // Navigate to Sign-In screen after logout
        router.push("/sign-in");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <View className="flex flex-col h-full bg-slate-900">
      <View className="grow items-center justify-center"></View>
      <View className="p-2">
        <CustomButon handlePress={logout} title={"Log out"} />
      </View>
    </View>
  );
};

export default More;
