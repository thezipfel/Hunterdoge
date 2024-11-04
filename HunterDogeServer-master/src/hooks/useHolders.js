import {useState, useEffect} from 'react';
import cheerio from "cheerio";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://bscscan.com/token/',
    headers: {'content-type': 'application/json'}
});

export const useHolders = (address) => {
    const [holders, setHolders] = useState('0')

    useEffect(() => {
        const fetchHTML = async () => {
            try {
                const {data} = await instance.get(`${address}`)
                const $ = cheerio.load(data)
                const holders = $('div[id = "ContentPlaceHolder1_tr_tokenHolders"] > div > div').text().trim();
                const res =  holders.replace(/[^0-9\,]/g, "")

                setHolders(res)
            } catch (e) {
                console.warn(e)
            }
        };
        fetchHTML()

    }, [address])

    return holders;
}

