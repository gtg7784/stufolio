import React from "react";

import "components/Header.css";
import "pages/Template.css";

function componentName({ profileButton, searchButton, logoutButton }) {
    return (
        <div className="header_w_buttons">
            <span className="headertext">STUFOLIO</span>
            {logoutButton}
            {profileButton}
            {searchButton}
            
        </div>
    );
}

export default componentName;
