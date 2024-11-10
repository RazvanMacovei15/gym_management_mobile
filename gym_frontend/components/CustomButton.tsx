import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../constants";

interface SigninButtonProps {
  handlePress: () => void;
  title: string;
  isLoading?: boolean;
}
const CustomButon = ({ handlePress, title, isLoading }: SigninButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className="items-center justify-center"
    >
      <Text
        className={
          "bg-yellow-400 text-black p-5 w-full text-center rounded-xl text-2xl"
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButon;
