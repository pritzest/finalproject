import React from "react";
import "../index.css";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import EditProfile from "../components/EditProfile";

function EditProfileMain() {
    document.title = "Edit Profile";
    return (
        <>
            <NavbarLogout>
                <NavbarMain>
                    <div class="p-5 ml-5 mr-5">
                        <EditProfile />
                    </div>
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}
export default EditProfileMain;
