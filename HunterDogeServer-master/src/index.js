/* eslint-disable no-extend-native */
import React, { lazy, Suspense } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/monsterhunter.ttf';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-ui/core/styles";
import { Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider as WalletModalThemeProvider } from 'styled-components'
import { theme } from './theme';
import CircularProgress from '@mui/material/CircularProgress';
import { light, ModalProvider as WalletModalProvider, ResetCSS } from "@pancakeswap-libs/uikit";
import * as bsc from "@binance-chain/bsc-use-wallet";

const App = lazy(() => import("./App"));

Number.prototype.toFixedDown = function (digits) {
    const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

const NetworkContextName = 'NETWORK';

function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

// if (!!window.ethereum) {
//   window.ethereum.autoRefreshOnNetworkChange = false;
// }

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <bsc.UseWalletProvider
                    chainId={56}
                    connectors={{
                        walletconnect: { rpcUrl: "https://bsc-dataseed.binance.org" },
                        bsc,
                    }}
                >
                    {/* <Web3ReactManager>
            <Web3ContractProvider> */}
                    <ThemeProvider theme={theme}>
                        <WalletModalThemeProvider theme={light}>
                            <ResetCSS />
                            <WalletModalProvider>
                                <Suspense
                                    fallback={<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}
                                >
                                    <App />
                                </Suspense>
                            </WalletModalProvider>
                        </WalletModalThemeProvider>
                    </ThemeProvider>
                    {/*
            </Web3ContractProvider>
          </Web3ReactManager> */}

                </bsc.UseWalletProvider>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
