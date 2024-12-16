
// Sidebar Component
import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, Menu, X } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
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
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
        <div className="p-3 bg-blue-200 rounded-full">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <div className="p-3 bg-blue-200 rounded-full">
          <PieChart className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}