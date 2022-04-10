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
    
    const [week1Participation, setWeek1Participation] = useState(<div>Loading...</div>);
    const [week2Participation, setWeek2Participation] = useState(<div>Loading...</div>);
    const [week3Participation, setWeek3Participation] = useState(<div>Loading...</div>);
    
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
    
    const [week1Rewards, setWeek1Rewards] = useState(0);
    const [week2Rewards, setWeek2Rewards] = useState(0);
    const [week3Rewards, setWeek3Rewards] = useState(0);
    const [week3BonusMultiplier, setWeek3BonusMultiplier] = useState(0);

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
        let week1Points = 0;
        let week1TotalPoints = 0;
        let week2Points = 0;
        let week2TotalPoints = 0;
        let week3Points = 0;
        let week3TotalPoints = 0;
        let week3Bonus = false;

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
            if (walletData.week1) {
                week1Points = walletData.week1.points;
            }
            if (walletData.week2) {
                week2Points = walletData.week2.points;
            }
            if (walletData.week3) {
                week3Points = walletData.week3.points;
                week3Bonus = walletData.week3.bonus;
            }
        }
        if (contentStatsData) {
            totalUniqueAssetsCount = contentStatsData.uniqueAssetsCount;
            totalContractsDeployed = contentStatsData.contentsCount;
            totalAssetsDeployed = contentStatsData.assetsCount;
            week1TotalPoints = contentStatsData.w1TotalPoints;
            week2TotalPoints = contentStatsData.w2TotalPoints;
            week3TotalPoints = contentStatsData.w3TotalPoints;
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
        setUserContractsDeployed(<div>{contractsDeployed} / {totalContractsDeployed}</div>);
        setUserAssetsDeployed(<div>{assetsDeployed} / {totalAssetsDeployed}</div>);
        setWeek1Participation(<div>{week1Points} / {week1TotalPoints}</div>);
        setWeek2Participation(<div>{week2Points} / {week2TotalPoints}</div>);
        setWeek3Participation(<div>{week3Points} / {week3TotalPoints}</div>);

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
        
        // Note: Week 3 bonus gives a 10% increase in rewards
        let week1Rewards = 25000 * week1Points / week1TotalPoints;
        setWeek1Rewards(Math.floor(week1Rewards * 100) / 100);
        
        let week2Rewards = 25000 * week2Points / week2TotalPoints;
        setWeek2Rewards(Math.floor(week2Rewards * 100) / 100);
        
        let week3Rewards = 25000 * week3Points / week3TotalPoints;
        setWeek3Rewards(Math.floor(week3Rewards * 100) / 100);

        setWeek3BonusMultiplier(week3Bonus);
    }, [walletData, contentStatsData, exchangeData]);

    useEffect(() => {
        var rewards = 
                    uniqueAssetsCountRewards + 
                    ordersCreatedRewards + 
                    orderFillsRewards + 
                    ordersClaimedRewards + 
                    ordersCancelledRewards + 
                    makerVolumeRewards + 
                    takerVolumeRewards + 
                    daysActiveRewards +
                    contractsDeployedRewards + 
                    assetsDeployedRewards +
                    (week1Rewards + week2Rewards + week3Rewards) * (week3BonusMultiplier ? 1.1 : 1);
        setTotalRewards(Number(rewards).toFixed(2));
    }, [uniqueAssetsCountRewards,
        ordersCreatedRewards,
        orderFillsRewards,
        ordersClaimedRewards,
        ordersCancelledRewards,
        makerVolumeRewards,
        takerVolumeRewards,
        daysActiveRewards,
        contractsDeployedRewards,
        assetsDeployedRewards,
        week1Rewards,
        week2Rewards,
        week3Rewards,
        week3BonusMultiplier]);

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

            <div className="px-4 leading-normal w-full grid grid-cols-4">
                <div className='pt-2 col-span-4 place-self-center text-lg font-bold'>
                    Gamer Rewards
                </div>
                <div className="pt-2 font-bold">
                    Unique Asset Count:
                </div>
                <div className="pt-2 place-self-end">
                    50000 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {userUniqueAssetsCount}
                </div>
                <div className="pt-2 place-self-end">
                    {uniqueAssetsCountRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Maker Orders:
                </div>
                <div className="pt-2 place-self-end">
                    37500 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {userOrdersCount}
                </div>
                <div className="pt-2 place-self-end">
                    {ordersCreatedRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Taker Orders:
                </div>
                <div className="pt-2 place-self-end">
                    37500 RAWR
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
                    12500 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {userOrdersCancelled}
                </div>
                <div className="pt-2 place-self-end">
                    {ordersCancelledRewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Claimed Filled or Partially Filled Maker Orders:
                </div>
                <div className="pt-2 place-self-end">
                    12500 RAWR
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
                    37500 RAWR
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
                    37500 RAWR
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
                <div className="pt-2 place-self-end">
                    25000 RAWR
                </div>
                <div className="py-2 place-self-end">
                    {userDaysActive}
                </div>
                <div className="py-2 place-self-end">
                    {daysActiveRewards.toFixed(2)} RAWR
                </div>
            </div>

            <div className="px-4 leading-normal w-full grid grid-cols-4">
                <div className='pt-2  col-span-4 place-self-center text-lg font-bold'>
                    Content Creator Rewards
                </div>
                <div className="pt-2 font-bold">
                    Content Contracts Deployed:
                </div>
                <div className="pt-2 place-self-end">
                    50000 RAWR
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
                <div className="pt-2 place-self-end">
                    75000 RAWR
                </div>
                <div className="py-2 place-self-end">
                    {userAssetsDeployed}
                </div>
                <div className="py-2 place-self-end">
                    {assetsDeployedRewards.toFixed(2)} RAWR
                </div>
            </div>

            <div className="px-4 leading-normal w-full grid grid-cols-4">
                <div className='pt-2  col-span-4 place-self-center text-lg font-bold'>
                    Weekly Event Rewards
                </div>
                <div className="pt-2 font-bold">
                    Week 1 Participation:
                </div>
                <div className="pt-2 place-self-end">
                    25000 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {week1Participation}
                </div>
                <div className="pt-2 place-self-end">
                    {week1Rewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Week 2 Participation:
                </div>
                <div className="pt-2 place-self-end">
                    25000 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {week2Participation}
                </div>
                <div className="pt-2 place-self-end">
                    {week2Rewards.toFixed(2)} RAWR
                </div>
                <div className="pt-2 font-bold">
                    Week 3 Participation:
                </div>
                <div className="pt-2 place-self-end">
                    25000 RAWR
                </div>
                <div className="pt-2 place-self-end">
                    {week3Participation}
                </div>
                <div className="pt-2 place-self-end">
                    {week3Rewards.toFixed(2)} RAWR
                </div>
                <div className='py-2 place-self-start font-bold'>
                    Week 3 Bonus:
                </div>
                <div className="py-2 font-bold place-self-end">
                    10%
                </div>
                <div className="py-2 font-bold place-self-end">
                </div>
                <div className="py-2 place-self-end font-bold">
                    {week3BonusMultiplier ? "YES" : "NO"}
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