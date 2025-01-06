import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import { Task } from "@/components/types/Task";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import TaskCard from "@/components/task-view/task-minicard/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // razvanmc15@gmail.com
  // manager
  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/all"
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <View className="flex flex-col h-full bg-gray-900">
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <View className="flex flex-col grow">
        <ProtectedRoute allowedRoles="ADMIN">
          <View className="grow items-center justify-start mt-4">
            {loading && <Text>Loading tasks...</Text>}
            {error && <Text>{error}</Text>}
            {tasks.map((task, index) => (
              <TaskCard key={index} task={task} index={index} />
            ))}
          </View>
        </ProtectedRoute>
      </View>
    </View>
  );
};

export default Tasks;
