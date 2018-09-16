import React, { Component } from "react";
import { connect } from "react-redux";

import { Register as RegisterComponent } from "components";
import { loginSuccess } from "modules/account";
import { URL } from "config";

class Register extends Component {
    state = {
        input_value_username: "",
        input_value_email: "",
        input_value_password1: "",
        input_value_password2: ""
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
                if (response.status === 200) {
                    // signup success
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
        this.setState({
            ...this.state,
            input_value_username: event.target.value
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
                <RegisterComponent
                    onSubmit={this.handleSubmit}
                    onUsernameChange={this.handleInputUsername}
                    onEmailChange={this.handleInputEmail}
                    onPassword1Change={this.handleInputPassword1}
                    onPassword2Change={this.handleInputPassword2}
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
        loginSuccess: data => {
            return dispatch(loginSuccess(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
