import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";

const Dashboard = () => {
  return (
    <View className="bg-gray-200 flex-1">
      <TopNav onPress={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </View>
  );
};

export default Dashboard;
