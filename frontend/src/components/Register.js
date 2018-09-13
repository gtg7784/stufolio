import React from "react";
import FacebookProvider, { Login } from "react-facebook";
import { Button, Input, Icon } from "semantic-ui-react";

const Register = ({
    onSubmit,
    onUsernameChange,
    onEmailChange,
    onPassword1Change,
    onPassword2Change,
    facebookAppId,
    onFacebookResponse,
    onFacebookError
}) => (
    <div>
        <form onSubmit={onSubmit}>
            <Input type="email" placeholder="이메일" onChange={onEmailChange} />
            <Input
                type="username"
                placeholder="사용자 아이디"
                onChange={onUsernameChange}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                onChange={onPassword1Change}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                onChange={onPassword2Change}
            />
            <Button type="submit">회원가입</Button>
        </form>
        <FacebookProvider appId={facebookAppId}>
            <Login
                scope="email"
                onResponse={onFacebookResponse}
                onError={onFacebookError}
            >
                <Button color="facebook">
                    <Icon name="facebook" />
                    페이스북으로 연결
                </Button>
            </Login>
        </FacebookProvider>
    </div>
);

export default Register;
