import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";

import { TaskRequestDTO } from "@/components/types/TaskRequestDTO";
import TaskRequestCard from "../logCards/TaskRequestCard";

interface TasksScrollViewProps {
  selectedTask: TaskRequestDTO | null;
  onSelect: (task: TaskRequestDTO | null) => void;
  data: TaskRequestDTO[];
  error: any;
  loading: boolean;
}

const TaskScrollView = ({
  selectedTask,
  onSelect,
  data,
  error,
  loading,
}: TasksScrollViewProps) => {
  if (loading) {
    return (
      <View className="grow items-center justify-center">
        <Text className="text-red-600 text-3xl">Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <Text className="grow items-center justify-center">Error: {error}</Text>
    );
  }
  return (
    <ScrollView className="h-1/2 px-2 bg-gray-100 mt-2">
      <View className=" gap-2 justify-start flex-col">
        {data.map((taskRequestDTO) => (
          <TaskRequestCard
            key={taskRequestDTO.taskDTO.id}
            taskRequestDTO={taskRequestDTO}
            isSelected={taskRequestDTO === taskRequestDTO}
            onSelect={() => {
              onSelect(selectedTask === taskRequestDTO ? null : taskRequestDTO);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default TaskScrollView;
