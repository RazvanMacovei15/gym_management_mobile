import React, { useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from "react-native";
import { icons } from "../../constants";
import * as Font from "expo-font";
import { useAuth } from "@/app/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TopNavProps {
  onPress?: () => void;
}

const TopNav = ({ onPress }: TopNavProps) => {
  const { profilePhoto, fetchProfilePhoto } = useAuth();

  useEffect(() => {
    if (fetchProfilePhoto) {
      fetchProfilePhoto();
    }
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex flex-row justify-around pb-4 rounded-b-3xl items-center pt-5">
      <TouchableOpacity className="justify-center items-center w-1/4">
        <Image
          resizeMode="cover"
          source={{ uri: profilePhoto }}
          className="w-12 h-12 rounded-full"
        />
      </TouchableOpacity>
      <TouchableOpacity className="flex flex-col w-2/4 items-center justify-center">
        {/* <Text
          className="text-5xl rounded-lg p-2 font-medium text-center text-[#9d174d]"
          style={{ fontFamily: "Poppins-Bold" }}
        >
          GYM
        </Text> */}
        <Image
          resizeMode="cover"
          source={{
            uri: "https://i.pinimg.com/736x/3f/c8/12/3fc81274aef4fce9c012ec53d8918d29.jpg",
          }}
          className="w-20 h-20 rounded-full"
        />
        <Text
          className="text-center text-xs text-[#9d174d] w-full pt-2"
          style={{ fontFamily: "Poppins-Bold" }}
        >
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

const styles = StyleSheet.create({
  profileImage: {
    height: 56, // 14 * 4
    width: 56,
    borderRadius: 28,
  },
});

export default TopNav;
