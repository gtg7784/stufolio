import React, { Component } from "react";
import { connect } from "react-redux";

import { TransitionablePortal, Segment, Button } from "semantic-ui-react";

import { SignIn } from "components";
import { login, loginSuccess, loginFailure } from "modules/account";
import { URL } from "config";

import "pages/Template.css";
import "pages/Login.css";

class Login extends Component {
    state = {
        input_value_id: "",
        input_value_password: "",
        isOpen: false,
        popupMessage: ""
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
    handleInputId = event => {
        this.setState({
            ...this.state,
            input_value_id: event.target.value
        });
    };
    handleInputPassword = event => {
        this.setState({
            ...this.state,
            input_value_password: event.target.value
        });
    };
    handleLogin = event => {
        event.preventDefault();
        this.props.login();
        fetch(URL + "token-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
                "username=" +
                this.state.input_value_id +
                "&password=" +
                this.state.input_value_password
        })
            .then(response => response.json())
            .then(json => {
                if (json.token !== undefined) {
                    const token = "Token " + json.token;
                    let loginData = { isLoggedIn: true };
                    document.cookie = "key=" + btoa(JSON.stringify(loginData)); // 쿠키에 저장
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
                } else {
                    this.showPopup("로그인 실패");
                    this.props.loginFailure();
                }
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
    constructor(props) {
        super(props);
        if (props.store.login.status === "SUCCESS") {
            props.history.push("/");
        }
    }
    render() {
        return (
            <div className="center">
                <div className="login content">
                    <SignIn
                        onSubmit={this.handleLogin}
                        onIdChange={this.handleInputId}
                        onPasswordChange={this.handleInputPassword}
                        facebookAppId={2155704744643770}
                        onFacebookResponse={this.handleSocialLogin}
                    />
                </div>
                <Button
                    onClick={() => {
                        this.props.history.push("/register/");
                    }}
                >
                    회원 가입
                </Button>
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
        login: () => {
            return dispatch(login());
        },
        loginSuccess: data => {
            return dispatch(loginSuccess(data));
        },
        loginFailure: () => {
            return dispatch(loginFailure());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
