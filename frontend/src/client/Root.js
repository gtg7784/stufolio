import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login, Register, Upload, Articles, Article } from "pages";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { PersistGate } from "redux-persist/integration/react";

const Root = ({ store, persistor }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login/" component={Login} />
                        <Route exact path="/register/" component={Register} />
                        <Route exact path="/upload/" component={Upload} />
                        <Route
                            exact
                            path="/articles/:user"
                            component={Articles}
                        />
                        <Route exact path="/article/:id" component={Article} />
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
