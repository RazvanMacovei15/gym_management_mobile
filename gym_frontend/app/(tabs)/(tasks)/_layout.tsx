import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TasksLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{
            title: `Task Details`,
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default TasksLayout;
