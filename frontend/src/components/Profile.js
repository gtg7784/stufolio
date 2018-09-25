import React, { Component } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "components/Profile.css";
import "pages/Template.css";

class Profile extends Component {
    state = {
        isError: false
    };
    render() {
        return (
            <div>
                <Card>
                    <div>
                        {this.state.isError ? (
                            <div className="center profile">
                                <Icon name="user" size="huge" />
                            </div>
                        ) : (
                            <Image
                                src={this.props.img_source}
                                onError={() => {
                                    this.setState({ isError: true });
                                }}
                            />
                        )}
                    </div>
                    <Card.Content>
                        <Card.Header>{this.props.username}</Card.Header>
                        <Card.Meta>{this.props.bio}</Card.Meta>
                        <Card.Meta>{this.props.school}</Card.Meta>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default Profile;
