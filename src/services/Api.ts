
import apiRequestInstance, { apiRequest } from "../utils/axioInstance";

// Dynamically use the base URL from the environment

export const getCategories = async () => {
  const response = await apiRequest("GET","fintrack/categories/list");
  return response;
};

export const createCategory = async (category: { name: string, Description: string }) => {
  const response = await apiRequest('POST','fintrack/categories/create', category);
  return response;
};

export const updateCategory = async (id: number, category: { Name: string, Description: string }) => {
  const response = await apiRequest('PUT',`fintrack/categories/update/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await apiRequest('DELETE',`fintrack/categories/delete/${id}`);
  return response.data;
};

export const fetchExpenses = async () => {
  const response = await apiRequestInstance.get("/api/expenses"); // API endpoint to fetch expenses
  return response.data;
};

export const addExpense = async (newExpense: any) => {
  return apiRequestInstance.post("/api/expenses", newExpense); // API endpoint to add expense
};

export const updateExpense = async ({ id, updatedData }: any) => {
  return apiRequestInstance.put(`/api/expenses/${id}`, updatedData); // API endpoint to update expense
};

export const deleteExpense = async (id: any) => {
  return apiRequestInstance.delete(`/api/expenses/${id}`); // API endpoint to delete expense
};


// Sign Up API
export const signUpUser = async (data: any) => {
  

  const response = await apiRequest("POST","auth/register",{
    email: data.email,
    password: data.password, 
  });
  return response;
};

// Sign In API
export const signInUser = async (data: any) => {
  const response = await apiRequest("POST","auth/login", data);
  return response;
};

