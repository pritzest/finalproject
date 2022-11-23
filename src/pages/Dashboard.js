import React, { useState, useEffect } from "react";
import "../index.css";
import NavbarLogout from "../components/NavbarLogout";
import NavbarMain from "../components/NavbarMain";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
    document.title = "Dashboard";
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const token = localStorage.getItem("token");
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    useEffect(() => {
        getUsers();
    }, [title]);

    const getUsers = async () => {
        console.log(title);
        const searchDB = title
            ? process.env.REACT_APP_SERVER_URI + `/blog/?title=${title}`
            : process.env.REACT_APP_SERVER_URI + `/blog/`;
        try {
            const result = await fetch(searchDB, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
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
                setBlogs(data.blogs);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <NavbarLogout>
                <NavbarMain dashboard={true}>
                    <div className="d-flex flex-row px-5 pb-5 pt-3 flex-wrap justify-content-evenly">
                        {blogs
                            ? blogs.map((blog) => {
                                  return (
                                      <Card
                                          allPosts={true}
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
                </NavbarMain>
            </NavbarLogout>
        </>
    );
}
export default Dashboard;
