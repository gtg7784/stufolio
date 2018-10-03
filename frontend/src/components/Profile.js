import React, { Component } from "react";
import { Card, Image, Icon, Grid } from "semantic-ui-react";

import "components/Profile.css";
import "pages/Template.css";

class Profile extends Component {
    state = {
        isImageError: false
    };

    render() {
        return (
            <div>
                <Grid celled>
                    <Grid.Column width={4}>
                        <Card>
                            <div>
                                {this.state.isImageError ? (
                                    <div className="profile">
                                        <Icon name="user" size="huge" />
                                    </div>
                                ) : (
                                    <Image
                                        src={this.props.imgSource}
                                        onError={() => {
                                            this.setState({
                                                isImageError: true
                                            });
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
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div style={{ width: "600px" }}>
                            {this.props.calendarHeatMap}
                        </div>
                    </Grid.Column>
                </Grid>
                <div className="center">
                    {this.props.dayStroke}일 연속으로 공부중!
                </div>
            </div>
        );
    }
}

export default Profile;
