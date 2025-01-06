import React, {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { useRouter } from "expo-router";

// Constants
const TOKEN_KEY = "my-jwt-token";
export const API_URL = "http://maco-coding.go.ro:8010/";

// Define the AuthContext type
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

// Create the AuthContext
const AuthContext = createContext<AuthProps>({});

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  // Authentication state
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  // Load token from secure storage on app load
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  // onRegister function
  const onRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      console.log(username);
      console.log(email);

      const result = await axios.post(`${API_URL}auth/signup`, {
        username,
        email,
        password,
      });

      console.log(result);

      if (result.status === 200 || result.status === 201) {
        const loginResult = await onLogin?.(email, password);

        if (loginResult && "error" in loginResult) {
          console.error("Login after registration failed:", loginResult.msg);
          return {
            error: true,
            msg: "Registration succeeded but login failed. Please try logging in.",
          };
        }
        return loginResult;
      }

      return result;
    } catch (error) {
      console.error(error);

      const errorMsg =
        (error as any)?.response?.data?.msg || "An unexpected error occurred.";
      return {
        error: true,
        msg: errorMsg,
      };
    }
  };

  // onLogin function
  const onLogin = async (email: string, password: string) => {
    try {
      console.log(email);
      console.log(password);

      const result = await axios.post(`${API_URL}auth/login`, {
        email,
        password,
      });

      console.log(result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (error) {
      console.error(error);

      const errorMsg =
        (error as any)?.response?.data?.msg || "An unexpected error occurred.";
      return {
        error: true,
        msg: errorMsg,
      };
    }
  };

  // onLogout function
  const onLogout = async () => {
    await SecureStorage.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
    router.push("/sign-in");
  };

  // Define the context value
  const contextValue = {
    authState,
    onRegister,
    onLogin,
    onLogout,
  };

  // Return the AuthProvider with the context value
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
