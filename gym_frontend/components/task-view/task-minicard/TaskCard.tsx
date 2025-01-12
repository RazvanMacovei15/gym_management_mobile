import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Task } from "@/components/types/Task";
import EditCustomButton from "../crudButtons/EditCustomButton";
import DeleteCustomButon from "../crudButtons/DeleteCustomButton";
import { router } from "expo-router";

type TaskCardProps = {
  task: Task;
  index: number;
  onPress?: () => void;
  onDelete?: (taskId: number) => void;
};

const TaskCard = ({ task, index, onPress, onDelete }: TaskCardProps) => {
  const [extended, setExtended] = useState<boolean>(false);

  return (
    <View className="w-full flex items-center justify-center m-1">
      <TouchableOpacity
        className={`flex flex-row items-center justify-between w-full bg-pink-950 px-5 ${
          extended ? "rounded-t-xl" : "rounded-xl"
        } h-12`}
        onPress={() => setExtended(!extended)}
      >
        <Text
          className="text-white text-base flex-shrink flex-grow flex-wrap w-3/5"
          style={{ fontFamily: "Poppins-Light" }}
        >
          {index + 1}. {task.title}
        </Text>
        <Text className="text-white">{task.status}</Text>
      </TouchableOpacity>
      {extended && (
        <View className="flex flex-col items-start justify-center w-full p-4 gap-2 bg-pink-950 rounded-b-xl">
          <View className="w-full h-px bg-gray-300 mb-2 -mt-4 " />
          <View className="flex flex-row">
            <View className="flex flex-col gap-2 justify-around grow">
              <Text className="text-white">Tag: {task.category}</Text>
              <Text className="text-white">Deadline: {task.deadline}</Text>
              <Text className="text-white">Priority: {task.priority}</Text>
            </View>

            <View className="flex flex-col gap-5 pr-5 w-8">
              <EditCustomButton onPress={onPress} />
              <DeleteCustomButon
                onPress={() => onDelete && onDelete(task.taskId)}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default TaskCard;
