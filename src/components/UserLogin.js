
import { getUserUniqueAssetAmount } from '../queries/queries'
import { useQuery, gql } from '@apollo/client';

const UserLogin = () => {

    const { loading, error, data } = useQuery(getUserUniqueAssetAmount, {
      variables: {
        accountId: "0x0eeacd4c475040463389d15ead034d1291b008b1"
      }
    });
  
    console.log(data);

    return (
        <div className="flex flex-col">
            <div >
                Account: {data.account.id}
            </div>
            <div >
                uniqueAssetsCount: {data.account.uniqueAssetsCount}
            </div>
        </div>
    )
}

export default UserLogin;