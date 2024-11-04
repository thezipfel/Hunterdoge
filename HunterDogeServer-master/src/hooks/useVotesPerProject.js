import {useState, useEffect} from 'react';
import {getVotesPerProject} from "../connection/functions";

export const useVotesPerProject = (address) => {
    const [state, setState] = useState({
        votes: 0,
        error: undefined,
        isLoading: true
    })

    useEffect(() => {
        const call = async () => {
            try {
                const votes = await getVotesPerProject(address)
                setState((state) => ({...state, votes: 0, isLoading: true}))
            } catch (error) {
                setState((state) => ({...state, votes: 0, isLoading: true}))
            }
        }
        call()
    }, [address])

    return state;
}