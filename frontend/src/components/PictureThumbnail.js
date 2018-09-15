import React from "react";
import { Image } from "semantic-ui-react";

import "components/Profile.css";

const PictureThumbnail = ({ picture, alt }) => (
    <div>
        <Image src={picture} size="medium" alt={alt} wrapped />
    </div>
);

export default PictureThumbnail;
