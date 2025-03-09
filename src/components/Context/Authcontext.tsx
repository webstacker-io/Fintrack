import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: any; // Replace `any` with your actual User type
  login: (userData: any) => any;
  logout: () => void;
}

// Create a context with a default `undefined` value
const AuthContext = createContext<AuthContextType | undefined | any>([]);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = (userData : any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
