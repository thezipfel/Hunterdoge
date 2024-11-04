import React, { useState, useEffect, useContext } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import { InjectedConnector } from '@web3-react/injected-connector'
import { Button } from "@mui/material";
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const injected = new InjectedConnector({
    supportedChainIds: [56],
})

export default function ConnectWallet(props) {
    const { account, connect, reset, status, chainId, error } = useWallet();
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const [userEvent, setUserEvent] = useState(false)
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
        (data) => connect(data),
        () => {
            setUserEvent(true)
            reset()
        },
        account
    );

    useEffect(() => {
        !props.mobileMenuOpen && !userEvent && !account && connect('injected');
    }, [chainId, account, userEvent])

    return (
        <div>
            <div>
                {account ?
                    <Button
                        onClick={onPresentAccountModal}
                        sx={{
                            width: '100%',
                            border: '10px solid B78300',
                            padding: `${!mobileMatches ? '6px 4px' : '10px 16px'}`,
                            fontSize: `${!mobileMatches ? '12px' : '15px'}`,
                        }}
                    >
                        DISCONNECT {account.slice(0, 4) + '...' + account.slice(-4)}
                    </Button>
                    :
                    <Button
                        onClick={onPresentConnectModal}
                        sx={{
                            width: '100%',
                            border: '10px solid B78300',
                            padding: `${!mobileMatches ? '6px 4px' : '10px 16px'}`,
                            fontSize: `${!mobileMatches ? '12px' : '15px'}`,
                        }}
                    >
                        {'Connect Wallet'}
                    </Button>
                }
                <a href="#!"></a>
            </div>
        </div>
    )
}

