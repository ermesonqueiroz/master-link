import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { LandingPage } from "./pages";
import { SignupPage } from "./pages/SignupPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "./pages/LoginPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
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

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
