import { BQUERY_KEY } from "../constants";
const url = "https://graphql.bitquery.io/";
export const getPrice = async (address, onlyPrice, time = new Date) => {
    const query = ` 
    {
        ethereum(network: bsc) {
          dexTrades(
            options: {limit: 1, desc: "timeInterval.minute"}
            baseCurrency: {is: "${address}"}
            time: {before: "${time.toISOString()}"}
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

    try {
        return await fetch(url, opts)
            .then(res => res.json())
            .then(res => {
                if(onlyPrice) {
                    return res.data.ethereum.dexTrades[0].quotePrice
                }
                return {
                    price: res.data.ethereum.dexTrades[0].quotePrice,
                    name: res.data.ethereum.dexTrades[0].baseCurrency.name,
                    symbol: res.data.ethereum.dexTrades[0].baseCurrency.symbol
                }
            })
    } catch (e) {
        console.warn(e)
    }

}