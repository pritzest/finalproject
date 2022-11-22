import React from "react";
import "../css/blogscss.css";

function CardView({
    title,
    description,
    first_name,
    last_name,
    cover_picture_url,
    profile_picture_url,
    date,
}) {
    const imageUrlCover =
        process.env.REACT_APP_SERVER_URI + "/" + cover_picture_url;
    const imageUrlProfile =
        process.env.REACT_APP_SERVER_URI + "/" + profile_picture_url;
    return (
        <div>
            <div className="card my-3 viewBlog_cardsize">
                <img
                    className="card-img-top w-100 mw-100"
                    src={imageUrlCover}
                    alt="Card image cap"
                />
                <div className="card-body text-center">
                    <h4 className="card-title align-self-center">{title}</h4>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer text-muted text-center d-flex justify-content-center align-items-center gap-3">
                    <img
                        className="card-img-top mx-1 profile_circular_photo"
                        src={imageUrlProfile}
                        alt="Card image cap"
                    />
                    <span className="mx-1">
                        Uploaded by: {first_name} {last_name} |
                    </span>
                    <span className="mx-1">
                        Created at: {new Date(date).toLocaleDateString()}
                    </span>{" "}
                </div>
            </div>
        </div>
    );
}

export default CardView;
