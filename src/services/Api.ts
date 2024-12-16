// Categories CRUD API Functions
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:5000';

// Categories CRUD
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (category: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id: any, category: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Expenses CRUD
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const createExpense = async (expense: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

export const updateExpense = async (id: any, expense: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};