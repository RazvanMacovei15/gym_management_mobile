import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { icons } from "../../../constants";
import { HabitDTO } from "@/app/(tabs)/habits";

interface DeleteCustomButtonProps {
  isDisabled?: boolean;
  selectedHabit: HabitDTO | null;
  onPress: () => void;
}

const DeleteCustomButon = ({
  isDisabled = true,
  selectedHabit,
  onPress,
}: DeleteCustomButtonProps) => {
  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress}>
      <Image
        source={icons.deletePNG as ImageSourcePropType}
        className={`w-10 h-10 ${isDisabled ? "opacity-30" : ""}`}
        tintColor={"black"}
      />
    </TouchableOpacity>
  );
};

export default DeleteCustomButon;
