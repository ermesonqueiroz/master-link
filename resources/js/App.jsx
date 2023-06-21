import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { LandingPage } from "./components";

const router = createBrowserRouter([
    {
        "path": "/",
        element: <LandingPage />
    }
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    );
}
