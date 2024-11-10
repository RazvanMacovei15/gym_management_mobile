import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { useAuth } from "@/app/context/AuthContext";
import { HabitDTO } from "../../components/types/HabitDTO";

interface HabitCard {
  habit: HabitDTO;
  isSelected: boolean;
  onSelect: () => void;
}

const HabitCard = ({ habit, isSelected, onSelect }: HabitCard) => {
  const [habitData, setHabitData] = useState<HabitDTO>(habit);

  const { authState } = useAuth();
  const token = authState?.token;

  const toggleCompleted = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://maco-coding.go.ro:8020/habits/${id}/update`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabitData(response.data);
      console.log(habitData);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handlePress = () => {
    onSelect();
  };

  return (
    <View
      className={`gap-2 rounded-xl border-2 
        ${isSelected ? "border-red-500" : "border-transparent"}`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={
          "bg-white rounded-xl p-2 flex-row justify-between items-center h-14"
        }
      >
        <Text className="text-start text-2xl text-black w-5/6">
          {habit.habitName}
        </Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={true}
            fillColor="red"
            unFillColor="#FFFFFF"
            disableText={true}
            iconStyle={{
              borderColor: "purple",
            }}
            innerIconStyle={{
              borderWidth: 2,
            }}
            textStyle={{
              fontFamily: "JosefinSans-Regular",
            }}
            onPress={() => {
              toggleCompleted(habitData.id);
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-sm">
            Date created: {habitData.dateCreated}
            {"\n"}
            Date updated: {habitData.lastUpdated}
            {"\n"}
            Description: {habitData.description}
            {"\n"}
            Type: {habitData.type}
            {"\n"}
            Occurrence: {habitData.occurrence}
            {"\n"}
            Current streak: {habitData.currentStreak}
            {"\n"}
            Longest streak: {habitData.bestStreak}
            {"\n"}
            Total completions: {habitData.totalCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HabitCard;
