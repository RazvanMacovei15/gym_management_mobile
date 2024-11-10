import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButon from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const { onLogin, onRegister } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      if (onLogin) {
        await onLogin(form.email, form.password);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/dashboard");
      } else {
        Alert.alert("Error", "Login function is not available");
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <SafeAreaView className="bg-gray-800 h-full p-5">
      <ScrollView>
        <View className="w-full min-h-[85vh] flex flex-col">
          <Text className="text-yellow-400 text-4xl text-center w-full mt-10 pb-20">
            SIGN IN PAGE
          </Text>
          <View className="mb-20">
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  email: e,
                })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={""}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={""}
            />
          </View>

          <CustomButon
            handlePress={submitLogin}
            title={"Sign in"}
            isLoading={isSubmitting}
          />
          <View className="w-full flex flex-row justify-center items-center mt-5">
            <Text className="text-yellow-400 text-xl flex flex-row pr-5">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-gray-200 text-xl">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
