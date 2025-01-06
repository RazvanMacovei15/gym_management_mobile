import { View, Text } from "react-native";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red", fontSize: 18 }}>An error occurred:</Text>
      <Text>{error.message}</Text>
    </View>
  );
}
