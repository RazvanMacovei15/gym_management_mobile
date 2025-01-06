import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import { Task } from "@/components/types/Task";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/all"
      );
      setTasks(response.data);
      console.log("Tasks from API:", response.data);
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
    <View className="flex flex-col h-full">
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <View className="flex flex-col grow">
        <ProtectedRoute allowedRoles="ADMIN">
          <View className="grow items-center justify-center">
            <Text>
              You will be able to manage your tasks here in the future.
            </Text>
            <Text className="p-10 text-3xl text-green-700">
              Stay tuned for more!
            </Text>
          </View>
        </ProtectedRoute>
      </View>
    </View>
  );
};

export default Tasks;
