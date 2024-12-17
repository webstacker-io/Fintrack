

import axiosInstance from "../utils/axioInstance";
// Dynamically use the base URL from the environment

export const fetchCategories = async () => {
  const response = await axiosInstance.get("/api/categories"); // API endpoint to fetch categories
  return response.data;
};

export const fetchExpenses = async () => {
  const response = await axiosInstance.get("/api/expenses"); // API endpoint to fetch expenses
  return response.data;
};

export const addExpense = async (newExpense: any) => {
  return axiosInstance.post("/api/expenses", newExpense); // API endpoint to add expense
};

export const updateExpense = async ({ id, updatedData }) => {
  return axiosInstance.put(`/api/expenses/${id}`, updatedData); // API endpoint to update expense
};

export const deleteExpense = async (id: any) => {
  return axiosInstance.delete(`/api/expenses/${id}`); // API endpoint to delete expense
};