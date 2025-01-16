import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Task } from "@/components/types/Task";
import axios from "axios";
import { icons } from "../../../constants";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SecureStore from "expo-secure-store";
import { Directory, File, Paths } from "expo-file-system/next";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const TaskDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [files, setFiles] = useState<string[]>([]);

  const isDone = task?.status === "DONE";

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
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
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

  const downloadFile = async (file: string) => {
    try {
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/getFile",
        {
          params: { taskId: task?.taskId, fileName: file },
        }
      );

      const fileUri = `${FileSystem.documentDirectory}${file}`;

      const downloadResult = await FileSystem.downloadAsync(
        response.data,
        fileUri
      );

      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);
        alert("File downloaded successfully!");
      } else {
        alert("Permission to save files is required.");
      }
    } catch (err) {
      console.error("Failed to download file:", err);
      alert("Failed to download file.");
    }
  };

  useEffect(() => {
    fetchTaskData();
    getFiles();
  }, []);

  useEffect(() => {
    if (task) {
      getFiles();
    }
  }, [task]);

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex items-center justify-start bg-slate-900 gap-1 p-4 h-full"
    >
      <View className="flex flex-row w-full py-2 items-center justify-between mt-2">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="w-5/6 h-14  justify-center rounded-2xl pl-4"
        >
          <Ionicons name="arrow-back" size={32} color={"white"} />
        </TouchableOpacity>
        <View className="items-center justify-center">
          <BouncyCheckbox
            size={30}
            onPress={() => {
              if (!isDone) {
                markAsDone();
              }
            }}
            useBuiltInState={false}
            isChecked={isDone}
            fillColor="green"
            unFillColor="transparent"
          />
        </View>
      </View>

      <Text
        className="text-white text-3xl  w-full text-center"
        style={{ fontFamily: "Poppins-Bold" }}
      >
        {task?.title}
      </Text>
      <View className="w-full h-px bg-gray-300 mt-2" />
      <View className="w-full flex flex-col gap-2 items-start justify-between pt-1">
        <View className="flex flex-row items-center justify-start">
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-white text-base bg-slate-700 rounded-xl px-2 py-1"
          >
            Priority:
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className={`ml-2 ${
              task?.priority === "HIGH" ? "text-red-500" : "text-yellow-500"
            } text-base`}
          >
            {task?.priority}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start ">
          <Text
            className="text-white text-base bg-slate-700 rounded-xl px-2 py-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Current status:
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Light" }}
            className="ml-2 text-white text-base"
          >
            {task?.status}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start w-full ">
          <Text
            className="text-white text-base bg-slate-700 rounded-xl px-2 py-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Assignees:{" "}
          </Text>
          <Text
            className="text-white text-sm flex-shrink flex-grow flex-wrap "
            style={{ fontFamily: "Poppins-Light" }}
          >
            {" "}
            {task?.users?.map((user) => user.name).join(", ")}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start w-full ">
          <Text
            className="text-white text-base bg-slate-700 rounded-xl px-2 py-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Category:{" "}
          </Text>
          <Text
            className="text-white text-base "
            style={{ fontFamily: "Poppins-Light" }}
          >
            {"  "}
            {task?.category}
          </Text>
        </View>
        <View className="w-full flex flex-row items-center">
          <Text
            className="text-white text-base bg-slate-700 rounded-xl px-2 py-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Deadline:{" "}
          </Text>
          <Text
            className="text-white text-base"
            style={{ fontFamily: "Poppins-Light" }}
          >
            {"  "}
            {task?.deadline}
          </Text>
        </View>
      </View>
      <View className="w-full h-px bg-gray-300 mt-2" />
      <View className=" flex flex-col items-start justify-start gap-2 mt-1 w-full grow">
        <Text
          className="text-white text-base bg-slate-700 rounded-xl pl-2 py-1 "
          style={{ fontFamily: "Poppins-Bold" }}
        >
          Description:{"    "}
        </Text>
        <Text className="w-full text-gray-300 bg-slate-800 p-3 rounded-2xl grow">
          {task?.description}
        </Text>
      </View>
      <View className="w-full h-px bg-gray-300 mt-2" />
      <View className="flex flex-col gap-2 mt-2 justify-start items-start w-full">
        <Text
          className="text-white text-base bg-slate-700 rounded-xl px-2 py-1  "
          style={{ fontFamily: "Poppins-Bold" }}
        >
          Attachments:{"    "}
        </Text>
        {files.map((file, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-start w-full"
          >
            <View className="flex flex-row items-center justify-start">
              <Image
                source={icons.file as ImageSourcePropType}
                className="h-6 w-6"
                tintColor={"white"}
              />
              <Text
                className="text-white text-base ml-2"
                style={{ fontFamily: "Poppins-Light" }}
              >
                {file}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-end grow gap-7 pr-2">
              <Ionicons
                name="cloud-download-sharp"
                color="white"
                size={25}
                onPress={() => downloadFile(file)}
              />
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;
