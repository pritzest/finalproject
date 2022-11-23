import React, { useState } from "react";
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
    deleted_at,
}) {
    const imageUrl = process.env.REACT_APP_SERVER_URI + "/" + cover_picture_url;
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const token = localStorage.getItem("token");

    const editPost = async (e) => {
        e.preventDefault();
        navigate("" + blog_id);
    };
    const deletePost = async (e) => {
        e.preventDefault();
        try {
            setFetching(true);
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/blog/" + blog_id,
                {
                    method: "DELETE",
                    headers: {
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
                window.location.reload(false);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="m-2 ml-3">
                <div className="card cardShadow" style={{ width: "20rem" }}>
                    <div className="img-container">
                        <img
                            src={
                                !is_draft
                                    ? imageUrl
                                    : "https://www.color-name.com/color-image?c=4B4E53&square"
                            }
                            className="image card-img-top imageCss"
                            alt=""
                        />
                    </div>
                    <div className="card-body">
                        {!allPosts && is_draft && (
                            <span href="#">
                                <h6 className="card-title text-muted">
                                    (Draft)
                                </h6>
                            </span>
                        )}
                        {!deleted_at ? (
                            <Link to={"/" + blog_id}>
                                <h5 className="card-title">{title}</h5>
                            </Link>
                        ) : (
                            <h5 className="card-title">{title}</h5>
                        )}
                        <h6 className="card-subtitle mb-2 text-muted">
                            By {first_name} {last_name}
                        </h6>
                        <p className="card-text">
                            {description.slice(0, 10)}..
                        </p>
                        {!allPosts && !deleted_at && (
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-warning mx-1 mb-2"
                                    onClick={(e) => editPost(e)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mx-1 mb-2"
                                    onClick={(e) => deletePost(e)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        <div className="card-footer text-muted text-center d-flex justify-content-center align-items-center gap-3">
                            <span className="mx-1">
                                {!deleted_at ? "Created at " : "Deleted at "}
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
