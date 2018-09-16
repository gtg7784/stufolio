import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { Profile } from "components";
import { URL } from "config";

import "pages/Home.css";

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

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
