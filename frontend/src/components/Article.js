import React, { Component } from "react";
import { Button, Icon, Image } from "semantic-ui-react";

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
            return (
                <Image
                    src={URL + "articles/images/" + picture + "/"}
                    size="small"
                />
            );
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
            <div>
                {this.props.images_id
                    ? this.renderPictures(this.props.images_id)
                    : null}
                {this.props.writer}
                {this.props.tags ? this.renderTags(this.props.tags) : null}
                <br />
                {this.props.date}
                {this.state.isHeart ? (
                    <Button
                        icon="heart"
                        color="red"
                        onClick={this.onClickHeart}
                    />
                ) : (
                    <Button icon="heart outline" onClick={this.onClickHeart} />
                )}
            </div>
        );
    }
}

export default Article;
