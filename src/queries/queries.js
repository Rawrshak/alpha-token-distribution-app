import { gql } from '@apollo/client';

export const getUserData = gql`
    query GetUserData($accountId: String!) {
        account (id: $accountId) {
            id
            uniqueAssetsCount
            ordersCount
            orderFillsCount
            cancelledOrdersCount
            claimedOrdersCount
            makerVolume 
            takerVolume
            daysActive
            contractsDeployedCount
            assetsDeployedCount
            week1 {
                points
                disqualified
            }
            week2 {
                points
                disqualified
                bonus
            }
            week3 {
                points
                disqualified
                bonus
            }
        }
    }
`

export const getSystemData = gql`
    query GetSystemData {
        exchange (id: "0xd73651871acc74657e51a7233edf247c7c7495ee") {
            id
            ordersCount
            orderFillsCount
            ordersClaimedCount
            ordersCancelledCount
            makerVolume
            takerVolume
            totalUserActiveDays
        }
    }
`

export const getContentStats = gql`
    query GetContentStats {
        contentStatisticsManager (id: "0x35c18b621c5b5ccf29e3edec5ae0ac98b26192d3") {
            id
            contentsCount
            assetsCount
            accountsCount
            uniqueAssetsCount
            w1TotalPoints
            w2TotalPoints
            w3TotalPoints
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