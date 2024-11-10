import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { useAuth } from "@/app/context/AuthContext";
import { HabitDTO } from "../../../components/types/HabitDTO";
import { DailyLogDTO } from "@/components/types/DailyLogDTO";

interface DailyLogCardProps {
  dailyLogDTO: DailyLogDTO;
  isSelected: boolean;
  onSelect: () => void;
}

const DailyLogCard = ({
  dailyLogDTO,
  isSelected,
  onSelect,
}: DailyLogCardProps) => {
  const [dailyLogData, setDailyLogData] = useState<DailyLogDTO>(dailyLogDTO);

  const toggleCompleted = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://maco-coding.go.ro:8020/daily-logs/${id}/update`
      );
      setDailyLogData(response.data);
      console.log(dailyLogData);
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
          {dailyLogDTO.habitDTO.habitName}
        </Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={dailyLogDTO.isCompleted}
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
              toggleCompleted(dailyLogData.id);
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-sm">
            Date created: {dailyLogData.habitDTO.dateCreated}
            {"\n"}
            Date updated: {dailyLogData.habitDTO.lastUpdated}
            {"\n"}
            Description: {dailyLogData.habitDTO.description}
            {"\n"}
            Type: {dailyLogData.habitDTO.type}
            {"\n"}
            Occurrence: {dailyLogData.habitDTO.occurrence}
            {"\n"}
            Current streak: {dailyLogData.habitDTO.currentStreak}
            {"\n"}
            Longest streak: {dailyLogData.habitDTO.bestStreak}
            {"\n"}
            Total completions: {dailyLogData.habitDTO.totalCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DailyLogCard;
