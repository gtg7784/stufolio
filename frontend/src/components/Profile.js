import React from "react";
import { Icon } from "semantic-ui-react";
import "components/Profile.css";

const Profile = ({ img_source, username }) => (
    <div>
        {img_source ? (
            <img className="profile_image" src={img_source} alt="프로필 사진" />
        ) : (
            <Icon name="user circle" size="massive" />
        )}
        <div>{username}</div>
    </div>
);

export default Profile;
