import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { TaskRequestDTO } from "@/components/types/TaskRequestDTO";

interface TaskRequestCardProps {
  taskRequestDTO: TaskRequestDTO;
  isSelected: boolean;
  onSelect: () => void;
}

const TaskRequestCard = ({
  taskRequestDTO,
  isSelected,
  onSelect,
}: TaskRequestCardProps) => {
  const [taskData, setTaskData] = useState<TaskRequestDTO>(taskRequestDTO);

  const toggleCompleted = async () => {
    console.log("Toggling completed status");
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
          {taskRequestDTO.taskDTO.description}
        </Text>
        <View>
          <BouncyCheckBox
            size={35}
            isChecked={false}
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
              toggleCompleted();
            }}
          ></BouncyCheckBox>
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View className="bg-gray-200 -mt-4 pt-4 -z-40 rounded-b-xl justify-start p-5">
          <Text className="text-gray-800 text-sm">TASK INFO WILL BE HERE</Text>
        </View>
      )}
    </View>
  );
};

export default TaskRequestCard;
