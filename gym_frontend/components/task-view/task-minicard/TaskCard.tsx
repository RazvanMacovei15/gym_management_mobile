import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Task } from "@/components/types/Task";
import EditCustomButton from "../crudButtons/EditCustomButton";
import DeleteCustomButon from "../crudButtons/DeleteCustomButton";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
import icons from "@/constants/icons";
import { ImageSourcePropType } from "react-native";

type TaskCardProps = {
  task: Task;
  index: number;
  onPress?: () => void;
  onDelete?: (taskId: number) => void;
  updateList?: () => void;
};

const TaskCard = ({ task, index, onPress, onDelete, updateList }: TaskCardProps) => {
  const [extended, setExtended] = useState<boolean>(false);
  const isDone = task.status === "DONE";

  const [files, setFiles] = useState<string[]>([]);
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
      updateList && updateList();
    } catch (err) {
      console.error("Failed to mark task  as done :", err);
    }
  };

  const getFiles = async () => {
    try {
      if (!task) return;

      const taskId = task?.taskId;
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/getFiles",
        {
          params: { taskId: taskId },
        }
      );
      console.log("Files:", response.data);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <View className="w-full flex items-center justify-center m-1">
      <TouchableOpacity
        className={`flex flex-row items-center justify-between w-full bg-pink-950 px-5 ${
          extended ? "rounded-t-xl" : "rounded-xl"
        } py-1`}
        onPress={() => setExtended(!extended)}
      >
        <View className="flex flex col">
          <View className="flex flex-row items-center justify-center">
            <View className=" w-[30] mr-2">
              <BouncyCheckbox
                    size={30}
                    disableText={true}
                    onPress={() => {
                      if (!isDone) {
                        markAsDone();
                        
                      }
                    }}
                    iconStyle={{ shadowColor: "black" }}
                    innerIconStyle={{ borderColor: "black", borderWidth: 1.5 }}
                    useBuiltInState={false}
                    isChecked={isDone}
                    fillColor="green"
                    unFillColor="transparent"
                  />
            </View>    
            <Text
              className="text-white text-base flex-shrink flex-wrap w-3/6 px-1"
              style={{ fontFamily: "Poppins-Light" }}
            >
              {task.title}
            </Text>
            <View className={`h-2/4 w-px bg-gray-300 my-2 mr-2 items-center justify-center`} />

            <Text
              className={`rounded-xl pl-1 text-white w-2/6 text-center ${
                task.status === "DONE"
                  ? "bg-green-500"
                  : task.status === "CANCELLED"
                  ? "bg-red-500"
                  : task.status === "BACKLOG"
                  ? "bg-gray-500"
                  : task.status === "TO_DO"
                  ? "bg-yellow-500"
                  : task.status === "IN_PROGRESS"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              {task.status}
            </Text>
          </View>
          <View className="w-full felx flex-row items-center justify-start gap-2">
          {files.length > 0 && files.map((file, index) => (
              <View key={index} className="flex flex-row items-center justify-start py-2 pl-1">
                  <Image
                    source={icons.file as ImageSourcePropType}
                    className="h-6 w-6"
                    tintColor={"white"}
                  />
              </View>
            ))}
          </View>
            
        </View>
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
