import React, {useEffect, useState} from 'react';
import './Board.css';

import {UserComponent} from '../User/User';
import {
    Board,
    useExitBoardMutation,
    useJoinBoardMutation,
    User,
    useUpdateUserPointMutation
} from "../../generated/graphql";
import gql from "graphql-tag";

export default function BoardComponent({board, user}: { board: Board, user: User }) {
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [joinBoard, {data: joinBoardData}] = useJoinBoardMutation();
    const [exitBoard, {data: exitBoardData}] = useExitBoardMutation();
    const [updateUserPoint, {data: updateUserPointData}] = useUpdateUserPointMutation();

    useEffect(() => {
        if (user && board) {
            joinBoard({variables: {boardId: board.id, userId: user.id}})
        }
        return () => {
            exitBoard({variables: {boardId: board.id, userId: user.id}})
        }
    }, [joinBoard, exitBoard, user, board]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setX(e.clientX);
        setY(e.clientY);
        updateUserPoint({variables: {boardId: board.id, userId: user.id, point: {x, y}}});
    };


    return (
        <section className="Board" onMouseMove={throttle(handleMouseMove, 1000/18)}>
            {/*{user && <UserComponent user={user} x={x} y={y}/>}*/}
            {!!board && !!board.users && board.users.map( user => user.point.x && user.point.y && <UserComponent key={user.id} user={user} x={user.point.x} y={user.point.y}/>)}
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

const UPDATE_USER_POINT = gql`
    mutation updateUserPoint($boardId: String!, $userId: String!, $point: PointInput!) {
        updateUserPoint(userId: $userId, boardId: $boardId, point: $point) {
            id
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
