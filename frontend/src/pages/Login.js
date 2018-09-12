import React, { Component } from "react";
import { connect } from "react-redux";

import { SignIn } from "components";
import { loginRequest, socialLoginSave } from "modules/account";

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
        return this.props
            .loginRequest(
                this.state.input_value_id,
                this.state.input_value_password
            )
            .then(() => {
                if (this.props.store.login.status === "SUCCESS") {
                    alert("success");
                    let loginData = {
                        isLoggedIn: true
                    };
                    document.cookie = "key=" + btoa(JSON.stringify(loginData));
                    return true;
                } else {
                    return false;
                }
            });
    };
    handleSocialLogin = data => {
        socialLoginSave("");
        console.log("Bearer facebook " + data.tokenDetail.accessToken);
        console.log(this.props.store.status.auth);
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
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        },
        socialLoginSave: bearer => {
            return dispatch(socialLoginSave(bearer));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
