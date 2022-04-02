import { getUserData } from '../queries/queries'
import { useQuery } from '@apollo/client';
import Logomark from './Logomark';
import { WebContext } from "../data/Web3Context";
import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import GetExchangeData from '../data/GetExchangeData';
import GetContentStatsManagerData from '../data/GetContentsStatsManagerData';
import GetWalletData from '../data/GetWalletData';

const TokenDisplay = () => {
    const _1e18 = ethers.BigNumber.from('10').pow(ethers.BigNumber.from('18'));
    const web3Data = useContext(WebContext);
    const [userUniqueAssetsCount, setUserUniqueAssetsCount] = useState(<div>Loading...</div>);
    const [userOrdersCount, setUserOrdersCount] = useState(<div>Loading...</div>);
    const [userOrderFillsCount, setUserOrderFillsCount] = useState(<div>Loading...</div>);
    const [userOrdersClaimed, setUserOrdersClaimedCount] = useState(<div>Loading...</div>);
    const [userOrdersCancelled, setUserOrdersCancelledCount] = useState(<div>Loading...</div>);
    const [userMakerVolume, setUserMakerVolume] = useState(<div>Loading...</div>);
    const [userTakerVolume, setUserTakerVolume] = useState(<div>Loading...</div>);
    const [userDaysActive, setUserDaysActive] = useState(<div>Loading...</div>);

    // Query the account's data
    let walletData = GetWalletData(web3Data.state.account);
    let contentStatsData = GetContentStatsManagerData();
    let exchangeData = GetExchangeData();

    // Once the data is received, get the account Data
    useEffect(() => {

        let uniqueAssetsCount = 0;
        let totalUniqueAssetsCount = 0;
        if (walletData) {
            uniqueAssetsCount = walletData.uniqueAssetsCount;
        }
        if (contentStatsData) {
            totalUniqueAssetsCount = contentStatsData.uniqueAssetsCount;
        }
        setUserUniqueAssetsCount(<div>{uniqueAssetsCount} / {totalUniqueAssetsCount}</div>);
    }, [walletData, contentStatsData]);

    useEffect(() => {
        let ordersCount = 0;
        let totalOrderCount = 0;
        if (walletData) {
            ordersCount = walletData.ordersCount;
        }
        if (exchangeData) {
            totalOrderCount = exchangeData.ordersCount;
        }
        setUserOrdersCount(
            <div>
                {ordersCount} / {totalOrderCount}
            </div>
        );
    }, [walletData, exchangeData]);

    useEffect(() => {
        let orderFillsCount = 0;
        let totalOrderFillsCount = 0;
        if (walletData) {
            orderFillsCount = walletData.orderFillsCount;
        }
        if (exchangeData) {
            totalOrderFillsCount = exchangeData.orderFillsCount;
        }
        setUserOrderFillsCount(
            <div>
                {orderFillsCount} / {totalOrderFillsCount}
            </div>
        );
    }, [walletData, exchangeData]);

    useEffect(() => {
        let ordersCancelledCount = 0;
        let totalOrdersCancelledCount = 0;
        if (walletData) {
            ordersCancelledCount = walletData.ordersCancelledCount;
        }
        if (exchangeData) {
            totalOrdersCancelledCount = exchangeData.ordersCancelledCount;
        }
        setUserOrdersCancelledCount(
            <div>
                {ordersCancelledCount} / {totalOrdersCancelledCount}
            </div>
        );
    }, [walletData, exchangeData]);

    useEffect(() => {
        let ordersClaimedCount = 0;
        let totalOrdersClaimedCount = 0;
        if (walletData) {
            ordersClaimedCount = walletData.ordersClaimedCount;
        }
        if (exchangeData) {
            totalOrdersClaimedCount = exchangeData.ordersClaimedCount;
        }
        setUserOrdersClaimedCount(
            <div>
                {ordersClaimedCount} / {totalOrdersClaimedCount}
            </div>
        );
    }, [walletData, exchangeData]);

    // Get Maker Volume
    useEffect(() => {
        let makerVolume = 0;
        let totalVolume = 0;
        if (walletData) {
            makerVolume = walletData.makerVolume;
        }
        if (exchangeData) {
            totalVolume = exchangeData.orderVolume;
        }
        setUserMakerVolume(
            <div>
                {fromWei(makerVolume)} / {fromWei(totalVolume)}
            </div>
        );
    }, [walletData, exchangeData]);

    // Get Taker Volume
    useEffect(() => {
        let takerVolume = 0;
        let totalVolume = 0;
        if (walletData) {
            takerVolume = walletData.takerVolume;
        }
        if (exchangeData) {
            totalVolume = exchangeData.orderVolume;
        }
        setUserTakerVolume(
            <div>
                {fromWei(takerVolume)} / {fromWei(totalVolume)}
            </div>
        );
    }, [walletData, exchangeData]);

    // Get Days Active
    useEffect(() => {
        let daysActive = 0;
        let totalUserDaysActive = 0;
        if (walletData) {
            daysActive = walletData.takerVolume;
        }
        if (exchangeData && contentStatsData) {
            totalUserDaysActive = ethers.BigNumber.from(exchangeData.totalUserActiveDays).add(ethers.BigNumber.from(contentStatsData.accountsCount));
        }
        setUserDaysActive(
            <div>
                {daysActive} / {totalUserDaysActive.toString()}
            </div>
        );
    }, [walletData, exchangeData, contentStatsData]);



    useEffect(() => {
        if (exchangeData) {
            console.log(`Exchange exists: ${exchangeData.ordersCount}`);
        } else {
            console.log("Exchange doesn't exist yet.");
        }
    }, [exchangeData]);

    useEffect(() => {
        if (contentStatsData) {
            console.log(`Content Stats Manager exists: ${contentStatsData.uniqueAssetsCount}`);
            console.log(`Content Stats Manager exists: ${contentStatsData.accountsCount}`);
            console.log(`Content Stats Manager exists: ${contentStatsData.assetsCount}`);
            console.log(`Content Stats Manager exists: ${contentStatsData.contentsCount}`);
        } else {
            console.log("Contents Stats Manager doesn't exist yet.");
        }
    }, [contentStatsData]);
    

    function fromWei(number) {
        return (number / _1e18).toString();
    }

    // function calcTotalDays() {
    //     return exchangeData.props.exchange.totalUserActiveDays + contentStatsData.props.contentStatisticsManager.accountsCount;
    // }

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
                    {userUniqueAssetsCount}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Orders Created:
                    </div>
                    {userOrdersCount}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Filled Orders:
                    </div>
                    {userOrderFillsCount}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Cancelled Orders:
                    </div>
                    {userOrdersCancelled}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Claimed Filled or Partially Filled Orders:
                    </div>
                    {userOrdersClaimed}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Maker Volume:
                    </div>
                    {userMakerVolume}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Taker Volume:
                    </div>
                    {userTakerVolume}
                </div>
                <div className="py-1 flex flex-row justify-between md:shrink-0 ">
                    <div className="font-bold">
                        Days Active:
                    </div>
                    {userDaysActive}
                </div>
            </div>
        </div>
    )
}

export default TokenDisplay;