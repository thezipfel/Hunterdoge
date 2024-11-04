import { useState, useEffect } from 'react';
import  { GoogleSpreadsheet }  from 'google-spreadsheet';
import {CLIENT_EMAIL, PRIVATE_KEY, SPREADSHEET_ID } from "../constants";

export const useGoogleSheet = (id, time = 120000) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    const [state, setState] = useState({
        data: [],
        error: undefined,
        isLoading: true,
    })

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
                const rows = await sheet.getRows();
                setState({data: [...rows], error: undefined, isLoading: false})
            } catch (e) {
                setState({data: [...state.data], error: e, isLoading: false})
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
                setState({error: 'You need to set id'})
            }
            return () => clearInterval(timer)
        });
    }, [id])

    return state;
}