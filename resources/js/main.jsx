import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider } from "@tanstack/react-query";
import {
    LandingPage,
    SignupPage,
    LoginPage,
    ApplicationPage,
    ProfilePage,
} from "./pages";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./bootstrap";
import { queryClient } from "./services/query-client";
import { AppearanceProvider, AuthProvider, LinkProvider } from "./contexts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/signup",
        element: (
            <AuthProvider>
                <SignupPage />
            </AuthProvider>
        ),
    },
    {
        path: "/signin",
        element: (
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        ),
    },
    {
        path: "/app/*",
        element: (
            <AuthProvider>
                <AppearanceProvider>
                    <LinkProvider>
                        <ApplicationPage />
                    </LinkProvider>
                </AppearanceProvider>
            </AuthProvider>
        ),
    },
    {
        path: "/:username",
        element: <ProfilePage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </CookiesProvider>
    </React.StrictMode>
);
