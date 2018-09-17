import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "components/Profile.css";

const Profile = ({
    onSubmit,
    onUsernameChange,
    onChangeUsername,
    onImageChange,
    onBioChange,
    onSchoolChange
}) => (
    <div>
        <form onSubmit={onChangeUsername}>
            <Input placeholder="사용자 이름" onChange={onUsernameChange} />
            <Button type="submit">변경</Button>
        </form>
        <form onSubmit={onSubmit}>
            <Input placeholder="프로필 메시지" onChange={onBioChange} />
            <Input placeholder="학교" onChange={onSchoolChange} />
            <label htmlFor="uploader" className="ui button icon">
                이미지 변경
            </label>
            <Button type="submit" icon inverted>
                <Icon name="check" size="big" color="black" />
            </Button>
            <input
                id="uploader"
                className="filebox"
                type="file"
                onChange={onImageChange}
            />
        </form>
    </div>
);

export default Profile;
