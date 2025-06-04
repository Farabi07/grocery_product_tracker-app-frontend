import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Product from './pages/Product/Product';
import Employee from './pages/Employee/Employee';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';



// Layout component controlling sidebar visibility and page selection
function RootLayout() {
  const location = useLocation();
  const noSidebarRoutes = ['/signin', '/signup'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname.toLowerCase());

  const [selectedPage, setSelectedPage] = React.useState(() => {
    // Set initial selected page based on path
    const path = location.pathname.toLowerCase();
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/expenses') return 'Expenses';
    if (path === '/product') return 'Product';
    if (path === '/employee') return 'Employee';
    return 'Dashboard';
  });

  React.useEffect(() => {
    // Update selectedPage on route change
    const path = location.pathname.toLowerCase();
    if (path === '/dashboard') setSelectedPage('Dashboard');
    else if (path === '/expenses') setSelectedPage('Expenses');
    else if (path === '/product') setSelectedPage('Product');
    else if (path === '/employee') setSelectedPage('Employee');
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {showSidebar && <Sidebar selected={selectedPage} onSelect={setSelectedPage} />}
      <main className={`w-full md:w-[80%] ml-0 md:ml-[25%] lg:ml-[15%] ${showSidebar ? 'p-5' : 'p-0'} `}>
        <Outlet />
      </main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/signin" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'expenses', element: <Expenses /> },
      { path: 'product', element: <Product /> },
      { path: 'employee', element: <Employee /> },
      
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
 
  
 
]);
