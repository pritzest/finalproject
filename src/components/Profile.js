import React from "react";
import { Link } from "react-router-dom";
import "../css/profile.css";

function Profile({
    first_name,
    last_name,
    username,
    userBlogs,
    draftBlogs,
    deletedBlogs,
    profile_picture_url,
}) {
    const profilePicture =
        process.env.REACT_APP_SERVER_URI + "/" + profile_picture_url;
    return (
        <>
            <section className="vh-100">
                <div className="container py-2 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                            <div className="card border_radius">
                                <div className="card-body p-5">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={profilePicture}
                                                alt="Generic placeholder image"
                                                className="img-fluid image_size"
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3 ml-2">
                                            <h5 className="mb-1">
                                                {first_name} {last_name}
                                            </h5>
                                            <p className="mb-2 pb-1 color1">
                                                {username}
                                            </p>
                                            <div className="d-flex justify-content-start rounded-3 p-2 mb-2 align-items-end color2">
                                                <div>
                                                    <p className="small text-muted mb-1">
                                                        Posted Blogs
                                                    </p>
                                                    <p className="mb-0">
                                                        {userBlogs}
                                                    </p>
                                                </div>
                                                <div className="px-3">
                                                    <p className="small text-muted mb-1">
                                                        Drafts
                                                    </p>
                                                    <p className="mb-0">
                                                        {draftBlogs}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="small text-muted mb-1">
                                                        Deleted Blogs
                                                    </p>
                                                    <p className="mb-0">
                                                        {deletedBlogs}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-1">
                                                <Link
                                                    type="button"
                                                    className="btn btn-outline-primary me-1 flex-grow-1"
                                                    to="/dashboard/profile/edit"
                                                >
                                                    Edit Account
                                                </Link>
                                                <Link
                                                    type="button"
                                                    className="btn btn-primary me-1 flex-grow-1"
                                                    to="/dashboard/profile/editpicture"
                                                >
                                                    Edit Picture
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;
