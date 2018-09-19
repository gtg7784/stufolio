import React, { Component } from "react";
import { connect } from "react-redux";

import { Article } from "components";
import { URL } from "config";

class Articles extends Component {
    state = {
        allJsonArticles: undefined
    };
    _renderArticles = () => {
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
            return (
                <Article
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
    constructor(props) {
        super(props);
        var username;
        if (this.props.match === undefined) username = this.props.username;
        else username = this.props.match.params.user;
        fetch(URL + "articles/user/" + username + "/", {
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
                this.setState({ ...this.state, allJsonArticles: json });
            });
    }

    render() {
        return (
            <div>
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

export default connect(mapStateToProps)(Articles);
