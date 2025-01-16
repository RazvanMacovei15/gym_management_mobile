import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButon from "@/components/CustomButton";

import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { onRegister } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRegister = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      if (onRegister) {
        await onRegister(form.name, form.email, form.password, "MANAGER");

        Alert.alert("Success", "User signed up successfully");
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
          <Text className="text-pink-900 text-4xl text-center w-full mt-10 pb-20">
            SIGN UP PAGE
          </Text>
          <View className="mb-20">
            <FormField
              title="Username"
              value={form.name}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  name: e,
                })
              }
              otherStyles="mt-7"
              placeholder={""}
            />
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
              placeholder={""}
            />
          </View>

          <CustomButon
            handlePress={submitRegister}
            title={"Sign in"}
            isLoading={isSubmitting}
          />
          <View className="w-full flex flex-row justify-center items-center mt-5">
            <Text className="text-pink-900 text-xl flex flex-row pr-5">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-gray-200 text-xl">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
