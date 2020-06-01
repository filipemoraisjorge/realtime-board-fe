import React, {useEffect} from 'react';
import './Board.css';

import {UserComponent} from '../User/User';
import {
    Board,
    useExitBoardMutation,
    useJoinBoardMutation,
    User,
    useUpdatePointMutation,
    useUpdateUserPointMutation
} from "../../generated/graphql";
import gql from "graphql-tag";

export default function BoardComponent({board, user}: { board: Board, user: User }) {

    const [joinBoard, {data: joinBoardData}] = useJoinBoardMutation();
    const [exitBoard, {data: exitBoardData}] = useExitBoardMutation();
    const [updateUserPoint, {data: updateUserPointData}] = useUpdateUserPointMutation();
    const [updatePoint, {data: updatePointData}] = useUpdatePointMutation();

    useEffect(function userJoinOrExitBoard() {
        const exit = () => {
            exitBoard({variables: {boardId: board.id, userId: user.id}});
        };

        if (user && board) {
            joinBoard({variables: {boardId: board.id, userId: user.id}});
            window.addEventListener('beforeunload', exit);
        }
        return () => {
            exit();
            window.removeEventListener('beforeunload', exit);
        }
    }, [joinBoard, exitBoard, user, board]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        updatePoint({variables: {userId: user.id, point: {x: e.clientX, y: e.clientY}}});
    };

    return (
        <section className="Board" onMouseMove={throttle(handleMouseMove, 1000 / 3)}>
            {!!board && !!board.users && board.users.map( user => {
                return <UserComponent key={user.id} user={user} />

            })}
            {!!board && !!board.users && board.users.map( user => {
                return <span key={user.id} style={{color: user.color}}>{user.color}</span>

            })}
        </section>)

}

const JOIN_BOARD = gql`
    mutation joinBoard($boardId: String!, $userId: String!) {
        joinBoard(userId: $userId, boardId: $boardId)
    }
`;

const EXIT_BOARD = gql`
    mutation exitBoard($boardId: String!, $userId: String!) {
        exitBoard(userId: $userId, boardId: $boardId)
    }
`;

const UPDATE_POINT = gql`
    mutation updatePoint($userId: String!, $point: PointInput!) {
        updatePoint(userId: $userId, point: $point) {
            id
        }
    }
`;

const NEW_USER_POINTS_SUBSCRIPTION = gql`
    subscription newUserPoints {
        newUserPoints {
            id
            color
            point {
                x
                y
            }
        }
    }
`;

// @ts-ignore
const throttle = (func, limit: number) => {
    let inThrottle: boolean;
    return function() {
        const args = arguments;
        // @ts-ignore
        const context: unknown = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit)
        }
    }
};

