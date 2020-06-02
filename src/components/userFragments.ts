import gql from 'graphql-tag';

export const UserFragments = {
    app: gql`
        fragment UserApp on User {
            id
            color
        }
    `,
    board: gql`
        fragment UserBoard on User {
            id
            color
        }
    `,
    user: gql`
        fragment User on User {
            id
            color
            point {
                x
                y
            }
        }
    `,
}
