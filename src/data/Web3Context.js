import { createContext } from 'react'
import { useReducer } from "react";

export const WebContext = createContext();

const initialState = {
    loaded: false,
    provider: null,
    account: null,
    networkId: 0
};

const web3Reducer = (state, action) => {
  switch(action.type) {
    case "WEB3_LOADED": 
      return {
        ...state,
        loaded: true,
        provider: action.payload.provider,
        account: action.payload.account.toLowerCase(),
        networkId: action.payload.networkId
      }
    default:
      return state;
  }
};

export function Web3Provider(props) {
  let [state, dispatch] = useReducer(web3Reducer, initialState);

  return <WebContext.Provider value={{state, dispatch}}>{props.children}</WebContext.Provider>
}