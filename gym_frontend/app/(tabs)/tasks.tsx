import { View, Text } from "react-native";
import { TaskRequestDTO } from "@/components/types/TaskRequestDTO"; // Adjust the import path as necessary
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNavigation/topNav";
import DeleteCustomButton from "@/components/habitScreenComponents/crudButtons/DeleteCustomButton";
import PlusCustomButton from "@/components/habitScreenComponents/crudButtons/PlusCustomButton";
import EditCustomButton from "@/components/habitScreenComponents/crudButtons/EditCustomButton";
import axios from "axios";
import AddHabitModal from "@/components/modals/AddHabitModal";
import CategoryNavigator from "@/components/navigation/CategoryNavigator";
import TaskScrollView from "@/components/habitScreenComponents/scrollViews/TaskScrollView";

const Tasks = () => {
  const [error, setError] = useState(null);

  const initialTaskFormState = {
    category: "",
  };
  const [taskForm, setTaskForm] = useState(initialTaskFormState);

  const [selectedCategory, setSelectedCategory] = useState("CLEANING");
  const [selectedTask, setSelectedTask] = useState<TaskRequestDTO | null>(null);
  const isSelected = selectedTask !== null; // Check if a habit is selected

  const handleSelectTask = (taskRequestDTO: TaskRequestDTO | null) => {
    setSelectedTask(taskRequestDTO);
    if (taskRequestDTO) {
      // Update habitForm with the selected habit's attributes
      setTaskForm({
        category: taskRequestDTO.taskDTO.category,
      });
    } else {
      // Reset habitForm to the initial state if no habit is selected
      setTaskForm(initialTaskFormState);
    }
  };

  const [data, setData] = useState<TaskRequestDTO[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchData = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      console.log("Data fetched");
    }
  };

  const doNothing = () => {};

  return (
    <View className="flex flex-col justify-strech h-full">
      <TopNav onPress={doNothing} />
      <View className=" flex-col flex grow bg-gray-100">
        <CategoryNavigator
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Text className="h-10 text-center align-middle">
          {"<---            "} Day by day navigation here {"             --->"}
        </Text>
        <TaskScrollView
          loading={false}
          error={error}
          data={data}
          selectedTask={selectedTask}
          onSelect={doNothing}
        />
      </View>
      <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
        <EditCustomButton
          isDisabled={!isSelected}
          onPress={() => {
            setEditModalVisible(true);
            handleSelectTask(selectedTask);
          }}
        />
        <PlusCustomButton
          onPress={() => {
            setModalVisible(true);
            setTaskForm(initialTaskFormState);
          }}
        />
        <DeleteCustomButton
          isDisabled={!isSelected}
          selectedHabit={selectedTask}
          onPress={() => {
            console.log("Delete button pressed");
          }}
        />
      </View>
    </View>
  );
};

export default Tasks;
