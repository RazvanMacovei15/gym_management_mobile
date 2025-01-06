import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from "react-native";
import { icons } from "../../constants";

interface TopNavProps {
  onPress?: () => void;
}

const TopNav = ({ onPress }: TopNavProps) => {
  return (
    <View className="flex flex-row justify-around mt-12 pb-4 rounded-b-3xl items-center">
      <TouchableOpacity className="justify-center items-center w-1/4">
        <Image
          source={
            icons.user_circle || require("../../assets/icons/user_circle.png")
          }
          className="h-14 w-14"
        />
      </TouchableOpacity>
      <TouchableOpacity className="flex flex-col w-2/4 items-center justify-center">
        <Text className="text-4xl rounded-lg p-2 font-medium text-center">
          GYM
        </Text>
        <Text className="text-center text-xs text-black w-full">
          That which you don't track{"\n"} You can't improve
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="items-center justify-center w-1/4"
        onPress={onPress}
      >
        <Image
          source={
            icons.notification || require("../../assets/icons/notification.png")
          }
          className="h-8 w-8"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopNav;
