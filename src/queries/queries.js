import { gql } from '@apollo/client';

export const getUserUniqueAssetAmount = gql`
    query GetUserUniqueAssetAmount($accountId: String!) {
        account (id: $accountId) {
            id
            uniqueAssetsCount
        }
    }
`

export const getAllUsers = gql`
    query GetAllUsers {
        accounts {
            id
        }
    }
`