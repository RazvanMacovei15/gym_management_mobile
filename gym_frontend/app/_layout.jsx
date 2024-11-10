import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { Slot, Stack } from "expo-router";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(topNav)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="search/[query]" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RootLayout;
