import React, { useState } from 'react';


import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Categories } from './components/Categories/Categories';
import { Addexpense } from './components/Expenses/Addexpense';
import Dashboard from './components/Dashboard/Dashboard';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import { useAuth, AuthProvider } from './components/Context/Authcontext';


const queryClient = new QueryClient();

const HomeRedirect = () => {
  const { user } = useAuth();
  const localUser= JSON.parse(localStorage.getItem("user")|| "{}");
  console.log(localUser)
  return (user || localUser) ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
