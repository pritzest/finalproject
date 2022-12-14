import React, { useState, useEffect } from "react";
import "../index.css";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import Card from "../components/Card";

function PostsMain() {
    document.title = "Dashboard";
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/blog/userblogs",
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
            if (result.status === 422) {
                setErrors(data.message[0].msg);
                setFetching(false);
                return;
            }
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
                    userBlogs: data.userBlogs,
                    draftBlogs: data.draftBlogs,
                    deletedBlogs: data.deletedBlogs,
                });
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <NavbarLogout>
                <NavbarMain posts={true}>
                    <div class="pl-5 mt-4 ml-1">
                        {" "}
                        <h5>Posted Blogs</h5>
                    </div>
                    <div className="d-flex flex-row px-5 pb-5 pt-3 flex-wrap justify-content-evenly">
                        {blogs?.userBlogs?.length
                            ? blogs.userBlogs.map((blog) => {
                                  return (
                                      <Card
                                          allPosts={false}
                                          title={blog.title}
                                          description={blog.description}
                                          cover_picture_url={
                                              blog.cover_picture_url
                                          }
                                          first_name={blog.user_id.first_name}
                                          last_name={blog.user_id.last_name}
                                          id={blog.user_id._id}
                                          date={blog.createdAt}
                                          blog_id={blog.id}
                                      />
                                  );
                              })
                            : "No blogs found"}
                    </div>
                    <div class="pl-5 mt-4 ml-1">
                        {" "}
                        <h5>Draft Blogs</h5>
                    </div>
                    <div className="d-flex flex-row px-5 pb-5 pt-3 flex-wrap justify-content-evenly">
                        {blogs?.draftBlogs?.length
                            ? blogs.draftBlogs.map((blog) => {
                                  return (
                                      <Card
                                          allPosts={false}
                                          title={blog.title}
                                          description={blog.description}
                                          cover_picture_url={
                                              blog.cover_picture_url
                                          }
                                          first_name={blog.user_id.first_name}
                                          is_draft={blog.is_draft}
                                          last_name={blog.user_id.last_name}
                                          id={blog.user_id._id}
                                          date={blog.createdAt}
                                          blog_id={blog.id}
                                      />
                                  );
                              })
                            : "No blogs found"}
                    </div>
                    <div class="pl-5 mt-4 ml-1">
                        {" "}
                        <h5>Deleted Blogs</h5>
                    </div>
                    <div className="d-flex flex-row px-5 pb-5 pt-3 flex-wrap justify-content-evenly">
                        {blogs?.deletedBlogs?.length
                            ? blogs.deletedBlogs.map((blog) => {
                                  return (
                                      <Card
                                          allPosts={false}
                                          title={blog.title}
                                          description={blog.description}
                                          cover_picture_url={
                                              blog.cover_picture_url
                                          }
                                          first_name={blog.user_id.first_name}
                                          last_name={blog.user_id.last_name}
                                          id={blog.user_id._id}
                                          date={blog.createdAt}
                                          blog_id={blog.id}
                                          deleted_at={blog.deleted_at}
                                      />
                                  );
                              })
                            : "No blogs found"}
                    </div>
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}

export default PostsMain;
