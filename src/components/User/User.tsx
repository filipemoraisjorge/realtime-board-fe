import React from 'react';
import './User.css';
import {User} from "../../generated/graphql";

// @ts-ignore
export default function UserComponent({user}) {
    const _user: User = user;

    const styles = {
        fill: _user.color
    };

    return (
        // <div className="User" style={styles} />
        <svg version="1.1" id="Layer_1"
             x="0px" y="0px"
             viewBox="9.2 7.3 14.4 14.4"
             className="User"
        >
            <rect style={styles} x="12.5" y="13.6"
                  transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/>
            <polygon style={styles} points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/>
        </svg>
    )

}
