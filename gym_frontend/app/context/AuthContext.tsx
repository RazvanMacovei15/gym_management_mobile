// Import necessary libraries and modules
import * as SecureStorage from "expo-secure-store"; // Secure storage for storing sensitive information
import axios from "axios"; // HTTP client for making API requests
import { createContext, useContext, useEffect, useState } from "react"; // React hooks and context for state management
import { router } from "expo-router";

// Define the shape of the authentication properties that will be available in the context
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  }; // Token and authentication state
  onRegister?: (
    // Function for registering a new user
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>; // Function for logging in a user
  onLogout?: () => Promise<any>; // Function for logging out a user
}

// Constants
const TOKEN_KEY = "my-jwt-token"; // Key used to store JWT token in secure storage
export const API_URL = "http://maco-coding.go.ro:8020/"; // Base URL for the API

// Create the authentication context
const AuthContext = createContext<AuthProps>({});

// Custom hook to access authentication context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication Provider component to wrap around components that need access to authentication context
export const AuthProvider = ({ children }: any) => {
  // Define the state to store the authentication information
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null, // Initial token is null
    authenticated: null, // Initial authentication state is null
  });

  // Effect to load the token from secure storage and set it in the state
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY); // Retrieve token from secure storage

      if (token) {
        // If token exists, update authentication state
        setAuthState({
          token,
          authenticated: true,
        });
        // Set the token in axios headers for all future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  // Function to handle user registration
  const onRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      // Send POST request to the registration endpoint
      return await axios.post(`${API_URL}auth/login`, {
        username,
        email,
        password,
      });
    } catch (error) {
      // Return error message if registration fails
      return {
        error: true,
        msg: (error as any).response.data.msg,
      };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      console.log(email); // Log email for debugging
      console.log(password); // Log password for debugging

      // Send POST request to the login endpoint
      const result = await axios.post(`${API_URL}auth/login`, {
        email,
        password,
      });

      console.log(result); // Log result for debugging

      // Check if result and result.data are defined
      // Update authentication state with new token
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // Set the token in axios headers for all future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      console.log(result.data.token); // Log token for debugging

      // Save token to secure storage
      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);

      return result; // Return login result
    } catch (error) {
      console.error(error); // Log error for debugging

      // Check if the error has a response and message
      const errorMsg =
        (error as any)?.response?.data?.msg || "An unexpected error occurred.";

      // Return error message if login fails
      return {
        error: true,
        msg: errorMsg,
      };
    }
  };

  // Function to handle user logout
  const onLogout = async () => {
    // Delete token from secure storage
    await SecureStorage.deleteItemAsync(TOKEN_KEY);

    // Remove token from axios headers
    axios.defaults.headers.common["Authorization"] = "";

    // Reset authentication state
    setAuthState({
      token: null,
      authenticated: false,
    });

    router.push("/sign-in");
  };

  // Define the values that will be provided by the authentication context
  const value = {
    onRegister: onRegister,
    onLogin: onLogin,
    onLogout: onLogout,
    authState,
  };

  // Return the context provider with the specified value, wrapping around children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
