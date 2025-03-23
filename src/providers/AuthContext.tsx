import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

// ✅ Define types
interface AuthState {
  user: string | null;
  currency: string;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: string } }
  | { type: "LOGOUT" }
  | { type: "SET_CURRENCY"; payload: string };

// ✅ Initial state (No token in state)
const initialState: AuthState = {
  user: null,
  currency: "INR",
};

// ✅ Reducer function (Handles state changes)
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user };
    case "LOGOUT":
      return { ...initialState };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

// ✅ Context creation
interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (userData: { user: string; token: string }) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// ✅ Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [token, setToken] = useState<string | null>(null); // ✅ Token stored in memory

  // ✅ Load user from local storage (Not token)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: { user: JSON.parse(storedUser) } });
    }

    const fetchCurrency = async () => {
      try {
        const res = await axios.get("https://ipapi.co/json/");
        const countryCurrencyMap: Record<string, string> = {
          US: "USD",
          IN: "INR",
          UK: "GBP",
          EU: "EUR",
        };
        dispatch({ type: "SET_CURRENCY", payload: countryCurrencyMap[res.data.country_code] || "USD" });
      } catch (error) {
        console.error("Currency detection failed:", error);
      }
    };

    fetchCurrency();
  }, []);

  // ✅ Login function (Store user in localStorage, token in state)
  const login = (userData: any) => {
    dispatch({ type: "LOGIN", payload: { user: userData } });
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData.email)); // ✅ User stored in localStorage
    sessionStorage.setItem("token", userData.access_token);
  };

  // ✅ Logout function (Remove user from localStorage, token from state)
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access auth state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
