import React, { Component } from "react";
import FacebookProvider, { Login } from "react-facebook";

class Home extends Component {
    responseFacebook = response => {
        console.log(response);
    };
    render() {
        return (
            <div>
                <FacebookProvider appId="2155704744643770">
                    <Login
                        scope="email"
                        onResponse={this.responseFacebook}
                        onError={this.handleError}
                    >
                        <span>Login via Facebook</span>
                    </Login>
                </FacebookProvider>
            </div>
        );
    }
}

export default Home;
