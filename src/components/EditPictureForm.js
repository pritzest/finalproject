import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditPictureForm() {
    document.title = "Edit Profile Picture";
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const editPicture = async (e) => {
        e.preventDefault();
        setSuccess(null);
        console.log(selectedFile);
        const formData = new FormData();

        formData.append("profile_picture_url", selectedFile);
        try {
            setFetching(true);
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/profile",
                {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    body: formData,
                }
            );
            const data = await result.json();
            console.log(result, data);
            if (result.status === 422) {
                setErrors(data.message);
                setFetching(false);
                console.log(errors);

                return;
            }
            if (result.status !== 201) {
                setFetching(false);
                setErrors(data.message);
                console.log(errors);

                // console.log(data.message);
                return;
            } else {
                setFetching(false);
                setSuccess(data.message);
                setErrors(null);
                console.log(errors);
                setTimeout(() => {
                    navigate("/dashboard/profile");
                }, 1000);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div class="card px-5 mt-4">
                {errors && <div className="alert alert-danger">{errors}</div>}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}
                <div class="card-header">Change Profile Picture</div>
                <div class="card-body">
                    <h5 class="card-title">Upload your photo</h5>
                    <div class="mb-3">
                        <input
                            class="form-control form-control-sm"
                            id="formFileSm"
                            type="file"
                            onChange={changeHandler}
                        />
                    </div>
                    <button
                        href="#"
                        className="btn btn-secondary mr-2"
                        onClick={(e) => navigate("/dashboard/profile")}
                    >
                        Cancel
                    </button>
                    <button
                        href="#"
                        className="btn btn-primary"
                        onClick={(e) => editPicture(e)}
                    >
                        Save Picture
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditPictureForm;
