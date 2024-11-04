import React, { createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { getAlternativeProvider } from './getAlternativeProvider'
// import{ contractsBSC, contractsETH, abiBSC, abiETH } from '../constants/contracts/index.ts'

export const Web3ContractContext = createContext({
  getContract: () => {
    return
  }
})

// interface TProps {
//   children: React.ReactNode
//   account: any
// }

const EChainId = {
    MAIN_ETH: 1,
    TEST_ETH: 3,
    MAIN_BSC: 56,
    TEST_BSC: 97
}

// const getContractValue = (contract, isBSC, chainId) => {
//   let contractValue

//   if (chainId === EChainId.TEST_BSC || chainId === EChainId.TEST_ETH) {
//     const contractName = `${contract}Test`

//     contractValue = isBSC
//       ? contractsBSC[contractName] || contractsBSC[contract]
//       : contractsETH[contractName] || contractsETH[contract]
//   } else {
//     contractValue = isBSC ? contractsBSC[contract] : contractsETH[contract]
//   }

//   return contractValue
// }

// eslint-disable-next-line react/prop-types
export const Web3ContractProvider = ({ children, /* account */ }) => {
  // const { activate, account } = useWeb3React()
  const { account, chainId } = useWallet();

  function useActiveWeb3React() {
    const context = useWeb3ReactCore()
    const contextNetwork = useWeb3ReactCore('NETWORK')
    return context.active ? context : contextNetwork
  }

  //const { chainId } = account
  const [web3, setWeb3] = useState()

  useEffect(() => {
    if (chainId) {
      const provider = Web3.givenProvider || getAlternativeProvider(chainId)
      const newWeb3 = new Web3(provider)
      setWeb3(newWeb3)
    }
  }, [chainId])

  const getContract = (contract) => {
    if ( !web3 || !account ) return null
    const isBSC = (chainId) === EChainId.TEST_BSC || (chainId) === EChainId.MAIN_BSC
    // const contractValue = getContractValue(contract, isBSC, chainId)

    // const abiValue = isBSC ? abiBSC[contract] : abiETH[contract]
    const abiValue = null
    const result = new web3.eth.Contract(abiValue, contract)

    return result
  }

  return (
    <Web3ContractContext.Provider
      value={{
        web3,
        getContract,
        //account
      }}
      //account={account}
    >
      {children}
    </Web3ContractContext.Provider>
  )
}