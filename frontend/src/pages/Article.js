import React, { Component } from "react";
import { connect } from "react-redux";

import { Article as ArticleComponent } from "components";
import { URL } from "config";

class Article extends Component {
    state = {
        writer: undefined,
        tags: undefined,
        images_id: undefined,
        date: undefined,
        isHeart: undefined,
        id: undefined,
        auth: undefined
    };
    constructor(props) {
        super(props);
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
                    images_id: json.images_id,
                    date: datetimeString,
                    isHeart: json.isHeart,
                    id: json.id
                });
            });
    }

    render() {
        return (
            <div>
                <ArticleComponent
                    writer={this.state.writer}
                    tags={this.state.tags}
                    images_id={this.state.images_id}
                    date={this.state.datetimeString}
                    isHeart={this.state.isHeart}
                    id={this.state.id}
                    auth={this.props.store.status.auth}
                />
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
