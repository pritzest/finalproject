import React, { useRef, useState } from "react";
import "../css/loginsignup.css";
function Signup() {
    document.title = "Login";
    const emailInput = useRef();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const signUpUser = async (e) => {
        e.preventDefault();
        setSuccess(null);
        console.log(selectedFile);
        if (
            !emailInput.current.value ||
            !passwordInput.current.value ||
            !firstNameInput.current.value ||
            !lastNameInput.current.value ||
            !usernameInput.current.value ||
            !isFilePicked
        ) {
            return;
        }
        const formData = new FormData();
        formData.append("email", emailInput.current.value);
        formData.append("password", passwordInput.current.value);
        formData.append("first_name", firstNameInput.current.value);
        formData.append("last_name", lastNameInput.current.value);
        formData.append("username", usernameInput.current.value);
        formData.append("profile_picture_url", selectedFile);
        try {
            setFetching(true);
            const result = await fetch(
                process.env.REACT_APP_SERVER_URI + "/signup",
                {
                    method: "POST",
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
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card border-radius">
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block background-image2"></div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3"></i>
                                                    <span className="h1 fw-bold mb-0">
                                                        Blogstagram
                                                    </span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3 letter-spacing">
                                                    Create an account
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    {errors && (
                                                        <div className="alert alert-danger">
                                                            {errors}
                                                        </div>
                                                    )}
                                                    {success && (
                                                        <div className="alert alert-success">
                                                            {success}
                                                        </div>
                                                    )}
                                                    <input
                                                        type="text"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        ref={firstNameInput}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="firstname"
                                                    >
                                                        First Name
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        ref={lastNameInput}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example17"
                                                    >
                                                        Last Name
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        className="form-control form-control-lg"
                                                        ref={usernameInput}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="username"
                                                    >
                                                        Username
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        className="form-control form-control-lg"
                                                        ref={emailInput}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example17"
                                                    >
                                                        Email address
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        ref={passwordInput}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example27"
                                                    >
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="file"
                                                        id="form2Example17"
                                                        className="form-control form-control-sg"
                                                        onChange={changeHandler}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example17"
                                                    >
                                                        Upload Profile Picture
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        disabled={isFetching}
                                                        onClick={(e) =>
                                                            signUpUser(e)
                                                        }
                                                    >
                                                        Sign-Up
                                                    </button>
                                                </div>

                                                <p className="mb-5 pb-lg-2">
                                                    Already have an account?
                                                    <a
                                                        href="#!"
                                                        className="text-color-lightBlue"
                                                    >
                                                        Login here
                                                    </a>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#a2d9ff"
                    fill-opacity="0.72"
                    d="M0,32L26.7,53.3C53.3,75,107,117,160,138.7C213.3,160,267,160,320,160C373.3,160,427,160,480,186.7C533.3,213,587,267,640,256C693.3,245,747,171,800,165.3C853.3,160,907,224,960,245.3C1013.3,267,1067,245,1120,202.7C1173.3,160,1227,96,1280,112C1333.3,128,1387,224,1413,272L1440,320L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
                ></path>
            </svg>
        </>
    );
}

export default Signup;
