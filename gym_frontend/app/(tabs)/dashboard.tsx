import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNav";

const Dashboard = () => {
  return (
    <View className="bg-slate-900 flex-1">
      <TopNav />
      <View className="grow items-center justify-center ">
        <Text className="text-[#9d174d]">
          Here you will be able to see the status of your gym.
        </Text>
        <Text className="p-10 text-3xl text-[#9d174d]">
          Stay tuned for more!
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
