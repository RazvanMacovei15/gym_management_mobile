import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "../app/context/AuthContext";
import { PropsWithChildren } from "react";
import { User } from "./types/User";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles: User["role"];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const currentUser = authState?.currentUser;

  // Show a loading screen while the user is being verified
  if (currentUser === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Show a message if no user is logged in
  if (currentUser === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>
          No user is logged in. Please sign in to continue.
        </Text>
      </View>
    );
  }

  // Show a message if the user is not authorized
  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "orange", fontSize: 18 }}>
          You are not authorized to view this content.
        </Text>
      </View>
    );
  }

  // Render the child components if the user is authorized
  return children;
};

export default ProtectedRoute;
