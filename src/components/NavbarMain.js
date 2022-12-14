import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarMain({ children, dashboard, addBlog, posts, profile }) {
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const searchInput = useRef();

    const onSearch = (e) => {
        e.preventDefault();
        navigate("/?title=" + searchInput.current.value);
    };

    return (
        <>
            <div className="p-1 text-center bg-image nav-backgroundpic"></div>
            <div className="p-2 text-center bg-light h-25">
                <h1 className="mb-3 mt-2 h2 font-weight-bold">Blogstagram</h1>
                <h5 className="h6">Just Another Blog Project</h5>
                <h4 className="h6">Hello, {username}!</h4>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light pl-5">
                <a className="navbar-brand" href="#">
                    Blogstagram
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ml-2 mr-2">
                            <Link
                                className={
                                    dashboard ? "nav-link active" : "nav-link"
                                }
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item ml-2 mr-2">
                            <Link
                                className={
                                    addBlog ? "nav-link active" : "nav-link"
                                }
                                to="/dashboard/addblog"
                            >
                                Add Blog
                            </Link>
                        </li>
                        <li className="nav-item ml-2 mr-2">
                            <Link
                                className={
                                    posts ? "nav-link active" : "nav-link"
                                }
                                to="/dashboard/blog"
                            >
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item ml-2 mr-2">
                            <Link
                                className={
                                    profile ? "nav-link active" : "nav-link"
                                }
                                to="/dashboard/profile"
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item ml-2 mr-2">
                            <a className="nav-link disabled" href="#"></a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ml-auto mr-4">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            ref={searchInput}
                        />
                        <button
                            className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3"
                            type="submit"
                            onClick={(e) => onSearch(e)}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>
            {children}
        </>
    );
}

export default NavbarMain;
