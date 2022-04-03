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

    const [userContractsDeployed, setUserContractsDeployed] = useState(<div>Loading...</div>);
    const [userAssetsDeployed, setUserAssetsDeployed] = useState(<div>Loading...</div>);
    
    const [uniqueAssetsCountRewards, setUniqueAssetsCountRewards] = useState(0);
    const [ordersCreatedRewards, setOrdersCreatedRewards] = useState(0);
    const [orderFillsRewards, setOrderFillsRewards] = useState(0);
    const [ordersClaimedRewards, setOrdersClaimedRewards] = useState(0);
    const [ordersCancelledRewards, setOrdersCancelledRewards] = useState(0);
    const [makerVolumeRewards, setMakerVolumeRewards] = useState(0);
    const [takerVolumeRewards, setTakerVolumeRewards] = useState(0);
    const [daysActiveRewards, setDaysActiveRewards] = useState(0);
    const [contractsDeployedRewards, setContractsDeployedRewards] = useState(0);
    const [assetsDeployedRewards, setAssetsDeployedRewards] = useState(0);

    const [totalRewards, setTotalRewards] = useState(0);

    // Query the account's data
    let walletData = GetWalletData(web3Data.state.account);
    let contentStatsData = GetContentStatsManagerData();
    let exchangeData = GetExchangeData();

    // Once the data is received, get the account Data
    useEffect(() => {
        let uniqueAssetsCount = 0;
        let totalUniqueAssetsCount = 0;
        let ordersCount = 0;
        let totalOrderCount = 0;
        let orderFillsCount = 0;
        let totalOrderFillsCount = 0;
        let ordersCancelledCount = 0;
        let totalOrdersCancelledCount = 0;
        let ordersClaimedCount = 0;
        let totalOrdersClaimedCount = 0;
        let makerVolume = 0;
        let totalMakerVolume = 0;
        let takerVolume = 0;
        let totalTakerVolume = 0;
        let daysActive = 0;
        let totalUserDaysActive = 0;
        let contractsDeployed = 0;
        let assetsDeployed = 0;
        let totalContractsDeployed = 0;
        let totalAssetsDeployed = 0;

        if (walletData) {
            uniqueAssetsCount = walletData.uniqueAssetsCount;
            ordersCount = walletData.ordersCount;
            orderFillsCount = walletData.orderFillsCount;
            ordersCancelledCount = walletData.cancelledOrdersCount;
            ordersClaimedCount = walletData.claimedOrdersCount;
            makerVolume = walletData.makerVolume;
            takerVolume = walletData.takerVolume;
            daysActive = walletData.daysActive;
            contractsDeployed = walletData.contractsDeployedCount;
            assetsDeployed = walletData.assetsDeployedCount;
        }
        if (contentStatsData) {
            totalUniqueAssetsCount = contentStatsData.uniqueAssetsCount;
            totalContractsDeployed = contentStatsData.contentsCount;
            totalAssetsDeployed = contentStatsData.assetsCount;
        }
        if (exchangeData) {
            totalOrderCount = exchangeData.ordersCount;
            totalOrderFillsCount = exchangeData.orderFillsCount;
            totalOrdersCancelledCount = exchangeData.ordersCancelledCount;
            totalOrdersClaimedCount = exchangeData.ordersClaimedCount;
            totalMakerVolume = exchangeData.makerVolume;
            totalTakerVolume = exchangeData.takerVolume;
        }
        if (exchangeData && contentStatsData) {
            totalUserDaysActive = ethers.BigNumber.from(exchangeData.totalUserActiveDays).add(ethers.BigNumber.from(contentStatsData.accountsCount));
        }

        setUserUniqueAssetsCount(<div>{uniqueAssetsCount} / {totalUniqueAssetsCount}</div>);
        setUserOrdersCount(<div>{ordersCount} / {totalOrderCount}</div>);
        setUserOrderFillsCount(<div>{orderFillsCount} / {totalOrderFillsCount}</div>);
        setUserOrdersCancelledCount(<div>{ordersCancelledCount} / {totalOrdersCancelledCount}</div>);
        setUserOrdersClaimedCount(<div>{ordersClaimedCount} / {totalOrdersClaimedCount}</div>);
        setUserMakerVolume(<div>{fromWei(makerVolume).toFixed(2).toString()} / {fromWei(totalMakerVolume).toFixed(2).toString()}</div>);
        setUserTakerVolume(<div>{fromWei(takerVolume).toFixed(2).toString()} / {fromWei(totalTakerVolume).toFixed(2).toString()}</div>);
        setUserDaysActive(<div>{daysActive} / {totalUserDaysActive.toString()}</div>);
        setUserContractsDeployed(<div>{contractsDeployed} / {totalContractsDeployed.toString()}</div>);
        setUserAssetsDeployed(<div>{assetsDeployed} / {totalAssetsDeployed.toString()}</div>);

        let uniqueAssetsReward = 50000 * uniqueAssetsCount / totalUniqueAssetsCount;
        setUniqueAssetsCountRewards(Math.floor(uniqueAssetsReward * 100) / 100);
        
        let ordersCreatedReward = 37500 * ordersCount / totalOrderCount;
        setOrdersCreatedRewards(Math.floor(ordersCreatedReward * 100) / 100);
        
        let orderfillsReward = 37500 * orderFillsCount / totalOrderFillsCount;
        setOrderFillsRewards(Math.floor(orderfillsReward * 100) / 100);

        let ordersCancelledReward = 12500 * ordersCancelledCount / totalOrdersCancelledCount;
        setOrdersCancelledRewards(Math.floor(ordersCancelledReward * 100) / 100);
        
        let ordersClaimedRewards = 12500 * ordersClaimedCount / totalOrdersClaimedCount;
        setOrdersClaimedRewards(Math.floor(ordersClaimedRewards * 100) / 100);

        let makerVolumeReward = 37500 * makerVolume / totalMakerVolume;
        setMakerVolumeRewards(Math.floor(makerVolumeReward * 100) / 100);
        
        let takerVolumeReward = 37500 * takerVolume / totalTakerVolume;
        setTakerVolumeRewards(Math.floor(takerVolumeReward * 100) / 100);
        
        let daysActiveReward = 25000 * daysActive / totalUserDaysActive;
        setDaysActiveRewards(Math.floor(daysActiveReward * 100) / 100);
        
        let contractsDeployedRewards = 50000 * contractsDeployed / totalContractsDeployed;
        setContractsDeployedRewards(Math.floor(contractsDeployedRewards * 100) / 100);
        
        let assetsDeployedRewards = 75000 * assetsDeployed / totalAssetsDeployed;
        setAssetsDeployedRewards(Math.floor(assetsDeployedRewards * 100) / 100);
    }, [walletData, contentStatsData, exchangeData]);

    useEffect(() => {
        var rewards = Number(uniqueAssetsCountRewards) + 
                    Number(ordersCreatedRewards) + 
                    Number(orderFillsRewards) + 
                    Number(ordersClaimedRewards) + 
                    Number(ordersCancelledRewards) + 
                    Number(makerVolumeRewards) + 
                    Number(takerVolumeRewards) + 
                    Number(daysActiveRewards) +
                    Number(contractsDeployedRewards) + 
                    Number(assetsDeployedRewards);
        setTotalRewards(rewards.toFixed(2));
    }, [uniqueAssetsCountRewards,
        ordersCreatedRewards,
        orderFillsRewards,
        ordersClaimedRewards,
        ordersCancelledRewards,
        makerVolumeRewards,
        takerVolumeRewards,
        daysActiveRewards,
        contractsDeployedRewards,
        assetsDeployedRewards]);

    function fromWei(number) {
        return (number / _1e18);
    }

    return (
        <div className="flex flex-col bg-white rounded-xl divide-y divide-double">

            <div className='flex flex-row py-4 px-4 justify-between text-lg font-bold'>
                <div >
                    Logged In Wallet: 
                </div>
                <div className="truncate">
                    {web3Data.state.account}
                </div>
            </div>

            <div className="px-4 leading-normal w-full grid grid-cols-3">
                <div className='pt-2 col-span-3 place-self-center text-lg font-bold'>
                    Gamer Rewards
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
                <div className="py-2 font-bold">
                    Days Active:
                </div>
                <div className="py-2 place-self-end">
                    {userDaysActive}
                </div>
                <div className="py-2 place-self-end">
                    {daysActiveRewards.toFixed(2)} RAWR
                </div>
            </div>

            <div className="px-4 leading-normal w-full grid grid-cols-3">
                <div className='pt-2  col-span-3 place-self-center text-lg font-bold'>
                    Content Creator Rewards
                </div>
                <div className="pt-2 font-bold">
                    Content Contracts Deployed:
                </div>
                <div className="pt-2 place-self-end">
                    {userContractsDeployed}
                </div>
                <div className="pt-2 place-self-end">
                    {contractsDeployedRewards.toFixed(2)} RAWR
                </div>
                <div className="py-2 font-bold">
                    Assets Deployed:
                </div>
                <div className="py-2 place-self-end">
                    {userAssetsDeployed}
                </div>
                <div className="py-2 place-self-end">
                    {assetsDeployedRewards.toFixed(2)} RAWR
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