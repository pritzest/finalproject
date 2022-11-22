import React from "react";
import "../css/navbar.css";

function NavbarLogout({ children }) {
    return (
        <>
            <nav className="navbar navbar-light m-0 p-1 nav-logout-color">
                <form className="form-inline my-2 my-lg-0 ml-auto mr-4">
                    <button
                        className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3 text-white nav-logout-color2"
                        type="submit"
                    >
                        Logout
                    </button>
                </form>
            </nav>
            {children}
        </>
    );
}

export default NavbarLogout;
