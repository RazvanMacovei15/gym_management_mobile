import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
  otherStyles?: any;
  keyboardType?: any;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={"space-y-2 ${otherStyles} mt-5"}>
      <Text className="text-yellow-300 text-3xl">{title}:</Text>
      <View className="bg-gray-700 w-full h-16 flex flex-row px-4 rounded-2xl items-center">
        <TextInput
          className="flex-1 text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                !showPassword
                  ? (icons.eyeHide as ImageSourcePropType)
                  : (icons.eye as ImageSourcePropType)
              }
              className="w-8 h-8"
              resizeMode="contain"
              tintColor={"yellow"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
