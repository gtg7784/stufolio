import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./client/Root";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import store from "./store";

var module = store();

ReactDOM.render(
    <Root store={module.store} persistor={module.persistor} />,
    document.getElementById("root")
);
registerServiceWorker();
