import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNav";

const Dashboard = () => {
  return (
    <View className="bg-gray-200 flex-1">
      <TopNav />
      <View className="grow items-center justify-center">
        <Text>Here you will be able to see the status of your gym.</Text>
        <Text className="p-10 text-3xl text-green-700">
          Stay tuned for more!
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
