import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";

const Tasks = () => {
  return (
    <View className="flex flex-col h-full">
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <View className="flex flex-col grow">
        <View className="grow items-center justify-center">
          <Text>You will be able to manage your tasks here in the future.</Text>
          <Text className="p-10 text-3xl text-green-700">
            Stay tuned for more!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Tasks;
