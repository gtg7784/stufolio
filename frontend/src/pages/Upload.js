import React, { Component } from "react";
import { PictureThumbnail } from "components";
import { Icon, Input, Button } from "semantic-ui-react";
import { URL as API_URL } from "config";
import { connect } from "react-redux";
import "./Upload.css";

import { TransitionablePortal, Segment } from "semantic-ui-react";

import "pages/Template.css";

class Upload extends Component {
    state = {
        images: undefined,
        images_url: [],
        tags: "",
        popupMessage: "",
        isOpen: false
    };
    constructor(props) {
        super(props);
        if (props.store.login.status !== "SUCCESS") {
            props.history.push("/login");
        }
    }
    _renderPictures = () => {
        var pics = [];
        let i = 0;
        Array.from(this.state.images_url).forEach(pic => {
            pics.push(
                <PictureThumbnail
                    key={i}
                    picture={pic}
                    size="small"
                    alt="미리보기"
                />
            );
            i++;
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
                            }).then(response => {
                                if (response.status === 201) {
                                    this.showPopup(
                                        <Icon
                                            size="huge"
                                            name="check"
                                            color="green"
                                        />
                                    );
                                    setTimeout(() => {
                                        this.props.history.push("/");
                                    }, 2000);
                                } else {
                                    this.showPopup(<h1>실패</h1>);
                                }
                            });
                        }
                    });
            });
        }
    };
    showPopup = message => {
        this.setState({
            ...this.state,
            isOpen: true,
            popupMessage: message
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                isOpen: false
            });
        }, 2000);
    };

    render() {
        return (
            <div className="center">
                <div>
                    <label
                        htmlFor="uploader"
                        className="ui huge inverted button icon left floated"
                    >
                        <Icon name="add" color="black" />
                    </label>
                    <Button
                        icon
                        size="huge"
                        inverted
                        floated="right"
                        onClick={this.setImageDone}
                    >
                        <Icon name="check" color="black" />
                    </Button>
                    <Input
                        icon="hashtag"
                        iconPosition="left"
                        placeholder="태그"
                        onChange={this.handleTagChange}
                    />
                    {this.state.images_url ? this._renderPictures() : null}
                    <input
                        id="uploader"
                        className="filebox"
                        multiple
                        type="file"
                        onChange={this.handleChange}
                    />
                </div>
                <TransitionablePortal open={this.state.isOpen}>
                    <Segment
                        style={{
                            left: "40%",
                            position: "fixed",
                            top: "50%",
                            zIndex: 1000
                        }}
                    >
                        {this.state.popupMessage}
                    </Segment>
                </TransitionablePortal>
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
