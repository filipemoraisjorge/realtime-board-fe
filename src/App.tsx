import React, {useEffect, Fragment, useState} from 'react';
import './App.css';
import gql from "graphql-tag";
import {
  useCreateUserMutation,
  useGetBoardsLazyQuery,
  useCreateBoardMutation,
  useNewUserPointsSubscription
} from "./generated/graphql";
import Board from "./components/Board/Board";
import {debuglog} from "util";


function App() {

  const [user, setUser] = useState();
  const [board, setBoard] = useState();

  const [createUser, {data: createUserData, loading: createUserLoading, error: createUserError}] = useCreateUserMutation();
  const [createBoard, {data: createBoardData, loading: createBoardLoading, error: createBoardError}] = useCreateBoardMutation();
  const [getBoards, {data: getBoardsData, loading: getBoardsLoading, error: getBoardsError}] = useGetBoardsLazyQuery();
  const {data: dataNewUserPoints} = useNewUserPointsSubscription();

  useEffect(function initCalls() {
    createUser();
    getBoards();
  }, [createUser, getBoards]);

  useEffect(function handleNewUserPointsSubscription () {
    if (board?.users && dataNewUserPoints?.newUserPoints) {
      board.users = dataNewUserPoints?.newUserPoints;
      setBoard(board)
    }
  }, [dataNewUserPoints, board, setBoard]);


  useEffect(() => {
    if (createUserData) {
      setUser(createUserData.createUser)
    }
  }, [createUserData]);

  useEffect(function SelectFirstBoardOrCreateNewBoard () {
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
        {board &&
        <Board key={board.id} board={board} user={user} />}
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
      users {
        id
        color
        point {
          x
          y
        }
      }
    }
  }
`;

const GET_BOARDS = gql`
  query getBoards {
    getBoards {
      id
      users {
        id
        color
        point {
          x
          y
        }
      }
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
