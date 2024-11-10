import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import React from "react";

interface CategoryNavigatorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryNavigator = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryNavigatorProps) => {
  const handlePress = (category: string) => {
    if (
      category === "EQUIPMENT_MAINTENANCE" ||
      category === "GENERAL_MAINTENANCE" ||
      category === "FRONT_DESK"
    ) {
      Alert.alert(
        "Under Construction",
        `${category} option is under construction.`
      );
    } else {
      setSelectedCategory(category);
    }
  };
  const getButtonClasses = (category: string) =>
    selectedCategory === category
      ? "bg-red-600  w-1/4 py-2 rounded-lg items-center justify-center"
      : "bg-gray-400  py-2 rounded-lg w-1/4 items-center justify-center";
  return (
    <View className="mx-5 h-10 justify-evenly items-center  bg-gray-100 rounded-xl flex flex-row gap-4">
      <TouchableOpacity
        onPress={() => handlePress("CLEANING")}
        className={getButtonClasses("CLEANING")}
      >
        <Text>CLEANING</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("EQUIPMENT_MAINTENANCE")}
        className={getButtonClasses("EQUIPMENT_MAINTENANCE")}
      >
        <Text>EQUIPMENT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("GENERAL_MAINTENANCE")}
        className={getButtonClasses("GENERAL_MAINTENANCE")}
      >
        <Text>GENERAL</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("FRONT_DESK")}
        className={getButtonClasses("FRONT_DESK")}
      >
        <Text>FRONT_DESK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryNavigator;
