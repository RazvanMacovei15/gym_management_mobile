import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { ErrorBoundary, Slot, Stack } from "expo-router";
import { AuthProvider } from "../app/context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { ModalProvider } from "../app/context/ModalContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';


const RootLayout = () => {
  return (
    <SafeAreaProvider>
<AuthProvider>
      <ModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ModalProvider>
      
    </AuthProvider>
    </SafeAreaProvider>

    
  );
};

export default RootLayout;
