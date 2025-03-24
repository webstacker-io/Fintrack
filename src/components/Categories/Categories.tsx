import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dialog, DialogTitle } from "@headlessui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../services/Api";
import { useAuth } from "../../providers/AuthContext";
import Confirmbox from "../ui/Confirmbox";

export const Categories = () => {
  
  const queryClient = useQueryClient();
  const { token } = useAuth();
  console.log(token)

  // ✅ Fetch categories from API
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmID, setConfirmID] = useState<any>(null);
  const [currentCategory, setCurrentCategory] = useState<{ id?: number; Name: string, Description: string } | null>(null);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ Mutation for Creating a Category
  const createMutation = useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  // ✅ Mutation for Updating a Category
  const updateMutation = useMutation({
    mutationFn: ({ id, Name, Description }) => updateCategory(id, { Name, Description }),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  // ✅ Mutation for Deleting a Category
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries(["list"]),
  });

  const onSubmit = (data: any) => {
    if (isEditing && currentCategory?.CatergoryID) {
      console.log(data)
      updateMutation.mutate({ id: currentCategory.CatergoryID, Name: data.Name, Description: data.Description});
    } else {
      console.log(data)
      createMutation.mutate(data);
    }
    reset();
    setIsModalOpen(false);
    setIsEditing(false);
    setIsEditing(false);
  };

  const handleEdit = (category: any) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setIsModalOpen(true);
    reset(category);
  };

  const confirmDelete = (id: number) => {
    setConfirmID(id);
    setIsConfirmOpen(true);
  }

  const handleDelete = (id: number) => {
    
    deleteMutation.mutate(id);
    resetConfirm();
  };
  const resetConfirm = () => {
    setConfirmID(null);
    setIsConfirmOpen(false);
  };

  const handleCreate = () => {};

  return (
    <div className="p-6 space-y-8">
      {/* Add/Edit Category Button */}
      <motion.div className="flex justify-end" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <button onClick={() => { setIsModalOpen(true); reset(); setIsEditing(false); }} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
          Add Category
        </button>
      </motion.div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onClose={() => {reset();setIsModalOpen(false)}} className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <motion.div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full z-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <DialogTitle className="text-lg font-bold mb-4">{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Name">
            Name
          </label>
            <input type="text" placeholder="Category Name" defaultValue={isEditing ? currentCategory?.Name : ''}
            
            {...register("Name", { required: "Name is required" })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Description">
            Description
          </label>
            <textarea  placeholder="Category Description" defaultValue={isEditing ? currentCategory?.Description : ''}

            {...register("Description", { required: "Description is required" })} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-300 mb-4" />
            {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{isEditing ? "Update" : "Add"}</button>
            </div>
          </form>
        </motion.div>
      </Dialog>
      {/* Confirm Box */}      
      <Confirmbox open={isConfirmOpen} 
        setOpen={setIsConfirmOpen} msg='Are you sure you want to delete the category?'
        onConfirm={() => handleDelete(confirmID)} onCancel={resetConfirm}></Confirmbox>
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
                    <button onClick={() => confirmDelete(category.CatergoryID)} className="text-red-600 hover:underline"><Trash2 color="#e61e3c" /></button>
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

