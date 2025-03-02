// Enhanced FinTrack Categories and Expenses UI with Edit Functionality, Prefilled Modal, and React Hook Form Validation

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Dialog, DialogTitle } from '@headlessui/react';
import { Pencil, Trash2 } from 'lucide-react';

export const Addexpense = () => {
  const [expenses, setExpenses] = useState([
    { name: 'Groceries', amount: '150', category: 'Food', date: '2025-02-20' },
    { name: 'Internet Bill', amount: '60', category: 'Utilities', date: '2025-02-21' },
    { name: 'Gym Membership', amount: '40', category: 'Health', date: '2025-02-22' },
    { name: 'Movie Night', amount: '25', category: 'Entertainment', date: '2025-02-23' },
    { name: 'Office Supplies', amount: '80', category: 'Work', date: '2025-02-24' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (isEditing) {
      setExpenses(expenses.map((expense) => (
        expense === currentExpense ? { ...expense, ...data, date: expense.date } : expense
      )));
    } else {
      setExpenses([...expenses, { ...data, date: new Date().toISOString().split('T')[0] }]);
    }
    reset();
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEdit = (expense) => {
    setIsEditing(true);
    setCurrentExpense(expense);
    setIsModalOpen(true);
    reset(expense);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Add/Edit Expense Button */}
      <motion.div className="flex justify-end" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <button onClick={() => { setIsModalOpen(true); reset(); setIsEditing(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
          Add Expense
        </button>
      </motion.div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <motion.div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full z-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <DialogTitle className="text-lg font-bold mb-4">{isEditing ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Expense Name" {...register('name', { required: 'Name is required' })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            <input type="number" placeholder="Amount" {...register('amount', { required: 'Amount is required' })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            <input type="text" placeholder="Category" {...register('category', { required: 'Category is required' })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{isEditing ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </motion.div>
      </Dialog>

      {/* Expenses Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-3">{expense.name}</td>
                <td className="px-6 py-3">${expense.amount}</td>
                <td className="px-6 py-3">{expense.category}</td>
                <td className="px-6 py-3">{expense.date}</td>
                <td className="px-6 py-3 space-x-2">
                  <button onClick={() => handleEdit(expense)} className="text-indigo-600 hover:underline"><Pencil color="#2026df" /></button>
                  <button className="text-red-600 hover:underline"><Trash2 color="#e61e3c" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


