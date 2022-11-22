import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ViewBlog from "./pages/ViewBlog";
import ProfileMain from "./pages/Profile";
import AddBlogMain from "./pages/AddBlogMain";
import EditProfile from "./pages/EditProfileMain";
import PostsMain from "./pages/PostsMain";
import EditBlogMain from "./pages/EditBlogMain";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/dashboard/blog/:blog_id",
        element: <ViewBlog />,
    },
    {
        path: "/profile",
        element: <ProfileMain />,
    },
    {
        path: "/addblog",
        element: <AddBlogMain />,
    },
    {
        path: "/editblog/:blog_id",
        element: <EditBlogMain />,
    },
    {
        path: "/edit",
        element: <EditProfile />,
    },
    {
        path: "/blog/userblogs",
        element: <PostsMain />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
