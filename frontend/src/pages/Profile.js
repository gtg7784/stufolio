import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

import "pages/Template.css";

import {
    Profile as ProfileComponent,
    PictureThumbnail,
    ProfileManager,
    Article
} from "components";
import { logout } from "modules/account";
import { URL as API_URL } from "config";

class Profile extends Component {
    state = {
        isUserOwn: false,
        articlesDateValue: [],
        bio: "",
        school: "",
        image_url: "",
        image: undefined,
        bio_input_value: "",
        school_input_value: "",
        username_input_value: "",
        allJsonArticles: undefined
    };
    constructor(props) {
        super(props);
        fetch(
            API_URL + "articles/user/" + this.props.store.status.username + "/",
            {
                method: "GET"
            }
        )
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
                        allJsonArticles: json.reverse()
                    });
                    this.makeDateValues(json);
                }
            }); //게시글 목록 받아오기

        fetch(API_URL + "profiles/" + this.props.match.params.user + "/", {
            method: "GET"
        })
            .then(response => response.json())
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
                    numOfHearts={article.heart_user_set.length}
                    writer={article.writer}
                    tags={article.tags}
                    images_id={article.images_id}
                    date={datetimeString}
                    isHeart={isHeart}
                    article_id={article.id}
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
                this.props.logout();
                this.props.history.push("/");
            });
    };

    makeDateValues = allJsonArticles => {
        let dateValueArray = [];
        let countValueArray = [];
        let i;
        for (i = 0; i < allJsonArticles.length; i++) {
            const raw_datetime = allJsonArticles[i].created_at;
            const datetime = raw_datetime.split("T");
            // 날짜는 오름차순으로 받음
            if (dateValueArray[dateValueArray.length - 1] !== datetime[0]) {
                // 전것과 다르면 새로운 종류이므로 추가
                countValueArray.push(1);
                dateValueArray.push(datetime[0]);
            } else {
                countValueArray[dateValueArray.length - 1]++;
            }
        }
        let data = [];
        for (i = 0; i < dateValueArray.length; i++) {
            data.push({
                date: dateValueArray[i],
                count: countValueArray[i]
            });
        }
        this.setState({
            ...this.state,
            articlesDateValue: data
        });
    };
    handleClick = value => {
        if (value !== null) alert(value.date + ": " + value.count + "개");
    };

    render() {
        var date = new Date();
        var lastMonth;
        if (date.getMonth === 1) {
            lastMonth = date.getFullYear() + "/" + 12 + "/" + date.getDate();
        } else {
            lastMonth =
                date.getFullYear() +
                "/" +
                (date.getMonth() - 1) +
                "/" +
                (date.getDate() - date.getDay() - 2);
        }
        return (
            <div>
                {this.state.isUserOwn ? (
                    <ProfileManager
                        onSubmit={this.handleOnSubmit}
                        onUsernameChange={this.handleUsernameInputValueChange}
                        onChangeUsername={this.onChangeUsername}
                        onImageChange={this.handleImageChange}
                        onBioChange={this.handleBioInputValueChange}
                        onSchoolChange={this.handleSchoolInputValueChange}
                    />
                ) : null}
                {this.state._renderPicture}
                <div className="center">
                    <ProfileComponent
                        username={this.props.match.params.user}
                        img_source={
                            API_URL +
                            "profiles/image/" +
                            this.props.match.params.user +
                            "/"
                        }
                        school={this.state.school}
                        bio={this.state.bio}
                    />
                </div>
                <CalendarHeatmap
                    startDate={new Date(lastMonth)}
                    endDate={date}
                    onClick={this.handleClick}
                    horizontal={false}
                    values={this.state.articlesDateValue}
                />
                <br />
                {this.state.allJsonArticles ? this._renderArticles() : null}
            </div>
        );
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
