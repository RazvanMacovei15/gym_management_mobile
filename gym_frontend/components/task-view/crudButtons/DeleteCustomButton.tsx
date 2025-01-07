import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../../../constants";

interface DeleteCustomButtonProps {
  onPress: () => void;
}

const DeleteCustomButon = ({ onPress }: DeleteCustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.deletePNG as ImageSourcePropType}
        className={`w-8 h-8 opacity-100 justify-center items-center`}
        tintColor={"#e11d48"}
      />
    </TouchableOpacity>
  );
};

export default DeleteCustomButon;
