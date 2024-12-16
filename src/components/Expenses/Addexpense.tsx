import { useForm } from "react-hook-form";

export function Addexpense() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const onSubmit = (data: any) => {
      console.log('Expense Data:', data);
      reset();
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Expense Name
            </label>
            <input
              id="name"
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.name ? 'border-red-500' : ''
              }`}
              {...register('name', { required: 'Expense name is required' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
  
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.amount ? 'border-red-500' : ''
              }`}
              {...register('amount', {
                required: 'Amount is required',
                valueAsNumber: true,
              })}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
          </div>
  
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.date ? 'border-red-500' : ''
              }`}
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Expense
          </button>
        </form>
      </div>
    );
  }
  