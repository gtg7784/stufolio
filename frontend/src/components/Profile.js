import "components/Profile.css";
import "pages/Template.css";

import React, { Component } from "react";
import { Card, Grid, Icon, Image, Responsive } from "semantic-ui-react";

class Profile extends Component {
  state = { isImageError: false };

  render() {
    return (
      <div>
        <Responsive minWidth={768}>
          <Grid celled>
            <Grid.Column width={4}>
              <Card>
                <div>
                  {this.state.isImageError ? (
                    <div className="profileImage">
                      <Icon name="user" size="massive" />
                    </div>
                  ) : (
                    <Image
                      src={this.props.imgSource}
                      onError={() => {
                        this.setState({ isImageError: true });
                      }}
                    />
                  )}
                </div>{" "}
                <Card.Content>
                  <Card.Header>{this.props.username}</Card.Header>
                  <Card.Meta>{this.props.bio}</Card.Meta>
                  <Card.Meta>{this.props.school}</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={6}>
              <div
                style={{
                  width: "600px"
                }}
              >
                {" "}
                {this.props.calendarHeatMap}
              </div>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive maxWidth={768} className="center">
          <Card
            style={{
              marginTop: "2rem"
            }}
          >
            {" "}
            <div>
              {this.state.isImageError ? (
                <div className="profile image">
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
        </Responsive>
        <div
          className="center"
          style={{ paddingTop: "2rem", fontSize: "1.2rem" }}
        >
          {this.props.dayStroke}일 연속으로 공부중!
        </div>
      </div>
    );
  }
}

export default Profile;
