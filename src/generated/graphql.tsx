import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Point = {
  __typename?: 'Point';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['ID'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  point: Point;
  color: Scalars['String'];
};

export type PointInput = {
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getBoard?: Maybe<Board>;
  getBoards: Array<Board>;
  getBoardUsers?: Maybe<Array<User>>;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['String'];
};


export type QueryGetBoardUsersArgs = {
  boardId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  updateUserPoint?: Maybe<Board>;
  joinBoard?: Maybe<Scalars['Boolean']>;
  exitBoard?: Maybe<Scalars['Boolean']>;
  createUser: User;
  updatePoint?: Maybe<User>;
};


export type MutationUpdateUserPointArgs = {
  point: PointInput;
  userId: Scalars['String'];
  boardId: Scalars['String'];
};


export type MutationJoinBoardArgs = {
  userId: Scalars['String'];
  boardId: Scalars['String'];
};


export type MutationExitBoardArgs = {
  userId: Scalars['String'];
  boardId: Scalars['String'];
};


export type MutationUpdatePointArgs = {
  point: PointInput;
  userId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newUserPoints: Array<User>;
  newUserPoint: User;
};


export type SubscriptionNewUserPointArgs = {
  userId: Scalars['ID'];
};

export type CreateUserMutationVariables = {};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'color'>
    & { point: (
      { __typename?: 'Point' }
      & Pick<Point, 'x' | 'y'>
    ) }
  ) }
);

export type CreateBoardMutationVariables = {};


export type CreateBoardMutation = (
  { __typename?: 'Mutation' }
  & { createBoard: (
    { __typename?: 'Board' }
    & Pick<Board, 'id'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'color'>
      & { point: (
        { __typename?: 'Point' }
        & Pick<Point, 'x' | 'y'>
      ) }
    )> }
  ) }
);

export type GetBoardsQueryVariables = {};


export type GetBoardsQuery = (
  { __typename?: 'Query' }
  & { getBoards: Array<(
    { __typename?: 'Board' }
    & Pick<Board, 'id'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'color'>
      & { point: (
        { __typename?: 'Point' }
        & Pick<Point, 'x' | 'y'>
      ) }
    )> }
  )> }
);

export type JoinBoardMutationVariables = {
  boardId: Scalars['String'];
  userId: Scalars['String'];
};


export type JoinBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinBoard'>
);

export type ExitBoardMutationVariables = {
  boardId: Scalars['String'];
  userId: Scalars['String'];
};


export type ExitBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'exitBoard'>
);

export type UpdateUserPointMutationVariables = {
  boardId: Scalars['String'];
  userId: Scalars['String'];
  point: PointInput;
};


export type UpdateUserPointMutation = (
  { __typename?: 'Mutation' }
  & { updateUserPoint?: Maybe<(
    { __typename?: 'Board' }
    & Pick<Board, 'id'>
  )> }
);

export type UpdatePointMutationVariables = {
  userId: Scalars['String'];
  point: PointInput;
};


export type UpdatePointMutation = (
  { __typename?: 'Mutation' }
  & { updatePoint?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type NewUserPointsSubscriptionVariables = {};


export type NewUserPointsSubscription = (
  { __typename?: 'Subscription' }
  & { newUserPoints: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'color'>
    & { point: (
      { __typename?: 'Point' }
      & Pick<Point, 'x' | 'y'>
    ) }
  )> }
);

export type NewUserPointSubscriptionVariables = {
  userId: Scalars['ID'];
};


export type NewUserPointSubscription = (
  { __typename?: 'Subscription' }
  & { newUserPoint: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'color'>
    & { point: (
      { __typename?: 'Point' }
      & Pick<Point, 'x' | 'y'>
    ) }
  ) }
);


export const CreateUserDocument = gql`
    mutation createUser {
  createUser {
    id
    color
    point {
      x
      y
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>
    } & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps, TDataName>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateBoardDocument = gql`
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
export type CreateBoardMutationFn = ApolloReactCommon.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;
export type CreateBoardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateBoardMutation, CreateBoardMutationVariables>, 'mutation'>;

    export const CreateBoardComponent = (props: CreateBoardComponentProps) => (
      <ApolloReactComponents.Mutation<CreateBoardMutation, CreateBoardMutationVariables> mutation={CreateBoardDocument} {...props} />
    );
    
export type CreateBoardProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>
    } & TChildProps;
export function withCreateBoard<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  CreateBoardProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateBoardMutation, CreateBoardMutationVariables, CreateBoardProps<TChildProps, TDataName>>(CreateBoardDocument, {
      alias: 'createBoard',
      ...operationOptions
    });
};

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, baseOptions);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = ApolloReactCommon.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const GetBoardsDocument = gql`
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
export type GetBoardsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetBoardsQuery, GetBoardsQueryVariables>, 'query'>;

    export const GetBoardsComponent = (props: GetBoardsComponentProps) => (
      <ApolloReactComponents.Query<GetBoardsQuery, GetBoardsQueryVariables> query={GetBoardsDocument} {...props} />
    );
    
export type GetBoardsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetBoardsQuery, GetBoardsQueryVariables>
    } & TChildProps;
export function withGetBoards<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetBoardsQuery,
  GetBoardsQueryVariables,
  GetBoardsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetBoardsQuery, GetBoardsQueryVariables, GetBoardsProps<TChildProps, TDataName>>(GetBoardsDocument, {
      alias: 'getBoards',
      ...operationOptions
    });
};

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, baseOptions);
      }
export function useGetBoardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, baseOptions);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = ApolloReactCommon.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const JoinBoardDocument = gql`
    mutation joinBoard($boardId: String!, $userId: String!) {
  joinBoard(userId: $userId, boardId: $boardId)
}
    `;
export type JoinBoardMutationFn = ApolloReactCommon.MutationFunction<JoinBoardMutation, JoinBoardMutationVariables>;
export type JoinBoardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinBoardMutation, JoinBoardMutationVariables>, 'mutation'>;

    export const JoinBoardComponent = (props: JoinBoardComponentProps) => (
      <ApolloReactComponents.Mutation<JoinBoardMutation, JoinBoardMutationVariables> mutation={JoinBoardDocument} {...props} />
    );
    
export type JoinBoardProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<JoinBoardMutation, JoinBoardMutationVariables>
    } & TChildProps;
export function withJoinBoard<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  JoinBoardMutation,
  JoinBoardMutationVariables,
  JoinBoardProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, JoinBoardMutation, JoinBoardMutationVariables, JoinBoardProps<TChildProps, TDataName>>(JoinBoardDocument, {
      alias: 'joinBoard',
      ...operationOptions
    });
};

/**
 * __useJoinBoardMutation__
 *
 * To run a mutation, you first call `useJoinBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinBoardMutation, { data, loading, error }] = useJoinBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useJoinBoardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinBoardMutation, JoinBoardMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinBoardMutation, JoinBoardMutationVariables>(JoinBoardDocument, baseOptions);
      }
export type JoinBoardMutationHookResult = ReturnType<typeof useJoinBoardMutation>;
export type JoinBoardMutationResult = ApolloReactCommon.MutationResult<JoinBoardMutation>;
export type JoinBoardMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinBoardMutation, JoinBoardMutationVariables>;
export const ExitBoardDocument = gql`
    mutation exitBoard($boardId: String!, $userId: String!) {
  exitBoard(userId: $userId, boardId: $boardId)
}
    `;
export type ExitBoardMutationFn = ApolloReactCommon.MutationFunction<ExitBoardMutation, ExitBoardMutationVariables>;
export type ExitBoardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ExitBoardMutation, ExitBoardMutationVariables>, 'mutation'>;

    export const ExitBoardComponent = (props: ExitBoardComponentProps) => (
      <ApolloReactComponents.Mutation<ExitBoardMutation, ExitBoardMutationVariables> mutation={ExitBoardDocument} {...props} />
    );
    
export type ExitBoardProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<ExitBoardMutation, ExitBoardMutationVariables>
    } & TChildProps;
export function withExitBoard<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ExitBoardMutation,
  ExitBoardMutationVariables,
  ExitBoardProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ExitBoardMutation, ExitBoardMutationVariables, ExitBoardProps<TChildProps, TDataName>>(ExitBoardDocument, {
      alias: 'exitBoard',
      ...operationOptions
    });
};

/**
 * __useExitBoardMutation__
 *
 * To run a mutation, you first call `useExitBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExitBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exitBoardMutation, { data, loading, error }] = useExitBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useExitBoardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ExitBoardMutation, ExitBoardMutationVariables>) {
        return ApolloReactHooks.useMutation<ExitBoardMutation, ExitBoardMutationVariables>(ExitBoardDocument, baseOptions);
      }
export type ExitBoardMutationHookResult = ReturnType<typeof useExitBoardMutation>;
export type ExitBoardMutationResult = ApolloReactCommon.MutationResult<ExitBoardMutation>;
export type ExitBoardMutationOptions = ApolloReactCommon.BaseMutationOptions<ExitBoardMutation, ExitBoardMutationVariables>;
export const UpdateUserPointDocument = gql`
    mutation updateUserPoint($boardId: String!, $userId: String!, $point: PointInput!) {
  updateUserPoint(userId: $userId, boardId: $boardId, point: $point) {
    id
  }
}
    `;
export type UpdateUserPointMutationFn = ApolloReactCommon.MutationFunction<UpdateUserPointMutation, UpdateUserPointMutationVariables>;
export type UpdateUserPointComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserPointMutation, UpdateUserPointMutationVariables>, 'mutation'>;

    export const UpdateUserPointComponent = (props: UpdateUserPointComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserPointMutation, UpdateUserPointMutationVariables> mutation={UpdateUserPointDocument} {...props} />
    );
    
export type UpdateUserPointProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserPointMutation, UpdateUserPointMutationVariables>
    } & TChildProps;
export function withUpdateUserPoint<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserPointMutation,
  UpdateUserPointMutationVariables,
  UpdateUserPointProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserPointMutation, UpdateUserPointMutationVariables, UpdateUserPointProps<TChildProps, TDataName>>(UpdateUserPointDocument, {
      alias: 'updateUserPoint',
      ...operationOptions
    });
};

/**
 * __useUpdateUserPointMutation__
 *
 * To run a mutation, you first call `useUpdateUserPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPointMutation, { data, loading, error }] = useUpdateUserPointMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      userId: // value for 'userId'
 *      point: // value for 'point'
 *   },
 * });
 */
export function useUpdateUserPointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserPointMutation, UpdateUserPointMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserPointMutation, UpdateUserPointMutationVariables>(UpdateUserPointDocument, baseOptions);
      }
export type UpdateUserPointMutationHookResult = ReturnType<typeof useUpdateUserPointMutation>;
export type UpdateUserPointMutationResult = ApolloReactCommon.MutationResult<UpdateUserPointMutation>;
export type UpdateUserPointMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserPointMutation, UpdateUserPointMutationVariables>;
export const UpdatePointDocument = gql`
    mutation updatePoint($userId: String!, $point: PointInput!) {
  updatePoint(userId: $userId, point: $point) {
    id
  }
}
    `;
export type UpdatePointMutationFn = ApolloReactCommon.MutationFunction<UpdatePointMutation, UpdatePointMutationVariables>;
export type UpdatePointComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePointMutation, UpdatePointMutationVariables>, 'mutation'>;

    export const UpdatePointComponent = (props: UpdatePointComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePointMutation, UpdatePointMutationVariables> mutation={UpdatePointDocument} {...props} />
    );
    
export type UpdatePointProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdatePointMutation, UpdatePointMutationVariables>
    } & TChildProps;
export function withUpdatePoint<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePointMutation,
  UpdatePointMutationVariables,
  UpdatePointProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePointMutation, UpdatePointMutationVariables, UpdatePointProps<TChildProps, TDataName>>(UpdatePointDocument, {
      alias: 'updatePoint',
      ...operationOptions
    });
};

/**
 * __useUpdatePointMutation__
 *
 * To run a mutation, you first call `useUpdatePointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePointMutation, { data, loading, error }] = useUpdatePointMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      point: // value for 'point'
 *   },
 * });
 */
export function useUpdatePointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePointMutation, UpdatePointMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePointMutation, UpdatePointMutationVariables>(UpdatePointDocument, baseOptions);
      }
export type UpdatePointMutationHookResult = ReturnType<typeof useUpdatePointMutation>;
export type UpdatePointMutationResult = ApolloReactCommon.MutationResult<UpdatePointMutation>;
export type UpdatePointMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePointMutation, UpdatePointMutationVariables>;
export const NewUserPointsDocument = gql`
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
export type NewUserPointsComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<NewUserPointsSubscription, NewUserPointsSubscriptionVariables>, 'subscription'>;

    export const NewUserPointsComponent = (props: NewUserPointsComponentProps) => (
      <ApolloReactComponents.Subscription<NewUserPointsSubscription, NewUserPointsSubscriptionVariables> subscription={NewUserPointsDocument} {...props} />
    );
    
export type NewUserPointsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<NewUserPointsSubscription, NewUserPointsSubscriptionVariables>
    } & TChildProps;
export function withNewUserPoints<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NewUserPointsSubscription,
  NewUserPointsSubscriptionVariables,
  NewUserPointsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, NewUserPointsSubscription, NewUserPointsSubscriptionVariables, NewUserPointsProps<TChildProps, TDataName>>(NewUserPointsDocument, {
      alias: 'newUserPoints',
      ...operationOptions
    });
};

/**
 * __useNewUserPointsSubscription__
 *
 * To run a query within a React component, call `useNewUserPointsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewUserPointsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserPointsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewUserPointsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewUserPointsSubscription, NewUserPointsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewUserPointsSubscription, NewUserPointsSubscriptionVariables>(NewUserPointsDocument, baseOptions);
      }
export type NewUserPointsSubscriptionHookResult = ReturnType<typeof useNewUserPointsSubscription>;
export type NewUserPointsSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewUserPointsSubscription>;
export const NewUserPointDocument = gql`
    subscription newUserPoint($userId: ID!) {
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
export type NewUserPointComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<NewUserPointSubscription, NewUserPointSubscriptionVariables>, 'subscription'>;

    export const NewUserPointComponent = (props: NewUserPointComponentProps) => (
      <ApolloReactComponents.Subscription<NewUserPointSubscription, NewUserPointSubscriptionVariables> subscription={NewUserPointDocument} {...props} />
    );
    
export type NewUserPointProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<NewUserPointSubscription, NewUserPointSubscriptionVariables>
    } & TChildProps;
export function withNewUserPoint<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NewUserPointSubscription,
  NewUserPointSubscriptionVariables,
  NewUserPointProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, NewUserPointSubscription, NewUserPointSubscriptionVariables, NewUserPointProps<TChildProps, TDataName>>(NewUserPointDocument, {
      alias: 'newUserPoint',
      ...operationOptions
    });
};

/**
 * __useNewUserPointSubscription__
 *
 * To run a query within a React component, call `useNewUserPointSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewUserPointSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserPointSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewUserPointSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewUserPointSubscription, NewUserPointSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewUserPointSubscription, NewUserPointSubscriptionVariables>(NewUserPointDocument, baseOptions);
      }
export type NewUserPointSubscriptionHookResult = ReturnType<typeof useNewUserPointSubscription>;
export type NewUserPointSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewUserPointSubscription>;