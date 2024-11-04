import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {isMobile} from 'react-device-detect'
import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {Button} from "@mui/material";
import {injected} from './connectors.js'

import {getAlternativeProvider} from '../getAlternativeProvider';

const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    // iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  }
}

const ConnectMetaMask = ({text, setIsOpen}) => {
  const { activate, account, chainId, deactivate } = useWeb3React()
  const [balance, setBalance] = useState(0)
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
 
  async function disconnect() {
    try {
    deactivate()
    } catch (e) {
    console.log(e)
    }
  }

  useEffect(() => {
    window.addEventListener('load', async () => {
      await onConnect();
    });
  });

  const getUserInfo = async () => {
    const web3 = new Web3(Web3.givenProvider || getAlternativeProvider(chainId))
    const balance = await web3.eth.getBalance(account)
    setBalance(web3.utils.fromWei(balance, "ether"))
  }

  useEffect(() => {
    account && getUserInfo()
  }, [account])

  const onConnect = async (connector) => {
    if(isMobile) {
      const connector = new WalletConnect({
        bridge: "https://uniswap.bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });

      if (!connector.connected) {
        connector.createSession();
      }

      if(connector.connected) {
        connector.killSession();
      }

      connector.on("connect", async (error, payload) => {
        if (error) {
          throw error;
        }

        const { chainId } = payload.params[0];

        let web3 = new Web3(Web3.givenProvider || getAlternativeProvider(chainId))

        const balance = await web3.eth.getBalance(connector.accounts[0])
        setBalance(web3.utils.fromWei(balance, "ether"))
      });
    } else {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })
  
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
      connector &&
        activate(connector, undefined, true)
          .catch((error) => {
            if (error instanceof UnsupportedChainIdError) {
              console.log(`${chainId}`)
              activate(connector) // a little janky...can't use setError because the connector isn't set
            } else {
              console.log('error', true)
            }
          })
        }
  }

  return (
    <>
      {!account && ( <Button onClick={() => onConnect(SUPPORTED_WALLETS.METAMASK.connector)} sx={{ width: '100%', border: '10px solid B78300' }}>{text || 'Connect Wallet'}</Button>
        // <Button className={'at-click at-btn-cnt-metamask-wlt'} onClick={() => onConnect(SUPPORTED_WALLETS.METAMASK.connector)}>Connect to a Wallet</Button>
      )}
      {account && (
         <>
           <Button onClick={disconnect} sx={{ width: '100%', border: '10px solid B78300' }}>DISCONNECT {account.slice(0,6) + '...' + account.slice(-4)}</Button>
          </>
        // <>
        // <Tooltip
        //   placement="bottom"
        //   // interactive
        //   title={
        //     <Button onClick={disconnect}>
        //       DISCONNECT
        //      </Button>
        //     }
        //   >
        //   <AccountDiv >
        //     <span>
        //       {normalizeEth(balance)} {[56, 97].includes(chainId) ? 'BNB' : 'ETH'}
        //     </span>
        //     <WalletSpan>
        //       {normalizeAccount(account)}
        //     </WalletSpan>
        //   </AccountDiv>
        // </Tooltip>
        //   <WalletMobileSpan>
        //     {normalizeAccount(account)}
        //   </WalletMobileSpan>
        // </>
      )}
    </>
  );
};
// onClick={()=>{console.log('hi')}}
export default ConnectMetaMask;
