import React, { Component } from "react";
import { connect } from "react-redux";

import { Input, Button, Icon, Loader } from "semantic-ui-react";
import { Article } from "components";
import { URL } from "config";

import "pages/Template.css";

class Search extends Component {
    state = {
        allJsonArticles: undefined,
        search_input_value: undefined,
        jsxArticle: undefined,
        isSearching: false
    };
    searchArticles = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            isSearching: true
        });
        fetch(URL + "search/tags/" + this.state.search_input_value + "/1/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state,
                    allJsonArticles: json,
                    isSearching: false
                });
                this.renderArticles();
            });
    };
    renderArticles = () => {
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
        this.setState({ ...this.state, jsxArticle: articles });
    };
    handleSearchText = event => {
        this.setState({
            ...this.state,
            search_input_value: event.target.value
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.searchArticles}>
                    <Input
                        type="text"
                        placeholder="검색"
                        onChange={this.handleSearchText}
                    />
                    {this.state.isSearching ? (
                        <Button icon>
                            <Loader size="tiny" active inline />
                        </Button>
                    ) : (
                        <Button icon type="submit">
                            <Icon name="search" />
                        </Button>
                    )}
                </form>
                {this.state.jsxArticle}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state
    };
};

export default connect(mapStateToProps)(Search);
