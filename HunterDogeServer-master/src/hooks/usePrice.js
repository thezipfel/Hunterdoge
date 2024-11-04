import { bscWBNBContact } from "../connection/contracts";
import { BQUERY_KEY } from "../constants";
import { useState, useEffect } from 'react';

const url = "https://graphql.bitquery.io/";

export const usePrice = (address, time = 30000) => {
    const [state, setState] = useState({ price: 0, name: '', symbol: '' })

    useEffect(() => {
        const fetchSheet = async () => {
            const query = ` 
            {
                ethereum(network: bsc) {
                  dexTrades(
                    options: {limit: 1, desc: "timeInterval.minute"}
                    baseCurrency: {is: "${address}"}
                  ) {
                    timeInterval {
                      minute(count: 1)
                    }
                    baseCurrency {
                      symbol
                      address
                      name
                    }
                    baseAmount
                    quoteCurrency {
                      symbol
                      address
                    }
                    quoteAmount
                    trades: count
                    quotePrice
                    median_price: quotePrice(calculate: median)
                  }
                }
              }
             
            `;

            const opts = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": `${BQUERY_KEY}`
                },
                body: JSON.stringify({
                    query
                })
            };

            // try {
            //     await fetch(url, opts)
            //         .then(res => res.json())
            //         .then(res => setState({
            //             price: res.data.ethereum.dexTrades[0].quotePrice,
            //             name: res.data.ethereum.dexTrades[0].baseCurrency.name,
            //             symbol: res.data.ethereum.dexTrades[0].baseCurrency.symbol
            //         }))
            // } catch (e) {
            //     console.warn(e)
            // }
        };
        let timer;
        fetchSheet()
        if (time) {
            timer = setInterval(() => {
                fetchSheet()
            }, time)
        }
        return () => clearInterval(timer)
    }, [address])

    return state;
}