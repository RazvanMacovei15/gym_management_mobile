import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
}

const AddHabitFormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
}: FormFieldProps) => {
  return (
    <View className="">
      <Text className="text-black text-xl mx-2 my-1">{title}:</Text>
      <View className="bg-gray-300 mx-2 w-full h-12 flex flex-row px-4 rounded-2xl items-center">
        <TextInput
          className="flex-1 text-gray-800"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default AddHabitFormField;
