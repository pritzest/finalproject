import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useNavigate, useParams } from "react-router-dom";

function Card({
    title,
    description,
    cover_picture_url,
    first_name,
    last_name,
    allPosts,
    date,
    blog_id,
    is_draft,
}) {
    const imageUrl = process.env.REACT_APP_SERVER_URI + "/" + cover_picture_url;
    const navigate = useNavigate();
    const editPost = async (e) => {
        e.preventDefault();
        navigate("/editblog/" + blog_id);
    };
    return (
        <>
            <div class="m-2">
                <div class="card" style={{ width: "20rem" }}>
                    <div class="img-container cardPic">
                        <img
                            src={
                                !is_draft
                                    ? imageUrl
                                    : "https://www.color-name.com/color-image?c=4B4E53&square"
                            }
                            class="image card-img-top imageCss"
                            alt=""
                        />
                    </div>
                    <div class="card-body">
                        {!allPosts && is_draft && (
                            <span href="#">
                                <h6 class="card-title text-muted">(Draft)</h6>
                            </span>
                        )}
                        <Link to={"/dashboard/blog/" + blog_id}>
                            <h5 class="card-title">{title}</h5>
                        </Link>
                        <h6 class="card-subtitle mb-2 text-muted">
                            By {first_name} {last_name}
                        </h6>
                        <p class="card-text">{description.slice(0, 10)}..</p>
                        {!allPosts && (
                            <div>
                                <button
                                    type="button"
                                    class="btn btn-warning mx-1 mb-2"
                                    onClick={(e) => editPost(e)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-danger mx-1 mb-2"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        <div className="card-footer text-muted text-center d-flex justify-content-center align-items-center gap-3">
                            <span className="mx-1">
                                Created at:{" "}
                                {new Date(date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
