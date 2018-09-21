import React from "react";
import { Card, Image } from "semantic-ui-react";
import "components/Profile.css";

const Profile = ({ img_source, username, bio, school }) => (
    <div>
        <Card>
            <Image src={img_source} />
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{bio}</Card.Meta>
                <Card.Meta>{school}</Card.Meta>
            </Card.Content>
        </Card>
    </div>
);

export default Profile;
