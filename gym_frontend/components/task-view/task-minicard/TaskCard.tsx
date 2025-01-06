import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Task } from "@/components/types/Task";

type TaskCardProps = {
  task: Task;
  index: number;
};

const TaskCard = ({ task, index }: TaskCardProps) => {
  const [extended, setExtended] = useState<boolean>(false);
  return (
    <View className="w-full flex items-center justify-center m-1">
      <TouchableOpacity
        className={`flex flex-row items-center justify-between w-full bg-pink-950 px-5 ${
          extended ? "rounded-t-xl" : "rounded-xl"
        } h-12`}
        onPress={() => setExtended(!extended)}
      >
        <Text className="text-xl text-start text-white">
          {index + 1}. {task.title.toUpperCase()}
        </Text>
        <Text className="text-white">{task.status}</Text>
      </TouchableOpacity>
      {extended && (
        <View className="flex flex-col items-start justify-start w-full p-4 gap-1 bg-pink-950 rounded-b-xl">
          <View className="w-full h-px bg-gray-300 mb-2 -mt-4" />
          <Text className="text-white">Tag: {task.category}</Text>
          <Text className="text-white">Deadline: {task.deadline}</Text>
          <Text className="text-white">Priority: {task.priority}</Text>
        </View>
      )}
    </View>
  );
};

export default TaskCard;
