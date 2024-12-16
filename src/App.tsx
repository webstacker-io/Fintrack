import React, { useState } from 'react';

import { Wallet, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { CategoriesUI } from './components/Categories/Categories';
import { ExpensesUI } from './components/Expenses/Expenses';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`$ {
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-blue-100 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-blue-200 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-blue-600">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {isSidebarOpen && <span className="text-lg font-semibold text-blue-600">Menu</span>}
        </div>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <div className="p-3 bg-blue-200 rounded-full">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Wallet className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">FinTrack</span>
              </div>
              <div className="flex space-x-4">
              <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/categories" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                  }
                >
                  Categories
                </NavLink>
                <NavLink 
                  to="/expenses" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                  }
                >
                  Expenses
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<CategoriesUI />} />
            <Route path="/expenses" element={<ExpensesUI />} />
          </Routes>
        </main>
      </div>
    </div>
    </Router>
  );
}

export default App;