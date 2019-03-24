import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { URL as API_URL } from "config";
import { ProfileManager, Header } from "components";

class ProfileEdit extends Component {
    state = {
        image: undefined,
        image_url: undefined,
        school_input_value: undefined,
        bio_input_value: undefined
    };
    handleImageChange = event => {
        let file = event.target.files[0];
        this.setState({
            ...this.state,
            image: file,
            image_url: URL.createObjectURL(file)
        });
    };
    handleBioInputValueChange = event => {
        this.setState({
            ...this.state,
            bio_input_value: event.target.value
        });
    };
    handleSchoolInputValueChange = event => {
        this.setState({
            ...this.state,
            school_input_value: event.target.value
        });
    };
    handleOnSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        if (this.state.image !== undefined)
            formData.append("image", this.state.image);
        if (this.state.bio_input_value !== "")
            formData.append("bio", this.state.bio_input_value);
        if (this.state.school_input_value !== "")
            formData.append("school", this.state.school_input_value);
        fetch(API_URL + "profiles/", {
            method: "PATCH",
            headers: {
                Authorization: this.props.store.status.auth
            },
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state,
                    bio: json.bio,
                    school: json.school
                });
            });
    };
    // 입력 form을 위한 함수들

    moveDefaultPage = () => {
        this.props.history.push("/");
    };
    moveToSearchPage = () => {
        this.props.history.push("/search/");
    };
    logout = () => {
        this.props.logout();
        this.props.history.push("/login");
    };
    // 헤더의 작업을 위한 함수들

    render() {
        return (
            <div>
                <Header
                    profileButton={
                        <Button
                            inverted
                            floated="right"
                            icon
                            size="big"
                            onClick={this.moveDefaultPage}
                        >
                            <Icon color="black" name="home" />
                        </Button>
                    }
                    searchButton={
                        <Button
                            inverted
                            floated="right"
                            icon
                            size="big"
                            onClick={this.moveToSearchPage}
                        >
                            <Icon color="black" name="search" />
                        </Button>
                    }
                    logoutButton={
                        <Button floated="right" size="big" onClick={this.logout}>
                            로그아웃
                        </Button>
                    }
                />
                <div className="belowheader">
                    <ProfileManager
                        onSubmit={this.handleOnSubmit}
                        onUsernameChange={this.handleUsernameInputValueChange}
                        onChangeUsername={this.onChangeUsername}
                        onImageChange={this.handleImageChange}
                        onBioChange={this.handleBioInputValueChange}
                        onSchoolChange={this.handleSchoolInputValueChange}
                    />
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

export default connect(mapStateToProps)(ProfileEdit);
