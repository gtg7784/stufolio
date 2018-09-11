import React, { Component } from "react";
import { connect } from "react-redux";

import { SignIn } from "components";
import { URL } from "config";
import queryString from "query-string";

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
                    let loginData = {
                        isLoggedIn: true
                    };
                    document.cookie = "key=" + btoa(JSON.stringify(loginData));
                    this.props.history.push("/articles");
                    return true;
                } else {
                    //fail
                    this.showWarning();
                    return false;
                }
            });
    };

    render() {
        return (
            <div>
                <SignIn
                    onSubmit={this.login}
                    onIdChange={this.handleInputId}
                    onPasswordChange={this.handleInputPassword}
                    facebookAppId={2155704744643770}
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
