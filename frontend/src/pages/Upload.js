import React, { Component } from "react";
import { PictureThumbnail } from "components";
import { Icon, Input, Button } from "semantic-ui-react";
import { URL as API_URL } from "config";
import { connect } from "react-redux";
import "./Upload.css";

class Upload extends Component {
    state = {
        images: undefined,
        images_url: [],
        tags: ""
    };
    _renderPictures = () => {
        var pics = [];
        Array.from(this.state.images_url).forEach(pic => {
            pics.push(
                <PictureThumbnail picture={pic} size="small" alt="미리보기" />
            );
        });
        return pics;
    };
    handleChange = event => {
        let file = event.target.files;
        var urls = [];
        Array.from(file).forEach(pic => {
            urls.push(URL.createObjectURL(pic));
        });
        this.setState({ ...this.state, images: file, images_url: urls });
    };
    handleTagChange = event => {
        this.setState({
            ...this.state,
            tags: event.target.value
        });
    };
    setImageDone = () => {
        if (this.state.images !== undefined) {
            var images_id = [];
            var tags = [];
            Array.from(this.state.tags.split(",")).forEach(target => {
                tags.push(target.replace(" ", ""));
            });
            var i = 0;
            Array.from(this.state.images).forEach(pic => {
                let formData = new FormData();
                formData.append("image", pic);
                console.log(this.props.store);
                fetch(API_URL + "articles/images/", {
                    method: "POST",
                    headers: {
                        Authorization: this.props.store.status.auth
                    },
                    body: formData
                })
                    .then(response => response.json())
                    .then(json => {
                        images_id.push(json.id);
                        i++;
                    })
                    .then(() => {
                        let formData = new FormData();
                        formData.append("images_id", JSON.stringify(images_id));
                        formData.append("tags", JSON.stringify(tags));
                        formData.append("content", "");
                        if (i === this.state.images.length) {
                            fetch(API_URL + "articles/", {
                                method: "POST",
                                headers: {
                                    Authorization: this.props.store.status.auth
                                },
                                body: formData
                            }).then(() => {
                                this.props.history.push("/");
                            });
                        }
                    });
            });
        }
    };

    render() {
        return (
            <div>
                <Input
                    icon="hashtag"
                    iconPosition="left"
                    placeholder="태그"
                    onChange={this.handleTagChange}
                />
                <label
                    htmlFor="uploader"
                    className="ui huge inverted button icon"
                >
                    <Icon name="add" color="black" />
                </label>
                <Button icon inverted onClick={this.setImageDone}>
                    <Icon name="check" size="big" color="black" />
                </Button>
                {this.state.images_url ? this._renderPictures() : null}
                <input
                    id="uploader"
                    className="filebox"
                    multiple
                    type="file"
                    onChange={this.handleChange}
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

export default connect(mapStateToProps)(Upload);
