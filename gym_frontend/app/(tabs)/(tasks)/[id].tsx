import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Task } from "@/components/types/Task";
import axios from "axios";
import { set } from "date-fns";

const TaskDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);

  const markAsDone = async () => {
    try {
      await axios.patch(
        "http://maco-coding.go.ro:8010/tasks/updateStatus",
        null,
        {
          params: {
            id: task?.taskId,
            status: "DONE",
          },
        }
      );
      fetchTaskData();
    } catch (err) {
      console.error("Failed to mark task as done:", err);
    }
  };

  const fetchTaskData = async () => {
    const response = await axios.get(
      "http://maco-coding.go.ro:8010/tasks/get",
      {
        params: { id },
      }
    );
    setTask(response.data);
  };
  useEffect(() => {
    fetchTaskData();
  }, []);

  return (
    <View className="flex-1 items-center justify-start bg-slate-900 gap-1 p-4">
      <Text className="text-white text-3xl font-bold w-full">
        Title: {task?.title}
      </Text>
      <View className="w-full h-px bg-gray-300 mt-2" />
      <View className="w-full flex flex-row">
        <Text className="text-white text-sm font-bold">Priority: </Text>
        <Text
          className={`${
            task?.priority === "High" ? "text-red-500" : "text-yellow-500"
          }`}
        >
          {task?.priority}
        </Text>
      </View>
      <View className="w-full flex flex-row">
        <Text className="text-white text-sm font-bold">Assignees: </Text>
        <Text className="text-white text-sm">
          {task?.users?.map((user) => user.name).join(", ")}
        </Text>
      </View>
      <View className="w-full flex flex-row">
        <Text className="text-white text-sm font-bold">Category: </Text>
        <Text className="text-white text-sm">{task?.category}</Text>
      </View>
      <View className="w-full h-px bg-gray-300 mt-2" />
      <View className="w-full flex flex-col gap-2 mt-2 grow">
        <View className="w-full flex flex-row">
          <Text className="text-white text-xl font-bold">Current status: </Text>
          <Text className="text-white text-xl">{task?.status}</Text>
        </View>
        <View className="w-full flex flex-row">
          <Text className="text-white text-xl font-bold">Deadline: </Text>
          <Text className="text-white text-xl">{task?.deadline}</Text>
        </View>
        <Text className="text-white text-xl w-full font-bold">
          Description:{" "}
        </Text>
        <Text className="text-gray-300 w-full grow bg-slate-800 p-2 rounded-2xl h-1/2">
          {task?.description}
        </Text>
      </View>
      <View className="w-full h-px bg-gray-300 mt-2 " />
      <View className="flex flex-row p-2 w-full items-center justify-between mt-2">
        <Button title="Mark as done" onPress={markAsDone} />
        <Button title="Back" onPress={() => router.push("/(tabs)")} />
      </View>
    </View>
  );
};

export default TaskDetailsScreen;
