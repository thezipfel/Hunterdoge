import {BQUERY_KEY} from "../constants";
const url = "https://graphql.bitquery.io/";
export const getHolderPerDay = async (address) => {
    let current = new Date();
    let dayBefore = new Date(current.getTime() - 86400000);

    const query = ` 
    query{
    ethereum(network: bsc) {
    transfers(
      currency: {is: "${address}"}
      amount: {gt: 0}
      date: {since: "${dayBefore.toISOString()}", till: "${current.toISOString()}"}
    ) {
      currency {
        symbol
      } 
      median: amount(calculate: median)
      average: amount(calculate: average)
      amount
      count
      days: count(uniq: dates)
      sender_count: count(uniq: senders)
      receiver_count: count(uniq: receivers)
      min_date: minimum(of: date)
      max_date: maximum(of: date)
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
    //     return await fetch(url, opts)
    //         .then(res => res.json())
    //         .then(res => res.data.ethereum.transfers[0].sender_count)
    // } catch (e) {
    //     console.warn(e)
    // }

}