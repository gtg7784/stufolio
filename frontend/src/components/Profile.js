import React from "react";
import "components/Profile.css";

const Profile = ({ img_source, username }) => (
    <div>
        <img className="profile_image" src={img_source} alt="프로필 사진" />
        <div>{username}</div>
    </div>
);

export default Profile;
