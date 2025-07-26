import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data (null when logged out)

  // ✅ Add logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Optional: if you're storing a token
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};
