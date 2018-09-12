import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "pages";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { PersistGate } from "redux-persist/integration/react";

const Root = ({ store, persistor }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login/" component={Login} />
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    persistor: PropTypes.object.isRequired
};

export default Root;
