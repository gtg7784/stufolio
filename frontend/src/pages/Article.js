import React, { Component } from "react";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";
import { Label, Icon, Image, Segment } from "semantic-ui-react";

import { Article as ArticleComponent } from "components";
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
            method: "GET"
        })
            .then(response => {
                if (response.status === 404) {
                    this.props.history.push("/");
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
                const images = [];
                for (let i = 0; i < json.images_id.length; i++) {
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
                });
            });
    }
    _renderTags = tags => {
        let i = -1;
        const tagsWithIcon = tags.map(tag => {
            i++;
            return (
                <span key={i}>
                    <Icon name="hashtag" />
                    {tag}
                </span>
            );
        });
        return tagsWithIcon;
    };
    onClickHeart = () => {
        fetch(URL + "articles/" + this.props.match.params.id + "/heart/", {
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
            });
    };

    render() {
        console.log(this.props.store.status.auth);
        return (
            <div>
                <div>
                    <span>
                        <Segment size="massive">
                            <Segment textAlign="center">
                                {this.state.imagesId ? (
                                    <ImageGallery items={this.state.images} />
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
