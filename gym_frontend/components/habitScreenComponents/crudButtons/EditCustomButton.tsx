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
  isDisabled?: boolean;
  onPress?: () => void;
}

const EditCustomButton = ({
  isDisabled = true,
  onPress,
}: EditCustomButtonProps) => {
  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress}>
      <Image
        source={icons.edit as ImageSourcePropType}
        className={`w-10 h-10 ${isDisabled ? "opacity-30" : ""}`}
        tintColor={"black"}
      />
    </TouchableOpacity>
  );
};

export default EditCustomButton;
