import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import gql from "graphql-tag";
import {useCreateBoardMutation, useCreateUserMutation, useGetBoardsLazyQuery,} from "./generated/graphql";
import Board from "./components/Board/Board";


function App() {

  const [user, setUser] = useState();
  const [board, setBoard] = useState();

  const [createUser, {data: createUserData, loading: createUserLoading, error: createUserError}] = useCreateUserMutation();
  const [createBoard, {data: createBoardData, loading: createBoardLoading, error: createBoardError}] = useCreateBoardMutation();
  const [getBoards, {data: getBoardsData, loading: getBoardsLoading, error: getBoardsError}] = useGetBoardsLazyQuery();

  useEffect(function initCalls() {
    createUser();
    getBoards();
  }, [createUser, getBoards]);


  useEffect(() => {
    if (createUserData) {
      setUser(createUserData.createUser)
    }
  }, [createUserData]);

  useEffect(function SelectFirstBoardOrCreateNewBoard() {
    if (getBoardsData !== undefined) {
      if (getBoardsData.getBoards.length > 0) {
        setBoard(getBoardsData.getBoards[0])
      } else {
        createBoard().then((result) => {
          setBoard(result.data?.createBoard)
        });
      }
    }
  }, [createBoard, getBoardsData]);
  return (
      <Fragment>
        {board && user &&
        <Board key={board.id} board={board} currentUser={user}/>}
      </Fragment>

  );
}

export default App;

const USER_FRAGMENT = gql`
  fragment User on User {
    id
    color
    point {
      x
      y
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser {
    createUser {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

const CREATE_BOARD = gql`
  mutation createBoard {
    createBoard {
      id
      users {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`;

const GET_BOARDS = gql`
  query getBoards {
    getBoards {
      id
      users {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`;

