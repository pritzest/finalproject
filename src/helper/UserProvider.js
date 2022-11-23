import React, { useState, createContext, useContext } from "react";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const access_token = localStorage.getItem("token");
    const [token, setToken] = useState(access_token);

    function setUserToken(mytoken) {
        localStorage.setItem("token", mytoken);
        setToken(mytoken);
        window.location.reload();
    }

    function logoutUser() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <UserContext.Provider
            value={{
                token,
                setUserToken,
                logoutUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
