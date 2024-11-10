import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";

const Goals = () => {
  return (
    <View>
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Text>Goals</Text>
    </View>
  );
};

export default Goals;
