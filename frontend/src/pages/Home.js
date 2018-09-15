import React, { Component } from "react";
import { Profile } from "components";
import { Button, Icon } from "semantic-ui-react";

import "pages/Home.css";

class Home extends Component {
    moveToUploadPage = () => {
        this.props.history.push("/upload/");
    };
    render() {
        return (
            <div>
                <div>
                    <Icon name="list" color="black" size="big" />
                    <Icon name="search" color="black" size="big" />
                </div>
                <div>
                    <Profile
                        img_source="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&dpr=2"
                        username={"something"}
                    />
                    <Button size="huge" onClick={this.moveToUploadPage}>
                        업로드
                    </Button>
                </div>
            </div>
        );
    }
}

export default Home;
