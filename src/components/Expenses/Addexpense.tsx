import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react";
import { useForm } from "react-hook-form";

export function Addexpense() {
  const [expenses, setExpenses] = useState();
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Submit Form Data
  const onSubmit = (data: any) => {
    if (editingId !== null) {
      // Edit existing expense
      setExpenses((prevExpenses: any[]) =>
        prevExpenses.map((expense: any) =>
          expense.id === editingId ? { ...data, id: editingId } : expense
        )
      );
      setEditingId(null);
    } else {
      // Add new expense
      setExpenses([...expenses, { ...data, id: Date.now() }]);
    }
    reset();
  };

  // Edit Handler
  const handleEdit = (expense: { id: any; name: any; amount: any; date: any; }) => {
    setEditingId(expense.id);
    setValue('name', expense.name);
    setValue('amount', expense.amount);
    setValue('date', expense.date);
  };

  // Delete Handler
  const handleDelete = (id: any) => {
    setExpenses((prevExpenses: any[]) => prevExpenses.filter((expense: { id: any; }) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Form */}
        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-end space-x-4">
            {/* Expense Name */}
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Expense Name
              </label>
              <input
                id="name"
                type="text"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none ${
                  errors.name ? 'border-red-500' : ''
                }`}
                {...register('name', { required: 'Expense name is required' })}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            {/* Categories */}
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none ${
                  errors.category ? 'border-red-500' : ''
                }`}
                {...register('category', { required: 'Category is required' })}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>


            {/* Amount */}
            <div className="flex-1">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none ${
                  errors.amount ? 'border-red-500' : ''
                }`}
                {...register('amount', {
                  required: 'Amount is required',
                  valueAsNumber: true,
                })}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>

            {/* Date */}
            <div className="flex-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                type="date"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none ${
                  errors.date ? 'border-red-500' : ''
                }`}
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                {editingId !== null ? 'Update' : 'Add Expense'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Expense Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Expenses</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Expense Name</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.length > 0 ? (
                expenses.map((expense: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                  <tr key={expense.id} className="border-t">
                    <td className="px-4 py-2">{expense.name}</td>
                    <td className="px-4 py-2">{expense.amount}</td>
                    <td className="px-4 py-2">{expense.date}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:underline mr-2"
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
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  }
  