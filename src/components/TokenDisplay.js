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

    
    const [uniqueAssetsCountRewards, setUniqueAssetsCountRewards] = useState(0);
    const [ordersCreatedRewards, setOrdersCreatedRewards] = useState(0);
    const [orderFillsRewards, setOrderFillsRewards] = useState(0);
    const [ordersClaimedRewards, setOrdersClaimedRewards] = useState(0);
    const [ordersCancelledRewards, setOrdersCancelledRewards] = useState(0);
    const [makerVolumeRewards, setMakerVolumeRewards] = useState(0);
    const [takerVolumeRewards, setTakerVolumeRewards] = useState(0);
    const [daysActiveRewards, setDaysActiveRewards] = useState(0);

    const [totalRewards, setTotalRewards] = useState(0);

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

        let reward = 50000 * uniqueAssetsCount / totalUniqueAssetsCount;
        setUniqueAssetsCountRewards(Math.floor(reward * 100) / 100)
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

        let reward = 37500 * ordersCount / totalOrderCount;
        setOrdersCreatedRewards(Math.floor(reward * 100) / 100)
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
        
        let reward = 37500 * orderFillsCount / totalOrderFillsCount;
        setOrderFillsRewards(Math.floor(reward * 100) / 100)
        
    }, [walletData, exchangeData]);

    useEffect(() => {
        let ordersCancelledCount = 0;
        let totalOrdersCancelledCount = 0;
        if (walletData) {
            ordersCancelledCount = walletData.cancelledOrdersCount;
        }
        if (exchangeData) {
            totalOrdersCancelledCount = exchangeData.ordersCancelledCount;
        }
        setUserOrdersCancelledCount(
            <div>
                {ordersCancelledCount} / {totalOrdersCancelledCount}
            </div>
        );
        
        let reward = 12500 * ordersCancelledCount / totalOrdersCancelledCount;
        setOrdersCancelledRewards(Math.floor(reward * 100) / 100)
    }, [walletData, exchangeData]);

    useEffect(() => {
        let ordersClaimedCount = 0;
        let totalOrdersClaimedCount = 0;
        if (walletData) {
            ordersClaimedCount = walletData.claimedOrdersCount;
        }
        if (exchangeData) {
            totalOrdersClaimedCount = exchangeData.ordersClaimedCount;
        }
        setUserOrdersClaimedCount(
            <div>
                {ordersClaimedCount} / {totalOrdersClaimedCount}
            </div>
        );
        
        let reward = 12500 * ordersClaimedCount / totalOrdersClaimedCount;
        setOrdersClaimedRewards(Math.floor(reward * 100) / 100)
        
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
        let reward = 37500 * makerVolume / totalVolume;
        setMakerVolumeRewards(Math.floor(reward * 100) / 100)
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
        let reward = 37500 * takerVolume / totalVolume;
        setTakerVolumeRewards(Math.floor(reward * 100) / 100)
    }, [walletData, exchangeData]);

    // Get Days Active
    useEffect(() => {
        let daysActive = 0;
        let totalUserDaysActive = 0;
        if (walletData) {
            daysActive = walletData.daysActive;
        }
        if (exchangeData && contentStatsData) {
            totalUserDaysActive = ethers.BigNumber.from(exchangeData.totalUserActiveDays).add(ethers.BigNumber.from(contentStatsData.accountsCount));
        }
        setUserDaysActive(
            <div>
                {daysActive} / {totalUserDaysActive.toString()}
            </div>
        );
        let reward = 25000 * daysActive / totalUserDaysActive;
        setDaysActiveRewards(Math.floor(reward * 100) / 100)
    }, [walletData, exchangeData, contentStatsData]);

    useEffect(() => {
        var rewards = Number(uniqueAssetsCountRewards) + 
                    Number(ordersCreatedRewards) + 
                    Number(orderFillsRewards) + 
                    Number(ordersClaimedRewards) + 
                    Number(ordersCancelledRewards) + 
                    Number(makerVolumeRewards) + 
                    Number(takerVolumeRewards) + 
                    Number(daysActiveRewards);
        setTotalRewards(rewards.toFixed(2));
    }, [uniqueAssetsCountRewards,
        ordersCreatedRewards,
        orderFillsRewards,
        ordersClaimedRewards,
        ordersCancelledRewards,
        makerVolumeRewards,
        takerVolumeRewards,
        daysActiveRewards]);

    function fromWei(number) {
        return (number / _1e18).toString();
    }

    return (
        <div className="flex flex-col bg-white rounded-xl">
            <div className="px-4 leading-normal w-full grid grid-cols-3">
                <div className="pt-2 font-bold">
                    Wallet: 
                </div>
                <div className="pt-2 place-self-end">
                </div>
                <div className="pt-2 truncate">
                    {web3Data.state.account}
                </div>
                <div className="pt-2 font-bold">
                    Unique Asset Count:
                </div>
                <div className="pt-2 place-self-end">
                    {userUniqueAssetsCount}
                </div>
                <div className="pt-2 place-self-end">
                    {uniqueAssetsCountRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Orders Created:
                </div>
                <div className="pt-2 place-self-end">
                    {userOrdersCount}
                </div>
                <div className="pt-2 place-self-end">
                    {ordersCreatedRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Filled Orders:
                </div>
                <div className="pt-2 place-self-end">
                    {userOrderFillsCount}
                </div>
                <div className="pt-2 place-self-end">
                    {orderFillsRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Cancelled Orders:
                </div>
                <div className="pt-2 place-self-end">
                    {userOrdersCancelled}
                </div>
                <div className="pt-2 place-self-end">
                    {ordersCancelledRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Claimed Filled or Partially Filled Orders:
                </div>
                <div className="pt-2 place-self-end">
                    {userOrdersClaimed}
                </div>
                <div className="pt-2 place-self-end">
                    {ordersClaimedRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Maker Volume:
                </div>
                <div className="pt-2 place-self-end">
                    {userMakerVolume}
                </div>
                <div className="pt-2 place-self-end">
                    {makerVolumeRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Taker Volume:
                </div>
                <div className="pt-2 place-self-end">
                    {userTakerVolume}
                </div>
                <div className="pt-2 place-self-end">
                    {takerVolumeRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Days Active:
                </div>
                <div className="py-2 place-self-end">
                    {userDaysActive}
                </div>
                <div className="pt-2 place-self-end">
                    {daysActiveRewards.toFixed(2)} RAWR
                </div>
            </div>
            <div className='flex flex-row pt-5 pb-2 px-4 justify-between text-lg font-bold'>
                <div >
                    Total RAWR Rewards: 
                </div>
                <div className="place-self-end">
                    {totalRewards} RAWR
                </div>
            </div>
        </div>
    )
}

export default TokenDisplay;