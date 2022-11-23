import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    document.title = "Edit Profile";
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        setSuccess(null);
        console.log(selectedFile);
        if (
            !firstNameInput.current.value ||
            !lastNameInput.current.value ||
            !usernameInput.current.value ||
            !emailInput.current.value
        ) {
            return;
        }
        try {
            setFetching(true);
            console.log(
                firstNameInput.current.value,
                lastNameInput.current.value,
                emailInput.current.value,
                usernameInput.current.value,
                passwordInput.current.value
            );
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/profile",
                {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: firstNameInput.current.value,
                        last_name: lastNameInput.current.value,
                        email: emailInput.current.value,
                        username: usernameInput.current.value,
                        password: passwordInput.current.value,
                    }),
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
                localStorage.setItem("username", usernameInput.current.value);
                setTimeout(() => {
                    navigate("/dashboard/profile");
                }, 1000);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getUser = async () => {
        try {
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/profile",
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
                setUser(data.user);
                firstNameInput.current.value = data.user.first_name;
                lastNameInput.current.value = data.user.last_name;
                emailInput.current.value = data.user.email;
                usernameInput.current.value = data.user.username;
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <form>
                <div class="form-group">
                    {errors && (
                        <div className="alert alert-danger">{errors}</div>
                    )}
                    {success && (
                        <div className="alert alert-success">{success}</div>
                    )}
                    <div class="form-row">
                        <div class="col">
                            <label for="title">First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="First name"
                                ref={firstNameInput}
                            />
                        </div>
                        <div class="col">
                            <label for="title">Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Last name"
                                ref={lastNameInput}
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                placeholder="Email"
                                ref={emailInput}
                            />
                        </div>
                        <div class="col">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Username"
                                ref={usernameInput}
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                class="form-control w-50"
                                placeholder="password"
                                ref={passwordInput}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={(e) => updateUser(e)}
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default EditProfile;
