import { bscWBNBContact, bscBUSDContact } from "../connection/contracts";
import { BQUERY_KEY } from "../constants";
import { useState, useEffect } from 'react';

const url = "https://graphql.bitquery.io/";

export const useBNBPrice = (time = 300000) => {
    const [state, setState] = useState({ price: 0 })

    useEffect(() => {
        const fetchSheet = async () => {
            const query = `
            {
              ethereum(network: bsc) {
                dexTrades(
                  options: {desc: ["block.height","tradeIndex"], limit: 1}
                  exchangeName: {in: ["Pancake", "Pancake v2"]}
                  baseCurrency: {is: "${bscWBNBContact}"}
                  quoteCurrency: {is: "${bscBUSDContact}"}
              ) {
                  tradeIndex
                  block {
                    height
                  }
                  baseCurrency {
                    symbol
                    address
                  }
                  quoteCurrency {
                    symbol
                    address
                  }
                  quotePrice
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

            try {
                await fetch(url, opts)
                    .then(res => res.json())
                    .then(res => setState({ price: res.data.ethereum.dexTrades[0].quotePrice }))
            } catch (e) {
                console.warn(e)
            }
        };
        let timer;
        fetchSheet()
        if (time) {
            timer = setInterval(() => {
                fetchSheet()
                // console.log(time)
            }, time)
        }
        return () => clearInterval(timer)
    }, [bscWBNBContact])

    return state;
}