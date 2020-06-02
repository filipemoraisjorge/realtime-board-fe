import React, {Fragment, FunctionComponent, useEffect, useState} from 'react';
import './User.css';
import {useGetUserLazyQuery, User} from "../../generated/graphql";
import gql from "graphql-tag";
import {UserFragments} from "../userFragments";


type UserProps = {
    userId: string
}

export const UserComponent: FunctionComponent<UserProps> = ({userId}) => {

    const [user, setUser] = useState<User>();
    const [getUserLazyQuery, {data: getUserData, loading: getUserLoading, subscribeToMore}] = useGetUserLazyQuery();

    useEffect(() => {
        if (userId) {
            getUserLazyQuery({variables: {userId: userId}})
        }
    }, [userId])

    useEffect(function subscribeToMoreUserPointUpdates() {
        const subscribeToMoreUserPointUpdates = () =>
            subscribeToMore({
                document: NEW_USER_POINT_SUBSCRIPTION,
                variables: {userId: userId},
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    // @ts-ignore
                    const incomingUser = subscriptionData.data.newUserPoint;
                    return {getUser: incomingUser};
                }
            });

        if (typeof subscribeToMore === 'function') {
            subscribeToMoreUserPointUpdates()
        }
    }, [subscribeToMore]);

    useEffect(function handlingGetUser() {
        if (!!getUserData) {
            const {getUser} = getUserData;
            if (getUser) {
                setUser(getUser)
            }
        }
    }, [getUserData]);

    const styles = (user: User): React.CSSProperties => {

    return {
        position: 'absolute',
        top: `${user.point.y || 0}px`,
        left: `${user.point.x || 0}px`,
    }};

    const svgStyles = (user: User) => ({
        fill: user.color
    });

    return (
        <Fragment>
            {getUserLoading && <div>L</div>}
            {!getUserLoading && user && <div style={styles(user)}>
                <svg version="1.1" id="Layer_1"
                     x="0px" y="0px"
                     viewBox="9.2 7.3 14.4 14.4"
                     className="User"
                >
                    <rect style={svgStyles(user)} x="12.5" y="13.6"
                          transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
                          width="2"
                          height="8"/>
                    <polygon style={svgStyles(user)} points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/>
                </svg>
                <span style={{color: user.color}}>{user.id}</span>
            </div>
            }
        </Fragment>
    )

};

const NEW_USER_POINT_SUBSCRIPTION = gql`
    subscription newUserPoint( $userId: ID!) {
        newUserPoint(userId: $userId) {
            ...User
        }
    }
    ${UserFragments.user}
`;

const GET_USER_QUERY = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            ...User
        }
    }
    ${UserFragments.user}
`;
