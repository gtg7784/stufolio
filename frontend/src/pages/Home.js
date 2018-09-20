import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Card, Image } from "semantic-ui-react";

import { URL } from "config";

import "pages/Template.css";

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
                <div className="center">
                    <Card>
                        <Image
                            src={
                                URL +
                                "profiles/image/" +
                                this.props.store.status.username +
                                "/"
                            }
                        />
                        <Card.Content>
                            <Card.Header>
                                {this.props.store.status.username}
                            </Card.Header>
                        </Card.Content>
                    </Card>
                </div>
                <div className="center">
                    <Button
                        color="blue"
                        size="huge"
                        onClick={this.moveToUploadPage}
                    >
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
