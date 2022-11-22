import React from "react";

function EditProfile() {
    return (
        <>
            <form>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="title">First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="First name"
                            />
                        </div>
                        <div class="col">
                            <label for="title">Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Last name"
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
                            />
                        </div>
                        <div class="col">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Username"
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
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">
                    Save
                </button>
            </form>
        </>
    );
}

export default EditProfile;
