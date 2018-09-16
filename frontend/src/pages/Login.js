import React, { Component } from "react";
import { connect } from "react-redux";

import { SignIn } from "components";
import { login, loginSuccess } from "modules/account";
import { URL } from "config";

class Login extends Component {
    state = {
        input_value_id: "",
        input_value_password: ""
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
        }).then(response => {
            if (response.status === 200) {
                const json = response.json();
                const token = "Token " + json.token;
                let loginData = {
                    isLoggedIn: true
                };
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
                this.props.loginFailure();
                return false;
            }
        });
    };
    handleSocialLogin = data => {
        const token = "Bearer facebook " + data.tokenDetail.accessToken;
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
    };
    render() {
        return (
            <div>
                <SignIn
                    onSubmit={this.handleLogin}
                    onIdChange={this.handleInputId}
                    onPasswordChange={this.handleInputPassword}
                    facebookAppId={2155704744643770}
                    onFacebookResponse={this.handleSocialLogin}
                />
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
