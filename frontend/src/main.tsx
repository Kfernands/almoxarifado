import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/layouts/Layout';
import Dashboard from '@/pages/Dashboard';
import Produtos from '@/pages/Produtos';
import Movimentacoes from '@/pages/Movimentacoes';
import Requisicoes from '@/pages/Requisicoes';
import './style.css';

const router = createBrowserRouter([
  { path: '/', element: <Layout><Dashboard /></Layout> },
  { path: '/produtos', element: <Layout><Produtos /></Layout> },
  { path: '/movimentacoes', element: <Layout><Movimentacoes /></Layout> },
  { path: '/requisicoes', element: <Layout><Requisicoes /></Layout> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
