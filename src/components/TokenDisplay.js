import { getUserData } from '../queries/queries'
import { useQuery } from '@apollo/client';
import Logomark from './Logomark';
import { WebContext } from "../data/Web3Context";
import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import GetExchangeDataQuery from '../queries/GetExchangeData';
import GetContentStatsDataQuery from '../queries/GetContentStats';

const TokenDisplay = () => {
    const _1e18 = ethers.BigNumber.from('10').pow(ethers.BigNumber.from('18'));
    const web3Data = useContext(WebContext);
    const [accountData, setAccountData] = useState(0);
    // const [exchangeData, setExchangeData] = useState(0);

    // Query the account's data
    const { loading, error, data } = useQuery(getUserData, {
        variables: {
          accountId: web3Data.state.account
        }
    });
    
    if (loading) { console.log("Loading..."); }        
    if (error) console.error(`Error: ${error.message}`);

    // Once the data is received, get the account Data
    useEffect(() => {
        if (!loading) {
            setAccountData(data.account);
            console.log(data.account);
        }
    }, [loading, data]);

    let exchangeData = GetExchangeDataQuery();

    if (exchangeData.props.exchange) {
        // console.log(exchangeData);
        console.log(`Exchange Total Orders: ${exchangeData.props.exchange.ordersCount}`);
    }

    let contentStatsData = GetContentStatsDataQuery();

    if (contentStatsData.props.contentStatisticsManager) {
        console.log(`Content Stats Data Total Orders: ${contentStatsData.props.contentStatisticsManager.ordersCount}`);
    }



    // // Query the Total Data
    // const { exchangeLoading, exchangeQueryData } = useQuery(getSystemData, {});
    
    // // Once the data is received, get the account Data
    // useEffect(() => {
    //     if (!exchangeLoading) {
    //         console.log("Exchange Data" + exchangeData);
    //         setExchangeData(exchangeData.exchange);
    //     }
    // }, [exchangeLoading, exchangeQueryData]);
    

    function fromWei(number) {
        return (number / _1e18).toString();
    }

    function calcTotalDays() {
        return exchangeData.props.exchange.totalUserActiveDays + contentStatsData.props.contentStatisticsManager.accountsCount;
    }

    return (
        <div className="w-full bg-white rounded-xl flex flex-row">
            <div className="md:shrink-0 ">
                <Logomark />
            </div>
            <div className="px-4 flex flex-col leading-normal w-full">
                <div className="pt-2 py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Wallet:
                    </div>
                    <div>
                        {web3Data.state.account}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Chain ID:
                    </div>
                    <div>
                        {web3Data.state.networkId}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Unique Asset Count:
                    </div>
                    <div>
                        {accountData.uniqueAssetsCount} / {contentStatsData.props.contentStatisticsManager.uniqueAssetsCount}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Orders Created:
                    </div>
                    {/* <div>
                        {accountData.ordersCount}
                    </div> */}
                    <div>
                        {accountData.ordersCount} / {exchangeData.props.exchange.ordersCount}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Filled Orders:
                    </div>
                    {/* <div>
                        {accountData.orderFillsCount}
                    </div> */}
                    <div>
                        {accountData.orderFillsCount} / {exchangeData.props.exchange.orderFillsCount}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Cancelled Orders:
                    </div>
                    {/* <div>
                        {accountData.cancelledOrdersCount}
                    </div> */}
                    <div>
                        {accountData.cancelledOrdersCount} / {exchangeData.props.exchange.ordersCancelledCount}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Claimed Filled or Partially Filled Orders:
                    </div>
                    {/* <div>
                        {accountData.claimedOrdersCount}
                    </div> */}
                    <div>
                        {accountData.claimedOrdersCount} / {exchangeData.props.exchange.ordersClaimedCount}
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Maker Volume:
                    </div>
                    {/* <div>
                        {fromWei(accountData.makerVolume)} 
                    </div> */}
                    <div>
                        {fromWei(accountData.makerVolume)} / {fromWei(exchangeData.props.exchange.orderVolume) }
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Taker Volume:
                    </div>
                    {/* <div>
                        {fromWei(accountData.takerVolume)} 
                    </div> */}
                    <div>
                        {fromWei(accountData.takerVolume)} / {fromWei(exchangeData.props.exchange.orderVolume) }
                    </div>
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Days Active:
                    </div>
                    <div>
                        {accountData.daysActive} / {calcTotalDays()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenDisplay;