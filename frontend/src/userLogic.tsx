import React from "react";
import { useQuery } from "react-query";
import { api } from "./lib/api";

export interface User {
  username: string;
  email: string;
  bio: string;
  feeds_following: string[];
}

// Function to fetch user details
const fetchUserDetails = async () => {
  try {
    const response = await api.get("/user/details");
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const useUserDetails = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUserDetails must be used within a UserProvider");
  }

  const user = context;

  const { error, isLoading } = useQuery("userDetails", fetchUserDetails);

  return { user, error, isLoading };
};

const UserContext = React.createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery("userDetails", fetchUserDetails);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user details: {error.toString()}</div>;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
