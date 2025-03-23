import axios from 'axios';
import CryptoJS from "crypto-js";

const API_BASE_URL = "http://localhost:8000"; // Replace with your backend URL
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Use an environment variable in production

// ✅ AES Encrypt Data
export const encryptData = (data: object): string => {
  const jsonString = JSON.stringify(data);

  // Encrypt using AES-ECB with PKCS7 Padding
  const encrypted = CryptoJS.AES.encrypt(
    jsonString, 
    CryptoJS.enc.Utf8.parse(SECRET_KEY), 
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7, // Ensures PKCS7 padding is applied properly
    }
  );

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64); // Convert to Base64
};

// ✅ API Request Function
export const apiRequest = async (method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, data?: object) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // ✅ Add Auth Token (Except Sign-In & Sign-Up)
  const token = sessionStorage.getItem("token");
  if (token && endpoint !== "auth/login" && endpoint !== "auth/register") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const encryptedData = data ? { payload: encryptData(data) } : undefined;

  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      headers,
      withCredentials: true,
      data: JSON.stringify(encryptedData),
    });
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Dynamically load API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// Optional: Interceptors for request and response
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add auth token to headers if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
