import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import AddHabitFormField from "../habitScreenComponents/AddHabitFormField";
import CustomDropdown from "../CustomDropdown";
import AddDescriptionFormField from "../habitScreenComponents/AddDescriptionFormField";
import axios from "axios";
import { TaskForm } from "@/components/types/TaskForm";

interface AddHabitModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  taskForm: TaskForm;
  setTaskForm: (value: any) => void;
  handleCreateHabit: () => void;
}

const AddHabitModal = ({
  modalVisible,
  setModalVisible,
  taskForm,
  setTaskForm,
  handleCreateHabit,
}: AddHabitModalProps) => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async (endpoint: string) => {
    setError(null);
    try {
      const response = await axios.get(endpoint);
      setCategories(response.data);
      console.log("Categories: ", response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchCategories("http://maco-coding.go.ro:8020/api/enum/category");
  }, []);
  return (
    <>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        hasBackdrop={true}
        backdropColor="black"
        statusBarTranslucent={false}
        backdropOpacity={0.4}
        backdropTransitionInTiming={25}
        backdropTransitionOutTiming={25}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
      >
        <View className="border-2  mx-2 p-2 bg-white items-center justify-evenly flex flex-col shadow-2xl shadow-slate-900 rounded-2xl">
          <CustomDropdown
            data={categories}
            title="type:"
            onSelectValue={(e: string) =>
              setTaskForm({
                ...taskForm,
                category: e,
              })
            }
          />

          <View className="flex flex-row w-full justify-between m-5">
            <Pressable
              onPress={() => handleCreateHabit()}
              className="items-center justify-center bg-green-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white">SAVE</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="items-center justify-center bg-red-700 w-1/2 h-10 rounded-xl"
            >
              <Text className="text-md text-white">CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddHabitModal;
