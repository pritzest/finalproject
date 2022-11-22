import React from "react";
import "../index.css";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import AddBlog from "../components/AddBlog";
import EditBlog from "../components/EditBlog";
function EditBlogMain() {
    document.title = "Dashboard";
    return (
        <>
            <NavbarLogout>
                <NavbarMain>
                    <div className="p-5 ml-5 mr-5">
                        <EditBlog />
                    </div>
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}
export default EditBlogMain;
