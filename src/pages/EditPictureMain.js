import React from "react";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import EditPictureForm from "../components/EditPictureForm";
function EditPictureMain() {
    return (
        <>
            <NavbarLogout>
                <NavbarMain>
                    <EditPictureForm />
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}

export default EditPictureMain;
