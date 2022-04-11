import { ethers } from "ethers";
import { WebContext } from "../data/Web3Context";
import { useContext } from "react";

const LoginButton = () => {

    const web3Data = useContext(WebContext);

    async function LoginClick(e) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();

        if (accounts.length > 0) {
            web3Data.dispatch({type: "WEB3_LOADED", payload: {
                provider: provider,
                account: accounts[0],
                networkId: network.chainId
            }});
            console.log(`Wallet: ${web3Data.state.account}`)
            console.log(`Network Id: ${network.chainId}`)
        }
    }

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={LoginClick}>
                Connect to a Wallet
            </button>
        </div>
    )
}

export default LoginButton;