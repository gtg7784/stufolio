import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { URL } from "config";
import { logout } from "modules/account";

import { Profile } from "components";

import "pages/Template.css";
import "pages/Home.css";

class Home extends Component {
    state = {
        bio: "",
        school: ""
    };
    moveToUploadPage = () => {
        this.props.history.push("/upload/");
    };
    moveToMyProfilePage = () => {
        this.props.history.push("/users/" + this.props.store.status.username);
    };
    moveToSearchPage = () => {
        this.props.history.push("/search/");
    };
    constructor(props) {
        super(props);
        if (props.store.login.status !== "SUCCESS") {
            props.history.push("/login");
        }
        fetch(URL + "profiles/" + this.props.store.status.username + "/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                if (json !== undefined) {
                    this.setState({
                        ...this.state,
                        bio: json.bio,
                        school: json.school
                    });
                }
            });
    }
    logout = () => {
        this.props.logout();
        this.props.history.push("/login");
    };
    render() {
        return (
            <div className="center">
                <div>
                    <div>
                        <Button
                            inverted
                            floated="left"
                            icon
                            size="big"
                            onClick={this.moveToMyProfilePage}
                        >
                            <Icon color="black" name="list" />
                        </Button>
                        <Button
                            inverted
                            floated="right"
                            icon
                            size="big"
                            onClick={this.moveToSearchPage}
                        >
                            <Icon color="black" name="search" />
                        </Button>
                    </div>
                    <div>
                        <Profile
                            username={this.props.store.status.username}
                            img_source={
                                URL +
                                "profiles/image/" +
                                this.props.store.status.username +
                                "/"
                            }
                            school={this.state.school}
                            bio={this.state.bio}
                        />
                    </div>
                    <div>
                        <Button
                            id="upload_button"
                            color="blue"
                            size="huge"
                            onClick={this.moveToUploadPage}
                        >
                            업로드
                        </Button>
                        <div className="logoutDiv">
                            <Button onClick={this.logout}>로그아웃</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        }
    };
};

const mapStateToProps = state => {
    return {
        store: state
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
