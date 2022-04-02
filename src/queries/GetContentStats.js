import { getContentStats } from './queries'
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const ContentStatsData = props => {
    const [state, setState] = useState({
        contentStatisticsManager: null,
      });
    return state;
}

const GetContentStatsDataQuery = () => {
   const { loading, error, data } = useQuery(getContentStats);
 
   if (loading) {
     return <div>Loading...</div>;
   }
   if (error) {
     console.error(error);
     return <div>{error.message}</div>;
   }
   return <ContentStatsData contentStatisticsManager={data.contentStatisticsManager} />;
}

export default GetContentStatsDataQuery;