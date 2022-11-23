import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
    document.title = "Edit Blog";
    const titleInput = useRef();
    const descriptionInput = useRef();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [blog, setBlog] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const token = localStorage.getItem("token");
    const { blog_id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getBlog();
    }, [blog_id]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const addBlog = async (e) => {
        e.preventDefault();
        setSuccess(null);
        console.log(selectedFile);
        if (!titleInput.current.value || !descriptionInput.current.value) {
            return;
        }
        const formData = new FormData();
        formData.append("title", titleInput.current.value);
        formData.append("description", descriptionInput.current.value);
        formData.append("cover_picture_url", selectedFile);
        try {
            setFetching(true);
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/blog/" + blog_id,
                {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    body: formData,
                }
            );
            const data = await result.json();
            console.log(result, data);
            if (result.status === 422) {
                setErrors(data.message[0].msg);
                setFetching(false);
                return;
            }
            if (result.status !== 201) {
                setFetching(false);
                setErrors(data.message);
                // console.log(data.message);
                return;
            } else {
                setFetching(false);
                setSuccess(data.message);
                setErrors(null);
                setTimeout(() => {
                    navigate("/dashboard/blog");
                }, 1000);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
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
                // setSuccess(data.message);
                setErrors(null);
                setBlog(data.blog);
                titleInput.current.value = data.blog.title;
                descriptionInput.current.value = data.blog.description;
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {errors && <div className="alert alert-danger">{errors}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form>
                <div className="form-group">
                    <label for="title">Blog Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        ref={titleInput}
                    />
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        ref={descriptionInput}
                    ></textarea>
                </div>
                <label for="">Upload a Cover Photo</label>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="uploadtext">
                                Upload
                            </span>
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="ulpoad"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={changeHandler}
                            />
                            <label
                                className="custom-file-label"
                                for="uploadlabel"
                            >
                                Choose file
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={isFetching}
                    onClick={(e) => navigate("/dashboard/blog")}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary ml-2"
                    disabled={isFetching}
                    onClick={(e) => addBlog(e)}
                >
                    Update Blog
                </button>
            </form>
        </>
    );
}

export default EditBlog;
