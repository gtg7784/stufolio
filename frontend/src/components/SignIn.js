import React from "react";
import FacebookProvider, { Login } from "react-facebook";
import { Button, Input, Icon } from "semantic-ui-react";
import "components/SignIn.css";

const SignIn = ({
    onSubmit,
    onIdChange,
    onPasswordChange,
    facebookAppId,
    onFacebookResponse,
    onFacebookError
}) => (
    <div>
        <form onSubmit={onSubmit}>
            <Input
                type="username"
                placeholder="이메일 혹은 사용자명"
                onChange={onIdChange}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                onChange={onPasswordChange}
            />
            <Button type="submit">로그인</Button>
        </form>
        <FacebookProvider appId={facebookAppId}>
            <Login
                scope="email"
                onResponse={onFacebookResponse}
                onError={onFacebookError}
            >
                <Button color="facebook">
                    <Icon name="facebook" />
                    페이스북으로 로그인
                </Button>
            </Login>
        </FacebookProvider>
    </div>
);

export default SignIn;
