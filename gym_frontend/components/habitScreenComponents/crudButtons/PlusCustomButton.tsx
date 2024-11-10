import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../../../constants";

interface PlusCustomButtonProps {
  onPress: () => void;
}

const PlusCustomButton = ({ onPress }: PlusCustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.plus as ImageSourcePropType}
        tintColor={"black"}
        resizeMode="contain"
        className="w-18 h-18"
      />
    </TouchableOpacity>
  );
};

export default PlusCustomButton;
