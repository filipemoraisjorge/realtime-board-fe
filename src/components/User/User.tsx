import React, {FunctionComponent, useEffect, useState} from 'react';
import './User.css';
import {useNewUserPointSubscription, User} from "../../generated/graphql";
import gql from "graphql-tag";


type UserProps = {
    user: User
}

export const UserComponent: FunctionComponent<UserProps> = ({user}) => {

    const [x, setX] = useState();
    const [y, setY] = useState();
    const {data: dataNewUserPoint, loading: loadingNewUserPoint} = useNewUserPointSubscription({variables: { userId: user.id}});

    useEffect(function handleNewUserPointSubscription() {
        if (!loadingNewUserPoint && dataNewUserPoint) {
            const {newUserPoint: {point: {x: newX, y: newY}}} = dataNewUserPoint;
            setX(newX || x);
            setY(newY || y);
        }
    }, [dataNewUserPoint, loadingNewUserPoint, x, y]);

    const styles: React.CSSProperties = {
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
    };

    const svgStyles = {
        fill: user.color
    };

    return (
        <div style={styles}>
            <svg version="1.1" id="Layer_1"
                 x="0px" y="0px"
                 viewBox="9.2 7.3 14.4 14.4"
                 className="User"
            >
                <rect style={svgStyles} x="12.5" y="13.6"
                      transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/>
                <polygon style={svgStyles} points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/>
            </svg>
            <span style={{color: user.color}}>{user.color}</span>
        </div>
    )

};

const NEW_USER_POINT_SUBSCRIPTION = gql`
    subscription newUserPoint( $userId: ID!) {
        newUserPoint(userId: $userId) {
            id
            color
            point {
                x
                y
            }
        }
    }
`;
