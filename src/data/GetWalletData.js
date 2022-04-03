import { getUserData } from '../queries/queries'
import { useQuery } from '@apollo/client';

function GetWalletData(walletAddress) {

    // Query the account's data
    const { loading, error, data } = useQuery(getUserData, {
        variables: {
            accountId: walletAddress
        }
    });
    
    if (loading) {
        console.log("Wallet Data is still loading...");
        return null;
    }
    if (error) {
        console.error(error);
        return null;
    }

    return data.account;
}

export default GetWalletData;