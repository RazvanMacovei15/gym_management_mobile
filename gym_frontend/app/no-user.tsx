import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const NoUserPage = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No user is logged in. Please log in to continue.</Text>
      <Button title="Go to Login" onPress={() => router.push("/sign-in")} />
    </View>
  );
};

export default NoUserPage;
