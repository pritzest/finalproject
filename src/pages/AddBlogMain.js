import React from "react";
import "../index.css";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import AddBlog from "../components/AddBlog";
function AddBlogMain() {
    document.title = "Dashboard";
    return (
        <>
            <NavbarLogout>
                <NavbarMain addBlog={true}>
                    <div className="p-5 ml-5 mr-5">
                        <AddBlog />
                    </div>
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}
export default AddBlogMain;
