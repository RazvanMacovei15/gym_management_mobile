import { View, Text } from "react-native";

const UnauthorizedPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>You are not authorized to access this page.</Text>
    </View>
  );
};

export default UnauthorizedPage;
