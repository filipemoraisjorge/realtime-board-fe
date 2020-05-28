import React, {useEffect, useState} from 'react';
import './Board.css';

import UserComponent from '../User/User';
import {Board, useJoinBoardMutation, User} from "../../generated/graphql";
import gql from "graphql-tag";

export default function BoardComponent({board, user}: { board: Board, user: User }) {
    const [joinBoard, {data}] = useJoinBoardMutation();

    useEffect(() => {
        if (user && board) {
            joinBoard({variables: {boardId: board.id, userId: user.id}})
        }
    }, [joinBoard, user, board]);

    return <div className="Board">
        {user && <UserComponent user={user}/>}
    </div>

}

const JOIN_BOARD = gql`
    mutation joinBoard($boardId: String!, $userId: String!) {
        joinBoard(userId: $userId, boardId: $boardId)
    }
`;
