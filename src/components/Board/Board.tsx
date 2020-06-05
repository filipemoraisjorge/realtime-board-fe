import React, {useEffect, useState} from 'react';
import './Board.css';

import {UserComponent} from '../User/User';
import {
    Board,
    useExitBoardMutation,
    useGetBoardUsersLazyQuery,
    useJoinBoardMutation,
    User,
    UserBoardConnectE,
    UserBoardFragment,
    useUpdatePointMutation
} from "../../generated/graphql";
import gql from "graphql-tag";
import {UserFragments} from "../userFragments";

let inThrottle: boolean;
const throttle = (func: Function, limit: number) => {
    return function () {
        const args = arguments;
        // @ts-ignore
        const context: unknown = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false
            }, limit)
        }
    }
};


export default function BoardComponent({board, currentUser}: { board: Board, currentUser: User }) {

    const [joinBoard] = useJoinBoardMutation();
    const [exitBoard] = useExitBoardMutation();
    const [updatePoint] = useUpdatePointMutation();
    const [getBoardUsersLazyQuery, {data: getBoardUsersData, subscribeToMore}] = useGetBoardUsersLazyQuery({variables: {boardId: board.id}});

    const [users, setUsers] = useState(new Map<string, UserBoardFragment>(board.users.map(u => [u.id, u])));

    useEffect(function subscribeToMoreBoardUsersConnecting() {
        const subscribeToNewBoardUsers = () =>
            subscribeToMore({
                document: NEW_USER_BOARD_CONNECT,
                variables: {boardId: board.id},
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    // @ts-ignore
                    const {user: incomingUser, connect} = subscriptionData.data.newUserBoardConnect;
                    let newGetBoardUsers;
                    const {getBoardUsers} = prev;
                    switch (connect) {
                        case UserBoardConnectE.Join:
                            // @ts-ignore
                            newGetBoardUsers = [incomingUser, ...getBoardUsers];
                            break;
                        case UserBoardConnectE.Exit:
                            // @ts-ignore
                            newGetBoardUsers = getBoardUsers.filter(u => u.id !== incomingUser.id);
                            break;
                    }
                    return Object.assign({}, prev, {
                        getBoardUsers: newGetBoardUsers
                    });
                }
            })

        if (typeof subscribeToMore === 'function') {
            subscribeToNewBoardUsers()
        }
    }, [subscribeToMore]);

    useEffect(function handleGetBoardUserResponse() {
        if (!!getBoardUsersData) {
            const {getBoardUsers} = getBoardUsersData;
            if (getBoardUsers) {
                const boardUsersMap = new Map<string, UserBoardFragment>(getBoardUsers.map(u => [u.id, u]));
                setUsers(boardUsersMap)
            }
        }
    }, [getBoardUsersData]);

    useEffect(function userJoinOrExitBoard() {
        const exit = () => {
            exitBoard({variables: {boardId: board.id, userId: currentUser.id}});
        };

        if (currentUser && board) {
            joinBoard({variables: {boardId: board.id, userId: currentUser.id}})
                .then(result => {
                    if (result) {
                        getBoardUsersLazyQuery();
                    }
                });
            window.addEventListener('beforeunload', exit);
        }
        return () => {
            exit();
            window.removeEventListener('beforeunload', exit);
        }
    }, [joinBoard, exitBoard, currentUser, board]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        updatePoint({variables: {userId: currentUser.id, point: {x: e.clientX, y: e.clientY}}});
    };

    return (
        <section className="Board" onMouseMove={throttle(handleMouseMove,1000/60)}>
            {!!board && !!users && Array.from(users.values()).map(user => {
                return <UserComponent key={user.id} userId={user.id}/>

            })}
            <div className="Board__users">
                <h3>current user</h3>
                <div style={{color: currentUser.color}}>{currentUser.id}</div>
                <h3>board id</h3>
                <div>{board.id}</div>
                <h3>users</h3>
                {!!board && !!users && Array.from(users.values()).map(user => {
                    return <div key={`label-${user.id}`} style={{color: user.color}}>{user.id}</div>
                })}
            </div>
        </section>)
}

const JOIN_BOARD = gql`
    mutation joinBoard($boardId: ID!, $userId: ID!) {
        userBoardConnect(boardId: $boardId, userId: $userId, connect: JOIN)
    }
`;

const EXIT_BOARD = gql`
    mutation exitBoard($boardId: ID!, $userId: ID!) {
        userBoardConnect(boardId: $boardId, userId: $userId, connect: EXIT)
    }
`;

const UPDATE_POINT = gql`
    mutation updatePoint($userId: String!, $point: PointInput!) {
        updatePoint(userId: $userId, point: $point) {
            id
        }
    }
`;


const GET_BOARD_USERS = gql`
    query getBoardUsers($boardId: ID!) {
        getBoardUsers(boardId: $boardId) {
            ...UserBoard
        }
    }
    ${UserFragments.board}
`;


const NEW_USER_BOARD_CONNECT = gql`
    subscription newUserBoardConnect($boardId: ID!) {
        newUserBoardConnect(boardId: $boardId) {
            board {
                users {
                    ...UserBoard
                }
            }
            user {
                ...UserBoard
            }
            connect
        }
    }
    ${UserFragments.board}
`;



