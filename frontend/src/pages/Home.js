import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import { URL } from "config";
import { logout } from "modules/account";
import { Profile, Header } from "components";

import "pages/Template.css";
import "pages/Home.css";

class Home extends Component {
    state = {
        bio: "",
        school: "",
        articlesDateValue: undefined,
        dayStroke: 0
    };
    componentWillMount() {
        if (this.props.store.login.status !== "SUCCESS") {
            this.props.history.push("/login");
        } else {
            //로그인 전용 페이지이므로, 로그인 되어있지 않을경우 로그인 페이지로 이동
            fetch(
                URL + "articles/user/" + this.props.store.status.username + "/",
                {
                    // 로그인 한 유저의 게시글 목록을 요청함 (달력 그래프를 그리기 위해서임)
                    method: "GET"
                }
            )
                .then(response => {
                    if (response.status === 404) {
                        this.props.history.push("/");
                        return undefined;
                    }
                    return response.json();
                })
                .then(json => {
                    if (json !== undefined) {
                        this.setState({
                            ...this.state,
                            allJsonArticles: json.reverse()
                        });
                        this.makeDateValues(json);
                    }
                }); //게시글 목록 받아오기
            fetch(URL + "profiles/" + this.props.store.status.username + "/", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => {
                    if (json !== undefined) {
                        this.setState({
                            ...this.state,
                            bio: json.bio,
                            school: json.school
                        });
                    }
                }); // 프로필 받아오기
        }
    }

    moveToUploadPage = () => {
        this.props.history.push("/upload/");
    };
    moveToMyProfilePage = () => {
        this.props.history.push(
            "/users/" + this.props.store.status.username + "/"
        );
    };
    moveToSearchPage = () => {
        this.props.history.push("/search/");
    };
    logout = () => {
        this.props.logout();
        this.props.history.push("/login/");
    };
    // 헤더의 버튼 액션을 위한 함수들

    makeDateValues = allJsonArticles => {
        let dateValueArray = []; // 날짜 정보에 대한 모든 내용이 담기는 array
        let data = []; //날짜, 게시글 작성횟수가 있는 데이터가 담기는 array
        for (let i = 0; i < allJsonArticles.length; i++) {
            const raw_datetime = allJsonArticles[i].created_at; // <날짜>T<시간> 형식
            const datetime = raw_datetime.split("T"); // 날짜를 얻기 위해 T를 기준으로 나눔
            if (dateValueArray[dateValueArray.length - 1] !== datetime[0]) {
                // 전것과 날짜가 다르면 다른 날짜이므로 추가
                data.push({
                    date: datetime[0],
                    count: 1
                });
            } else {
                // 전것과 같다면 같은 날짜이므로 count 횟수만 추가
                data[data.length - 1] = {
                    ...data,
                    count: data[data.length - 1].count + 1
                };
            }
        }

        for (var dayStroke = 0; dayStroke < data.length; dayStroke++) {
            // 당일 부터 하루 하루 늘려 나감.
            let dataDate = new Date(data[dayStroke].date);
            let targetDate = new Date(
                new Date().getTime() - this.getMilliSecondsOfDay(dayStroke)
                // 당일 - 0 다음 루프로 넘어가면, 당일 - 1
            );
            const dataDateString =
                dataDate.getFullYear() +
                "-" +
                dataDate.getMonth() +
                "-" +
                dataDate.getDate();
            //data의 날짜를 string으로 바꿈

            const targetDateString =
                targetDate.getFullYear() +
                "-" +
                targetDate.getMonth() +
                "-" +
                targetDate.getDate();
            //비교 할 날짜를 string으로 바꿈

            if (dataDateString !== targetDateString) {
                break;
            }
        }
        // 몇일 연속으로 했는지

        this.setState({
            ...this.state,
            dayStroke: dayStroke,
            articlesDateValue: data
        });
        //state에 값 지정
    };
    getMilliSecondsOfDay(day) {
        return day * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
    }

    handleClick = value => {
        if (value !== null) alert(value.date + ": " + value.count + "개");
    };

    render() {
        var date = new Date();
        var lastYear = new Date(
            date.getTime() -
                this.getMilliSecondsOfDay(365 / 2 + date.getDay() - 1) // 6개월 전 부터 달력 그래프를 그림
        );

        return (
            <div>
                <Header
                    profileButton={
                        <Button
                            inverted
                            floated="left"
                            icon
                            size="big"
                            onClick={this.moveToMyProfilePage}
                        >
                            <Icon color="black" name="list" />
                        </Button>
                    }
                    searchButton={
                        <Button
                            inverted
                            floated="right"
                            icon
                            size="big"
                            onClick={this.moveToSearchPage}
                        >
                            <Icon color="black" name="search" />
                        </Button>
                    }
                    logoutButton={
                        <Button floated="right" onClick={this.logout}>
                            로그아웃
                        </Button>
                    }
                />

                <div className="content">
                    {this.state.articlesDateValue ? (
                        <div className="belowheader">
                            <Profile
                                username={this.props.store.status.username}
                                imgSource={
                                    URL +
                                    "profiles/image/" +
                                    this.props.store.status.username +
                                    "/"
                                }
                                calendarHeatMap={
                                    <CalendarHeatmap
                                        startDate={lastYear}
                                        endDate={date}
                                        values={this.state.articlesDateValue}
                                    />
                                }
                                school={this.state.school}
                                bio={this.state.bio}
                                classForValue={value => {
                                    if (!value) {
                                        return "color-empty";
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                                dayStroke={this.state.dayStroke}
                            />
                        </div>
                    ) : null}

                    <div className="center">
                        <Button
                            id="upload_button"
                            color="blue"
                            size="huge"
                            onClick={this.moveToUploadPage}
                        >
                            업로드
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        }
    };
};

const mapStateToProps = state => {
    return {
        store: state
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
