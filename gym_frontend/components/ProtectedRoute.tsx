import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { User } from "./types/User";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles: User["role"];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const router = useRouter();

  const currentUser = authState?.currentUser;

  if (currentUser === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (currentUser === null) {
    router.push("/no-user");
    return null;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    router.push("/unauthorized");
    return null;
  }

  return children;
};

export default ProtectedRoute;
