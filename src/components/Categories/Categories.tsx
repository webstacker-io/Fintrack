import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dialog, DialogTitle } from "@headlessui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../services/Api";
import { useAuth } from "../../providers/AuthContext";

export const Categories = () => {
  
  const queryClient = useQueryClient();
  const { token } = useAuth();
  console.log(token)

  // ✅ Fetch categories from API
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{ id?: number; Name: string } | null>(null);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ Mutation for Creating a Category
  const createMutation = useMutation({
    mutationFn: () => createCategory(token, data),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  // ✅ Mutation for Updating a Category
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => updateCategory(id, { name }),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  // ✅ Mutation for Deleting a Category
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  const onSubmit = (data: { name: string }) => {
    if (isEditing && currentCategory?.CatergoryID) {
      updateMutation.mutate({ id: currentCategory.CatergoryID, Name: data.name });
    } else {
      createMutation.mutate(data);
    }
    reset();
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEdit = (category: any) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setIsModalOpen(true);
    reset(category);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
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
          <DialogTitle className="text-lg font-bold mb-4">{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Category Name" defaultValue={isEditing ? currentCategory?.Name : ''}
            
            {...register("name", { required: "Name is required" })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{isEditing ? "Update" : "Add"}</button>
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
            {isLoading ? (
              <tr><td colSpan={2} className="text-center py-4">Loading...</td></tr>
            ) : (
              categories?.map((category: any) => (
                <tr key={category.id} className="border-t">
                  <td className="px-6 py-3">{category.Name}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button onClick={() => handleEdit(category)} className="text-indigo-600 hover:underline"><Pencil color="#2026df" /></button>
                    <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:underline"><Trash2 color="#e61e3c" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

