import React, { useState, useEffect } from "react";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import CardView from "../components/CardView";
import { useParams } from "react-router-dom";
function ViewBlog() {
    document.title = "View Blog";
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [blog, setBlog] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const token = localStorage.getItem("token");
    const { blog_id } = useParams();
    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        try {
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/blog/" + blog_id,
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
                setBlog(data.blog);
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
                    {blog ? (
                        <CardView
                            allPosts={true}
                            title={blog.title}
                            description={blog.description}
                            cover_picture_url={blog.cover_picture_url}
                            first_name={blog.user_id.first_name}
                            last_name={blog.user_id.last_name}
                            id={blog.user_id._id}
                            date={blog.createdAt}
                            blog_id={blog.id}
                            profile_picture_url={
                                blog.user_id.profile_picture_url
                            }
                        />
                    ) : (
                        "No blog found"
                    )}
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}

export default ViewBlog;
