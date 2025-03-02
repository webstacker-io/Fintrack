import React, { useState } from 'react';

import { Wallet, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Categories } from './components/Categories/Categories';
import { Addexpense } from './components/Expenses/Addexpense';
import Dashboard from './components/Dashboard/Dashboard';
import logo from './assets/images/fintrack-logo.png';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import { useAuth } from './components/Context/Authcontext';
const queryClient = new QueryClient();

const HomeRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    
          <Routes>
          <Route path="/" element={<HomeRedirect />} />
            <Route path="/dashboard" element={
              <Layout>
                <Dashboard />
              </Layout>
              
              
              } />
            <Route path="/auth" element={<Signup />} />
            <Route path="/categories" element={<Layout>
                <Categories />
              </Layout>} />
            <Route path="/expenses" element={<Layout>
                <Addexpense />
              </Layout>} />
          </Routes>
        
    </Router>
    </QueryClientProvider>
  );
}

export default App;
