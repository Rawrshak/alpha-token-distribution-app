import { getContentStats } from '../queries/queries'
import { useQuery } from '@apollo/client';

const GetContentStatsManagerData = () => {
    const { loading, error, data } = useQuery(getContentStats);
 
    if (loading) {
        console.log("Contents Stats manager is still loading...");
        return null;
    }
    
    if (error) {
        console.error(error);
        return null;
    }
    return data.contentStatisticsManager;
}

export default GetContentStatsManagerData;