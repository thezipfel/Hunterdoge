import React, { useState, createContext, useEffect } from "react"
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { CLIENT_EMAIL, PRIVATE_KEY, SHEET_ID, SPREADSHEET_ID } from "../constants";
import { priceFormatter } from "../utils/priceFormatter";

export const GoogleSheetContext = createContext({
    data: [],
    addTokenInfo: () => { }
});

const GoogleSheetContextProvider = (props) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    const id = SHEET_ID
    const time = 120000
    const [data, setData] = useState([])
    const [state, setState] = useState({
        error: undefined,
        isLoading: true,
    })
    const addTokenInfo = async (tokenAddress, tokenInfo, account, ethereum) => {
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[id];
        const rows = await sheet.getRows();
        const row = rows.find(item => {
            return item.Project_Address === tokenAddress
        })
        if (row) {
            Object.keys(tokenInfo).forEach(key => {
                if (key !== 'Project_Manager') row[key] = tokenInfo[key]
            })
            await row.save()
            return row
        }
        else {
            let rowData = {}
            Object.keys(tokenInfo).forEach(key => {
                if (key !== 'Project_Manager') rowData[key] = tokenInfo[key]
            })
            const newRow = await sheet.addRow(rowData)
            return newRow
        }
    }

    useEffect(() => {
        const authorize = async () => {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });
        }
        const fetchSheet = async () => {
            try {
                // loads document properties and worksheets
                await doc.loadInfo();
                const sheet = doc.sheetsById[id];
                let rows = await sheet.getRows();
                rows = rows.map((item) => {
                    try {
                        item.Project_Price = priceFormatter(item.Project_Price)
                    } catch (e) {
                        item.Project_Price = 0
                    }
                    try {
                        item.Project_Price_24h = priceFormatter(item.Project_Price_24h)
                        // item.Project_Price_24h = Number(item.Project_Price_24h.replace(',', '.')) || 0
                        // if(item.Project_Price_24h) {
                        //     item.Project_Price_24h = item.Project_Price_24h.toFixed(2)
                        // }
                    } catch (e) {
                        item.Project_Price_24h = 0
                    }
                    try {
                        item.Project_Upvotes = Number(item.Project_Upvotes.replace(',', '.')) || 0
                    } catch (e) {
                        item.Project_Upvotes = 0
                    }
                    try {
                        item.Project_MedVotes = Number(item.Project_MedVotes.replace(',', '.')) || 0
                    } catch (e) {
                        item.Project_MedVotes = 0
                    }
                    try {
                        item.Project_Downvotes = Number(item.Project_Downvotes.replace(',', '.')) || 0
                    } catch (e) {
                        item.Project_Downvotes = 0
                    }
                    try {
                        item.Project_MarketCap = Number(item.Project_MarketCap.replace(',', '.')) || 0
                    } catch (e) {
                        item.Project_MarketCap = 0
                    }
                    try {
                        item.Project_LiqMcapRatio = Number(item.Project_LiqMcapRatio.replace(',', '.')) || 0
                    } catch (e) {
                        item.Project_LiqMcapRatio = 0
                    }
                    return item
                })

                setData([...rows])
                setState({ error: undefined, isLoading: false })
            } catch (e) {
                console.log(e)
                setState({ error: e, isLoading: false })
            }
        };
        authorize().then(() => {
            let timer;
            if (id) {
                fetchSheet()
                if (time) {
                    timer = setInterval(() => {
                        fetchSheet()
                    }, time)
                }
            } else {
                setState({ error: 'You need to set id' })
            }
            return () => clearInterval(timer)
        });

    }, [id])

    return (
        <GoogleSheetContext.Provider value={{ data, addTokenInfo }}>
            {props.children}
        </GoogleSheetContext.Provider>
    )
}
export default GoogleSheetContextProvider