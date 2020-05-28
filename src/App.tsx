import React, {useEffect, Fragment, useState} from 'react';
import './App.css';
import gql from "graphql-tag";
import {useCreateUserMutation, useGetBoardsLazyQuery, useJoinBoardMutation} from "./generated/graphql";
import Board from "./components/Board/Board";


function App() {

  const [user, setUser] = useState();
  const [board, setBoard] = useState();

  const [createUser, {data: createUserData, loading: createUserLoading, error: createUserError}] = useCreateUserMutation();
  const [getBoards, {data: getBoardsData, loading: getBoardsLoading, error: getBoardsError}] = useGetBoardsLazyQuery();

  useEffect(() => {
    createUser();
    getBoards();
  }, [createUser, getBoards]);

  useEffect(() => {
    if (createUserData) {
      setUser(createUserData.createUser)
    }
  }, [createUserData]);

  useEffect(() => {
    if (getBoardsData && getBoardsData.getBoards.length > 0) {
      setBoard(getBoardsData.getBoards[0])
    } else {
      // create Board
    }
  }, [getBoardsData]);

  return (
      <Fragment>
        {board &&
        <Board board={board} user={user} />}
      </Fragment>

  );
}

export default App;

const CREATE_USER = gql`
  mutation createUser {
    createUser {
      id
      color
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard {
    createBoard {
      id
    }
  }
`;

const GET_BOARDS = gql`
  query getBoards {
    getBoards {
      id
    }
  }
`;
