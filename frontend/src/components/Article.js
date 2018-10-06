import React, { Component } from "react";
import {
    Label,
    Button,
    Icon,
    Image,
    Segment,
    LabelDetail
} from "semantic-ui-react";

import { URL } from "config";

import "pages/Template.css";
import "components/Article.css";

class Article extends Component {
    state = {
        isHeart: false,
        numOfHearts: 0
    };
    componentDidMount() {
        this.setState({
            ...this.state,
            isHeart: this.props.isHeart,
            numOfHearts: this.props.numOfHearts
        });
    }
    renderTags = tags => {
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
        fetch(URL + "articles/" + this.props.article_id + "/heart/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: this.props.auth
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
        return (
            <div style={{ width: "400px" }} className="article">
                <span>
                    <Segment size="large" onClick={this.props.movePageFunc}>
                        <Segment textAlign="center">
                            {this.props.images_id ? (
                                <Image
                                    onClick={() => {
                                        window.open(
                                            URL +
                                                "articles/images/" +
                                                this.props.images_id[0] +
                                                "/"
                                        );
                                    }}
                                    src={
                                        URL +
                                        "articles/images/thumbnail/" +
                                        this.props.images_id[0] +
                                        "/"
                                    }
                                />
                            ) : null}
                            {this.props.images_id.length > 1
                                ? "그 외" +
                                  this.props.images_id.length -
                                  2 +
                                  "개의이미지"
                                : null}
                        </Segment>
                        <Segment textAlign="center">
                            {this.props.tags
                                ? this.renderTags(this.props.tags)
                                : null}
                        </Segment>
                        <Segment textAlign="center">
                            {this.props.writer}
                        </Segment>
                        <Segment>{this.props.date}</Segment>
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
                                    <Icon color="black" name="heart outline" />
                                    <Label.Detail>
                                        {this.state.numOfHearts}
                                    </Label.Detail>
                                </Label>
                            )}
                        </span>
                    </Segment>
                </span>
            </div>
        );
    }
}

export default Article;
