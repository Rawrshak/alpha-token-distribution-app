import { getSystemData } from '../queries/queries'
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const ExchangeDataProps = props => {
    const [state, setState] = useState({
        exchange: null,
      });
    return state;
}

const GetExchangeDataQuery = () => {
   const { loading, error, data } = useQuery(getSystemData);
 
   if (loading) {
     return <div>Loading...</div>;
   }
   if (error) {
     console.error(error);
     return <div>{error.message}</div>;
   }
   return <ExchangeDataProps exchange={data.exchange} />;
}

export default GetExchangeDataQuery;