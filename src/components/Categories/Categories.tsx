import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Function to handle Add/Update Category
  const onSubmit = (data: any) => {
    if (editingIndex !== null) {
      // Edit existing category
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = data;
      setCategories(updatedCategories);
      setEditingIndex(null);
    } else {
      // Add new category
      setCategories((prev) => [...prev, data]);
    }
    reset();
  };

  // Function to handle Edit action
  const handleEdit = (index: number | React.SetStateAction<null>) => {
    const category = categories[index];
    setValue('name', category.name);
    setEditingIndex(index);
  };

  // Function to handle Delete action
  const handleDelete = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="p-6">
      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingIndex !== null ? 'Edit Category' : 'Add Category'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          {/* Category Name Field */}
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              id="name"
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none ${
                errors.name ? 'border-red-500' : ''
              }`}
              {...register('name', { required: 'Category name is required' })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {editingIndex !== null ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Categories List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {categories.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">#</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Category Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{category.name}</td>
                  <td className="border border-gray-200 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No categories added yet.</p>
        )}
      </div>
    </div>
  );
}
