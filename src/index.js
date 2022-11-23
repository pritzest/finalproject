import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./helper/UserProvider";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ViewBlog from "./pages/ViewBlog";
import ProfileMain from "./pages/Profile";
import AddBlogMain from "./pages/AddBlogMain";
import EditProfile from "./pages/EditProfileMain";
import PostsMain from "./pages/PostsMain";
import EditBlogMain from "./pages/EditBlogMain";
import EditPictureMain from "./pages/EditPictureMain";
import ProtectedRoute from "./helper/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        errorElement: <h1>error</h1>,
        children: [
            {
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: ":blog_id",
                        element: <ViewBlog />,
                    },
                    {
                        path: "dashboard",
                        children: [
                            {
                                path: "addblog",
                                element: <AddBlogMain />,
                            },
                            {
                                path: "profile",
                                children: [
                                    {
                                        path: "",
                                        element: <ProfileMain />,
                                    },
                                    {
                                        path: "edit",
                                        element: <EditProfile />,
                                    },
                                    {
                                        path: "editpicture",
                                        element: <EditPictureMain />,
                                    },
                                ],
                            },
                            {
                                path: "blog",
                                children: [
                                    {
                                        path: "",
                                        element: <PostsMain />,
                                    },
                                    {
                                        path: ":blog_id",
                                        element: <EditBlogMain />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
