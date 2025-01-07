import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../../../constants";

interface EditCustomButtonProps {
  onPress?: () => void;
}

const EditCustomButton = ({ onPress }: EditCustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.edit as ImageSourcePropType}
        className={`w-8 h-8 opacity-100`}
        tintColor={"white"}
      />
    </TouchableOpacity>
  );
};

export default EditCustomButton;
