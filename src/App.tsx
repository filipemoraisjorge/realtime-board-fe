import React, {useEffect, Fragment} from 'react';
import './App.css';
import gql from "graphql-tag";
import {useCreateUserMutation} from "./generated/graphql";
import User from './components/User/User';


function App() {

  const [createUser, {data, loading: createUserLoading, error: createUserError}] = useCreateUserMutation();

  useEffect(() => {
    createUser();
  }, [createUser]);

  useEffect(() => {
    createUser();
  }, [createUser]);

  return (
      <Fragment>
        {createUserLoading && <div>Loading...</div>}
        {createUserError && <div>Error: {createUserError}</div>}
        {data && !(createUserLoading || createUserError) && <User user={data.createUser}/>}
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
