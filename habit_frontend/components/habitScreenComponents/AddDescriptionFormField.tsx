import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
  otherStyles?: any;
  keyboardType?: any;
}

const AddDescriptionFormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-black text-xl mx-2 mt-4">{title}:</Text>
      <View className="bg-gray-200 mx-2 w-full h-12 flex flex-row px-4 rounded-2xl ">
        <TextInput
          className="flex-1 text-gray-800 "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default AddDescriptionFormField;
