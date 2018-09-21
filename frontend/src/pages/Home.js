import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Card, Image } from "semantic-ui-react";

import { URL } from "config";

import { Profile } from "components";

import "pages/Template.css";

class Home extends Component {
    state = {
        bio: "",
        school: ""
    };
    moveToUploadPage = () => {
        this.props.history.push("/upload/");
    };
    moveToMyArticlesPage = () => {
        this.props.history.push(
            "/articles/" + this.props.store.status.username
        );
    };
    moveToSearchPage = () => {
        this.props.history.push("/search/");
    };
    constructor(props) {
        super(props);
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
    render() {
        return (
            <div className="center">
                <div>
                    <div>
                        <Button
                            inverted
                            floated="left"
                            right
                            icon
                            size="big"
                            onClick={this.moveToMyArticlesPage}
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
                    </div>
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
export default connect(mapStateToProps)(Home);
