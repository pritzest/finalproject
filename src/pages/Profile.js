import React, { useState, useEffect } from "react";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import Profile from "../components/Profile";
function ProfileMain() {
    document.title = "Profile";
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/profile/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            const data = await result.json();
            console.log(result, data);
            if (result.status !== 200) {
                setFetching(false);
                setErrors(data.message);
                // console.log(data.message);
                return;
            } else {
                setFetching(false);
                setSuccess(data.message);
                setErrors(null);
                setBlogs({
                    deletedBlogs: data.deletedBlogs,
                    draftBlogs: data.draftBlogs,
                    userBlogs: data.userBlogs,
                });
                setUser(data.user);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <NavbarLogout>
                <NavbarMain>
                    {user ? (
                        <Profile
                            first_name={user.first_name}
                            last_name={user.last_name}
                            username={user.username}
                            profile_picture_url={user.profile_picture_url}
                            userBlogs={blogs.userBlogs || 0}
                            draftBlogs={blogs.draftBlogs || 0}
                            deletedBlogs={blogs.deletedBlogs || 0}
                        />
                    ) : (
                        "No blog found"
                    )}
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}

export default ProfileMain;
