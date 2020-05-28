import React from 'react';
import './User.css';
import {User} from "../../generated/graphql";

// @ts-ignore
export default function UserComponent(data) {
    const user: User = data;

    const styles = {
        fill: user.color
    };



    return (
        // <div className="User" style={styles} />
        <svg version="1.1" id="Layer_1"
             x="0px" y="0px"
             viewBox="9.2 7.3 14.4 14.4"
             className="User"
        >
            <polygon fill="#FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "/>
            <polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 "/>
            <rect style={styles} x="12.5" y="13.6"
                  transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/>
            <polygon style={styles} points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/>
        </svg>
    )

}
