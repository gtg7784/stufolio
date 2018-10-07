import React, { Component } from "react";
import { Label, Icon, Image, Segment } from "semantic-ui-react";

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
                    <Segment size="large">
                        <Segment textAlign="center">
                            {this.props.imagesId ? (
                                <Image
                                    onClick={() => {
                                        window.open(
                                            URL +
                                                "articles/images/" +
                                                this.props.imagesId[0] +
                                                "/"
                                        );
                                    }}
                                    src={
                                        URL +
                                        "articles/images/thumbnail/" +
                                        this.props.imagesId[0] +
                                        "/"
                                    }
                                />
                            ) : null}
                            {this.props.imagesId.length > 1
                                ? "그 외" +
                                  this.props.imagesId.length -
                                  2 +
                                  "개의이미지"
                                : null}
                        </Segment>
                        <Segment
                            textAlign="center"
                            onClick={this.props.movePageFunc}
                        >
                            {this.props.tags
                                ? this.renderTags(this.props.tags)
                                : null}
                        </Segment>
                        <Segment
                            textAlign="center"
                            onClick={this.props.movePageFunc}
                        >
                            {this.props.writer}
                        </Segment>
                        <Segment onClick={this.props.movePageFunc}>
                            {this.props.date}
                        </Segment>
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
