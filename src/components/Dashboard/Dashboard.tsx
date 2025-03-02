// Updated FinTrack Dashboard Code with Three Rows and Animations

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../ui/Card';

const pieData = [
  { name: 'Food', value: 400 },
  { name: 'Transportation', value: 300 },
  { name: 'Utilities', value: 300 },
  { name: 'Entertainment', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const lineData = [
  { month: 'Jan', expense: 400 },
  { month: 'Feb', expense: 300 },
  { month: 'Mar', expense: 500 },
];

const barData = [
  { category: 'Food', expense: 150 },
  { category: 'Transport', expense: 100 },
  { category: 'Utilities', expense: 200 },
];

const recentExpenses = [
  { date: 'Mar 15, 2024', description: 'Grocery shopping', category: 'Food', amount: '$85.50' },
  { date: 'Mar 14, 2024', description: 'Gas station', category: 'Transportation', amount: '$45.00' },
  { date: 'Mar 10, 2024', description: 'Electric bill', category: 'Utilities', amount: '$120.00' },
];

const subscriptions = [
  { name: 'Netflix', cost: '$15.99', nextBilling: 'Apr 1, 2024' },
  { name: 'Spotify', cost: '$9.99', nextBilling: 'Apr 5, 2024' },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* First Row: Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Total Expenses', 'Monthly Average', 'Top Category', 'Monthly Change'].map((title, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-xl font-bold">$850.49</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Second Row: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold mb-4">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold mb-4">Monthly Expenses</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="expense" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold mb-4">Category-wise Expenses</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="expense" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Third Row: Recent Expenses and Active Subscriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold mb-4">Recent Expenses</h3>
              <ul className="space-y-2">
                {recentExpenses.map((expense, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{expense.date} - {expense.description} ({expense.category})</span>
                    <span>{expense.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold mb-4">Active Subscriptions</h3>
              <ul className="space-y-2">
                {subscriptions.map((sub, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{sub.name} - Next: {sub.nextBilling}</span>
                    <span>{sub.cost}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
