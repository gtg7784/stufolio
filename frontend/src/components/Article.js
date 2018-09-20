import React, { Component } from "react";
import { Button, Icon, Image, Card } from "semantic-ui-react";
import "pages/Template.css";

import { URL } from "config";

class Article extends Component {
    state = {
        isHeart: false
    };
    componentDidMount() {
        this.setState({
            ...this.state,
            isHeart: this.props.isHeart
        });
    }

    renderTags = tags => {
        const tagsWithIcon = tags.map(tag => {
            return (
                <span>
                    <Icon name="hashtag" />
                    {tag}
                </span>
            );
        });
        return tagsWithIcon;
    };
    renderPictures = images_id => {
        const pictures = images_id.map(picture => {
            return <Image src={URL + "articles/images/" + picture + "/"} />;
        });
        return pictures;
    };

    onClickHeart = () => {
        fetch(URL + "articles/" + this.props.id + "/heart/", {
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
                    isHeart: isHeart
                });
            });
    };

    render() {
        return (
            <div className="center">
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
        );
    }
}

export default Article;
