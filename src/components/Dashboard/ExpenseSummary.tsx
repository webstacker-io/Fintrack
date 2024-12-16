import React from 'react';
import { DollarSign, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ExpenseSummary as Summary } from '../../types';

interface Props {
  summary: Summary;
}

export function ExpenseSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold mt-1">${summary.totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Average</p>
            <p className="text-2xl font-semibold mt-1">${summary.monthlyAverage.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Top Category</p>
            <p className="text-2xl font-semibold mt-1">{summary.topCategory}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Change</p>
            <div className="flex items-center mt-1">
              <p className="text-2xl font-semibold">{Math.abs(summary.monthlyChange)}%</p>
              {summary.monthlyChange > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-red-500 ml-1" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-green-500 ml-1" />
              )}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg ${
              summary.monthlyChange > 0 ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <TrendingUp
              className={`w-6 h-6 ${
                summary.monthlyChange > 0 ? 'text-red-600' : 'text-green-600'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}