import React from 'react';
import './bootstrap';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LandingPage, SignupPage, LoginPage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './contexts/Auth';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/signin",
        element: <LoginPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CookiesProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthProvider>
        </CookiesProvider>
    </React.StrictMode>
);
