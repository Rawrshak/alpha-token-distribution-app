
import { useContext } from "react";
import { WebContext } from '../data/Web3Context';
import TokenDisplay from '../components/TokenDisplay';
import UserLogin from '../components/UserLogin.js'
import Logomark from "./Logomark";

const DisplayContent = () => {
    
    const web3Data = useContext(WebContext);

    let display = <UserLogin />

    if (web3Data.state.loaded) {
        display = <div className="flex flex-col content-center">
            <div className="place-self-center">
                <Logomark />
            </div>
            <TokenDisplay />
        </div>
    }

    return (
        <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col w-3/4">
                {display}
            </div>
        </div>
    )
}

export default DisplayContent;