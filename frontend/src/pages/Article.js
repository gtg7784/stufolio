/*
하나의 게시글을 담당하는 페이지
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";
import { Label, Icon, Segment } from "semantic-ui-react";
import { URL } from "config";

import "react-image-gallery/styles/css/image-gallery.css";

class Article extends Component {
    state = {
        writer: undefined,
        tags: undefined,
        imagesId: undefined,
        datetimeString: undefined,
        isHeart: undefined,
        id: undefined,
        images: undefined,
        numOfHearts: undefined
    };
    componentWillMount() {
        fetch(URL + "articles/" + this.props.match.params.id + "/", {
            // 게시글을 얻기위해 backend 서버로 요청을 보냄
            method: "GET"
        })
            .then(response => {
                if (response.status === 404) {
                    // 만약 존재하지 않는 게시글 일 경우 (404 == not found)
                    this.props.history.push("/"); // 초기 페이지로 보낸다.
                } else {
                    return response.json();
                }
            })
            .then(json => {
                const raw_datetime = json.created_at;
                const datetime = raw_datetime.split("T");
                const time = datetime[1].split(".")[0];
                const datetimeString = datetime[0] + ", " + time;

                this.setState({
                    ...this.state,
                    writer: json.writer,
                    tags: json.tags,
                    imagesId: json.images_id,
                    date: datetimeString,
                    isHeart: json.isHeart,
                    numOfHearts: json.heart_user_set.length,
                    id: json.id
                });
                // 게시글 정보에 따라 state 지정
                const images = [];
                for (let i = 0; i < json.images_id.length; i++) {
                    // 이미지 개수만큼 images array에 추가
                    images.push({
                        original:
                            URL +
                            "articles/images/" +
                            this.state.imagesId[i] +
                            "/",
                        thumbnail:
                            URL +
                            "articles/images/thumbnail/" +
                            this.state.imagesId[i] +
                            "/"
                    });
                }
                this.setState({
                    ...this.state,
                    images: images
                }); // 이미지들을 state의 images 항목으로 지정
            });
    } // 컴포넌트가 로드되기 직전에
    _renderTags = tags => {
        let i = 0;
        const tagsWithIcon = tags.map(tag => {
            let hash = (
                <span key={i}>
                    <Icon name="hashtag" />
                    {tag}
                </span>
            );
            i++;
            return hash;
        });
        return tagsWithIcon;
    };
    onClickHeart = () => {
        fetch(URL + "articles/" + this.props.match.params.id + "/heart/", {
            // 해당하는 게시글의 id에 heart 요청을 보냄
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: this.props.store.status.auth
            }
        })
            .then(response => response.json())
            .then(json => {
                const isHeart = json.isCreated;
                this.setState({
                    ...this.state,
                    isHeart: isHeart,
                    numOfHearts: json.like_count
                });
                // 하트를 눌렀는지의 여부와 하트의 개수를 서버에서 반환받은 값에 따라 변경
            });
    };

    render() {
        return (
            <div>
                <div>
                    <span>
                        <Segment size="massive">
                            <Segment textAlign="center">
                                {this.state.imagesId ? ( // 이미지들의 값이 state에 지정되었을 경우에만
                                    <ImageGallery items={this.state.images} /> // 사진 로드
                                ) : null}
                            </Segment>
                            <Segment textAlign="center">
                                {this.state.tags
                                    ? this._renderTags(this.state.tags)
                                    : null}
                            </Segment>
                            <Segment textAlign="center">
                                {this.state.writer}
                            </Segment>
                            <Segment>{this.state.date}</Segment>
                            <span>
                                {this.state.isHeart ? (
                                    <Label
                                        as="a"
                                        onClick={this.onClickHeart}
                                        size="large"
                                    >
                                        <Icon name="heart" color="red" />
                                        <Label.Detail>
                                            {this.state.numOfHearts}
                                        </Label.Detail>
                                    </Label>
                                ) : (
                                    <Label
                                        as="a"
                                        onClick={this.onClickHeart}
                                        size="large"
                                    >
                                        <Icon
                                            color="black"
                                            name="heart outline"
                                        />
                                        <Label.Detail>
                                            {this.state.numOfHearts}
                                        </Label.Detail>
                                    </Label>
                                )}
                            </span>
                        </Segment>
                    </span>
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

export default connect(mapStateToProps)(Article);
