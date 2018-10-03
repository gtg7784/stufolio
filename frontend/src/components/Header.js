import React from "react";
import { Button, Icon } from "semantic-ui-react";

import "components/Header.css";
import "pages/Template.css";

function componentName({ profileButton, searchButton, logoutButton }) {
    return (
        <div className="header_w_buttons">
            {profileButton}
            <span className="headertext">STUFOLIO</span>
            {logoutButton}
            {searchButton}
        </div>
    );
}

export default componentName;
