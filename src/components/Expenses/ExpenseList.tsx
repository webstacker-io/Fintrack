import React from 'react';
import { Expense } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface Props {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-3 text-gray-500 font-medium">Date</th>
                <th className="text-left pb-3 text-gray-500 font-medium">Description</th>
                <th className="text-left pb-3 text-gray-500 font-medium">Category</th>
                <th className="text-right pb-3 text-gray-500 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3">{formatDate(expense.date)}</td>
                  <td className="py-3">{expense.description}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 text-right">${expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}