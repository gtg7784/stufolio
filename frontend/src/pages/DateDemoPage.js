import React, { Component } from "react";
import "react-calendar-heatmap/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";

class Test extends Component {
    handleClick = value => {
        console.log(value);
        alert(value.date + "에는 " + value.count + "만큼 올리셨습니다.");
    };

    render() {
        var date = new Date();
        var lastMonth;
        if (date.getMonth == 1) {
            lastMonth = date.getFullYear() + "/" + 12 + "/" + date.getDate();
        } else {
            lastMonth =
                date.getFullYear() +
                "/" +
                (date.getMonth() - 1) +
                "/" +
                (date.getDate() - date.getDay() - 2);
        }
        return (
            <div>
                <CalendarHeatmap
                    startDate={new Date(lastMonth)}
                    endDate={date}
                    onClick={this.handleClick}
                    horizontal={false}
                    values={[
                        { date: "2018-08-19" },
                        { date: "2018-08-20" },
                        { date: "2018-08-21" }
                    ]}
                />
            </div>
        );
    }
}

export default Test;
