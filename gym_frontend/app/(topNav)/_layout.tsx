import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";

const TopNavLayout = () => {
  return (
    <View>
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </View>
  );
};

export default TopNavLayout;
