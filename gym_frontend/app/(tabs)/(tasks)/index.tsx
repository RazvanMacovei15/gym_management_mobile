import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import { Task } from "@/components/types/Task";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import TaskCard from "@/components/task-view/task-minicard/TaskCard";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import { Gym } from "@/components/types/Gym";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Tasks = () => {
  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { authState } = useAuth();

  const userId = authState?.currentUser?.id;

  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/manager",
        {
          params: { userId },
        }
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete("http://maco-coding.go.ro:8010/tasks/delete", {
        params: { id: taskId },
      });
      fetchTasksData();
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <SafeAreaView className="flex flex-col h-full bg-slate-900">
      <TopNav onPress={() => console.log("TopNav pressed")} />
      <ScrollView>
        <View className="flex flex-col grow">
          <ProtectedRoute allowedRoles="MANAGER">
            <View className="grow items-center justify-start mt-2 p-2">
              {loading && <Text>Loading tasks...</Text>}
              {error && <Text>{error}</Text>}
              {tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  index={index}
                  onDelete={deleteTask}
                  onPress={() => router.push(`/(tabs)/(tasks)/${task.taskId}`)}
                />
              ))}
            </View>
          </ProtectedRoute>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tasks;
