import React, { Component } from "react";
import { connect } from "react-redux";

import { TransitionablePortal, Segment } from "semantic-ui-react";

import { Register as RegisterComponent } from "components";
import { loginSuccess } from "modules/account";
import { URL } from "config";

import "pages/Template.css";

class Register extends Component {
    state = {
        input_value_username: "",
        input_value_email: "",
        input_value_password1: "",
        input_value_password2: "",
        isOpen: false,
        popupMessage: ""
    };
    handleSubmit = event => {
        event.preventDefault();
        if (
            this.state.input_value_password1 ===
            this.state.input_value_password2
        ) {
            fetch(URL + "profiles/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:
                    "username=" +
                    this.state.input_value_username +
                    "&email=" +
                    this.state.input_value_email +
                    "&password1=" +
                    this.state.input_value_password1 +
                    "&password2=" +
                    this.state.input_value_password2
            }).then(response => {
                if (response.status === 201) {
                    this.showPopup(
                        "회원가입 성공. 오류방지를 위하여 사용자 이름에서 .(점) 문자는 제거됩니다."
                    );
                    setTimeout(() => {
                        this.props.history.push("/login");
                    }, 1000);
                } else {
                    this.showPopup("회원가입 실패");
                }
            });
        }
    };
    handleInputEmail = event => {
        this.setState({
            ...this.state,
            input_value_email: event.target.value
        });
    };
    handleInputUsername = event => {
        let username = event.target.value.replace(/[.]/g, ""); // api 서버에 .이 있는 닉네임으로 프로필 요청시 에러 발생하므로 막음
        this.setState({
            ...this.state,
            input_value_username: username
        });
    };
    handleInputPassword2 = event => {
        this.setState({
            ...this.state,
            input_value_password2: event.target.value
        });
    };
    handleInputPassword1 = event => {
        this.setState({
            ...this.state,
            input_value_password1: event.target.value
        });
    };
    handleInputPassword2 = event => {
        this.setState({
            ...this.state,
            input_value_password2: event.target.value
        });
    };
    handleSocialLogin = data => {
        const formData = new FormData();
        formData.append("short_token", data.tokenDetail.accessToken);
        fetch(URL + "profiles/token/", { method: "POST", body: formData })
            .then(response => response.json())
            .then(json => {
                const token = "Bearer facebook " + json;
                fetch(URL + "profiles/", {
                    method: "GET",
                    headers: {
                        Authorization: token
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        const tokenData = {
                            auth: token,
                            username: json.username
                        };
                        this.props.loginSuccess(tokenData);
                        this.props.history.push("/");
                    });
            });
    };

    showPopup = message => {
        this.setState({
            ...this.state,
            isOpen: true,
            popupMessage: message
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                isOpen: false
            });
        }, 2000);
    };
    constructor(props) {
        super(props);
        if (props.store.login.status === "SUCCESS") {
            props.history.push("/");
        }
    }

    render() {
        return (
            <div className="center">
                <div>
                    <RegisterComponent
                        onSubmit={this.handleSubmit}
                        onUsernameChange={this.handleInputUsername}
                        onEmailChange={this.handleInputEmail}
                        onPassword1Change={this.handleInputPassword1}
                        onPassword2Change={this.handleInputPassword2}
                        facebookAppId={2155704744643770}
                        onFacebookResponse={this.handleSocialLogin}
                    />
                    <TransitionablePortal open={this.state.isOpen}>
                        <Segment
                            style={{
                                left: "40%",
                                position: "fixed",
                                top: "50%",
                                zIndex: 1000
                            }}
                        >
                            {this.state.popupMessage}
                        </Segment>
                    </TransitionablePortal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: data => {
            return dispatch(loginSuccess(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
