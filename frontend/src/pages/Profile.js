import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Profile as ProfileComponent,
    PictureThumbnail,
    ProfileManager
} from "components";
import { logout } from "modules/account";
import { URL as API_URL } from "config";
import { Articles } from "pages";

class Profile extends Component {
    state = {
        isUserOwn: false,
        bio: "",
        school: "",
        image_url: "",
        image: undefined,
        bio_input_value: "",
        school_input_value: "",
        username_input_value: ""
    };
    constructor(props) {
        super(props);

        fetch(API_URL + "profiles/" + this.props.match.params.user + "/", {
            method: "GET"
        })
            .then(response => {
                if (response.status === 404) {
                    this.props.history.push("/");
                    return undefined;
                }
                return response.json();
            })
            .then(json => {
                if (json !== undefined) {
                    this.setState({
                        ...this.state,
                        bio: json.bio,
                        school: json.school,
                        isUserOwn:
                            this.props.store.status.username ===
                            this.props.match.params.user
                    });
                }
            });
    }
    _renderPicture = () => {
        return (
            <PictureThumbnail
                picture={this.state.image_url}
                size="small"
                alt="미리보기"
            />
        );
    };
    _renderArticles = () => {
        let i = -1;
        const articles = this.state.allJsonArticles.map(article => {
            const raw_datetime = article.created_at;
            const datetime = raw_datetime.split("T");
            const time = datetime[1].split(".")[0];
            const datetimeString = datetime[0] + ", " + time;
            let isHeart = false;

            if (
                article.heart_user_set.includes(
                    this.props.store.status.username
                )
            ) {
                isHeart = true;
            }
            i++;
            return (
                <Article
                    key={i}
                    writer={article.writer}
                    tags={article.tags}
                    images_id={article.images_id}
                    date={datetimeString}
                    isHeart={isHeart}
                    id={article.id}
                    auth={this.props.store.status.auth}
                />
            );
        });
        return articles;
    };

    handleImageChange = event => {
        let file = event.target.files[0];
        this.setState({
            ...this.state,
            images: file,
            images_url: URL.createObjectURL(file)
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
    handleUsernameInputValueChange = event => {
        this.setState({
            ...this.state,
            username_input_value: event.target.value
        });
    };
    onChangeUsername = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", this.state.username_input_value);
        fetch(API_URL + "profiles/change/username/", {
            method: "POST",
            headers: {
                Authorization: this.props.store.status.auth
            },
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                // 사용자 이름 변경됨
                this.props.logout()
                this.props.history.push('/')
            });
    }

    render() {
        return <div>
                {this.state.isUserOwn ? <ProfileManager onSubmit={this.handleOnSubmit} onUsernameChange={this.handleUsernameInputValueChange} onChangeUsername={this.changeUsername} onImageChange={this.handleImageChange} onBioChange={this.handleBioInputValueChange} onSchoolChange={this.handleSchoolInputValueChange} /> : null}
                <ProfileComponent username={this.props.match.params.user} img_source={API_URL + "profiles/image/" + this.props.match.params.user + "/"} />
                {this.state.school}
                <br />
                {this.state.bio}
                <br />
                <div width="50%">
                    <CalendarHeatmap
                {this.state.allJsonArticles ? this._renderArticles() : null}
    }
}

const mapStateToProps = state => {
    return {
        store: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
