import React, { Component } from "react";
import { Button, Icon, Image, Card } from "semantic-ui-react";

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
    renderPictures = images_id => {
        const pictures = images_id.map(picture => {
            return (
                <Image
                    onClick={() => {
                        window.location.href =
                            URL + "articles/images/" + picture + "/";
                    }}
                    src={URL + "articles/images/" + picture + "/"}
                />
            );
        });
        return pictures;
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
            <div className="center">
                <div className="article">
                    <Card>
                        {this.props.images_id
                            ? this.renderPictures(this.props.images_id)
                            : null}
                        <Card.Content>
                            <Card.Description>
                                {this.props.tags
                                    ? this.renderTags(this.props.tags)
                                    : null}
                            </Card.Description>
                            <Card.Meta>{this.props.writer}</Card.Meta>
                            <span>
                                좋아요: {this.state.numOfHearts}
                                <br />
                                {this.props.date}
                                {this.state.isHeart ? (
                                    <Button floated="right" inverted icon>
                                        <Icon
                                            size="large"
                                            name="heart"
                                            color="red"
                                            onClick={this.onClickHeart}
                                        />
                                    </Button>
                                ) : (
                                    <Button floated="right" inverted icon>
                                        <Icon
                                            color="black"
                                            size="large"
                                            name="heart outline"
                                            onClick={this.onClickHeart}
                                        />
                                    </Button>
                                )}
                            </span>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Article;
