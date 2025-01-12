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
import { User } from "@/components/types/User";

// Constants
const TOKEN_KEY = "my-jwt-token";
const USER_KEY = "user-data";
const PROFILE_PHOTO_KEY = "profile-photo";
export const API_URL = "http://maco-coding.go.ro:8010/";

// Define the AuthContext type
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    currentUser?: User | null;
  };
  onRegister?: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  fetchProfilePhoto?: () => Promise<void>;
  profilePhoto?: string;
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

  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const fetchProfilePhoto = async () => {
    try {
      const result = await axios.get(
        `http://maco-coding.go.ro:8010/minio/generate-url`
      );
      setProfilePhoto(result.data);
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  // Authentication state
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    currentUser?: User | null;
  }>({
    token: null,
    authenticated: null,
    currentUser: null,
  });

  // Load token from secure storage on app load
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStorage.getItemAsync(TOKEN_KEY);

        if (!token) {
          console.log("No token found, logging out...");
          await onLogout();
          return;
        }

        console.log("Token found, verifying...");

        // Validate token with backend
        const response = await axios.get(
          `http://maco-coding.go.ro:8010/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set authentication state
        setAuthState({
          token,
          authenticated: true,
          currentUser: response.data.user,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch profile photo
        await fetchProfilePhoto();
      } catch (error) {
        console.error("Error verifying token or fetching user data:", error);

        // If token is invalid, log out the user
        await onLogout();
      }
    };

    loadToken();
  }, []);

  // onRegister function
  const onRegister = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      console.log(name);
      console.log(email);

      const result = await axios.post(`${API_URL}auth/signup`, {
        name,
        email,
        password,
        role,
      });

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
      const result = await axios.post(`${API_URL}auth/login`, {
        email,
        password,
      });

      setProfilePhoto(result.data.preSignedUrl);

      setAuthState({
        token: result.data.token,
        authenticated: true,
        currentUser: result.data.user,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStorage.setItemAsync(
        PROFILE_PHOTO_KEY,
        result.data.preSignedUrl
      );
      await SecureStorage.setItemAsync(
        USER_KEY,
        JSON.stringify(result.data.user)
      );

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
    await SecureStorage.deleteItemAsync("USER_KEY");
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
      currentUser: null,
    });
    router.push("/sign-in");
  };

  // Define the context value
  const contextValue = {
    authState,
    onRegister,
    onLogin,
    onLogout,
    fetchProfilePhoto,
    profilePhoto,
  };

  // Return the AuthProvider with the context value
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
