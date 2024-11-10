import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";

const Goals = () => {
  return (
    <View className="items-center justify-center">
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Text className="bg-blue-300 text-3xl p-2 rounded-xl">
        Reception INFO HERE
      </Text>
    </View>
  );
};

export default Goals;
