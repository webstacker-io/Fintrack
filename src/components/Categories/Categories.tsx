// Enhanced FinTrack Categories Page with Edit Functionality, Prefilled Modal, and React Hook Form Validation

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Dialog, DialogTitle } from '@headlessui/react';
import { Pencil, Trash2 } from 'lucide-react';

export const Categories = () => {
  const [categories, setCategories] = useState([
    { name: 'Food' },
    { name: 'Utilities' },
    { name: 'Health' },
    { name: 'Entertainment' },
    { name: 'Work' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (isEditing) {
      setCategories(categories.map((category) => (
        category === currentCategory ? { ...category, ...data } : category
      )));
    } else {
      setCategories([...categories, { ...data }]);
    }
    reset();
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setIsModalOpen(true);
    reset(category);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Add/Edit Category Button */}
      <motion.div className="flex justify-end" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <button onClick={() => { setIsModalOpen(true); reset(); setIsEditing(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
          Add Category
        </button>
      </motion.div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <motion.div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full z-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <DialogTitle className="text-lg font-bold mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Category Name" {...register('name', { required: 'Name is required' })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{isEditing ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </motion.div>
      </Dialog>

      {/* Categories Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-3">{category.name}</td>
                <td className="px-6 py-3 space-x-2">
                  <button onClick={() => handleEdit(category)} className="text-indigo-600 hover:underline"><Pencil color="#2026df" /></button>
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
