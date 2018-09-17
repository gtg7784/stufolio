import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { Profile } from "components";
import { URL } from "config";

import "pages/Home.css";

class Home extends Component {
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
    render() {
        return (
            <div>
                <div>
                    <Button
                        inverted
                        icon
                        size="big"
                        onClick={this.moveToMyArticlesPage}
                    >
                        <Icon color="black" name="list" />
                    </Button>
                    <Button
                        inverted
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
                    />
                    <Button size="huge" onClick={this.moveToUploadPage}>
                        업로드
                    </Button>
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
