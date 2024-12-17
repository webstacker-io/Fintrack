import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, SetStateAction } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addExpense, fetchCategories, fetchExpenses } from "../../services/Api";

export function Addexpense() {
  const queryClient = useQueryClient();
  const [editingExpense, setEditingExpense] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch Categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch Expenses
  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  // Add Expense Mutation
  const addExpenseMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      reset();
    },
  });

  // Update Expense Mutation
  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      setEditingExpense(null);
      reset();
    },
  });

  // Delete Expense Mutation
  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  // Form Submit Handler
  const onSubmit = (data: void) => {
    if (editingExpense) {
      updateExpenseMutation.mutate({ id: editingExpense.id, updatedData: data });
    } else {
      addExpenseMutation.mutate(data);
    }
  };

  // Edit Handler
  const handleEdit = (expense: any) => {
    setValue("name", expense.name);
    setValue("amount", expense.amount);
    setValue("category", expense.category);
    setEditingExpense(expense);
  };

  // Delete Handler
  const handleDelete = (id: any) => {
    deleteExpenseMutation.mutate(id);
  };

  return (
    <div className="p-6">
    {/* Add Expense Form */}
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        {/* Expense Name */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Expense Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register("name", { required: "Expense name is required" })}
          />
        </div>

        {/* Amount */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register("amount", { required: "Amount is required" })}
          />
        </div>

        {/* Categories Dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            {categoriesLoading ? (
              <option>Loading...</option>
            ) : (
              categories?.map((cat: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>

    {/* Expenses Table */}
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      {expensesLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{expense.name}</td>
                <td className="border px-4 py-2">{expense.amount}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

function updateExpense(variables: void): Promise<unknown> {
  throw new Error("Function not implemented.");
}


function deleteExpense(variables: void): Promise<unknown> {
  throw new Error("Function not implemented.");
}
