import { getSystemData } from '../queries/queries'
import { useQuery } from '@apollo/client';

const GetExchangeData = () => {
   const { loading, error, data } = useQuery(getSystemData);
 
    if (loading) {
        console.log("Exchange is still loading...");
        return null;
    }

    if (error) {
        console.error(error);
        return null;
    }

   return data.exchange;
}

export default GetExchangeData;