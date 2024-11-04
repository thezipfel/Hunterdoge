import React, { useEffect, useState } from 'react';
import { buyVotes, votePrice, approveTokens } from "../../connection/functions";
import { Button, Flex, Image } from "../common";
import { CloseButton, ImageWrapper, ModalCard, Text, Title, VotesWrapper, Wrapper } from "./StyledModal";
import {useWallet} from "@binance-chain/bsc-use-wallet";

import assets from '../../images/cryptoAsset.svg'
import { Typography } from '@mui/material';
import { useMediaQuery } from '@material-ui/core';

const data = [
    { id: '222', value: '1 vote', votes: 1 },
    { id: '223', value: '5 votes', votes: 5 },
    { id: '224', value: '10 votes', votes: 10 },
    { id: '225', value: '25 votes', votes: 25 },
    { id: '226', value: '50 votes', votes: 50 },
    { id: '227', value: '100 votes', votes: 100 },
    { id: '228', value: '250 votes', votes: 250 },
    { id: '229', value: '500 votes', votes: 500 },
]

const Modal = ({ setIsOpen }) => {
    // const {account} = useWeb3React()
    const { account, chainId, ethereum } = useWallet();
    const [voteCost, setVoteCost] = useState(0)
    const mobileMatches = useMediaQuery('(max-width:600px)');

    useEffect(async () => {
        const vPrice = await votePrice()
        setVoteCost(vPrice)
    }, [account])

    const buy = async (votes) => {
        if (account) {
            await buyVotes(ethereum, account, votes)
        } else {
            alert('You need to connect wallet')
        }
    }

    const approve = async (votes) => {
        if (account) {
            await approveTokens(ethereum, account)
            await buyVotes(ethereum, account, votes)
        } else {
            alert('You need to connect wallet')
        }
    }

    return (
        <Wrapper>
            <ModalCard width={mobileMatches ? '95%' : '75%'}>
                <CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
                <Flex direction={'column'}>
                    <Title size={'70px'}>Buy votes</Title>
                    <Text margin={'22px 0'}>
                        How many votes do you want do buy?
                    </Text>
                </Flex>
                <div>
                    {data.map((item) =>
                        <VotesWrapper justify={'center'} width={mobileMatches ? '97%' : '80%'} key={item.id} >
                            <Text size={mobileMatches ? '0.8em' :'1.2em'} style={{minWidth: (mobileMatches ? '50px' : '100px')}}>
                                {item.value}
                            </Text>
                            <Button size={mobileMatches ? '0.8em' :'1.15em'} weight={'800'} margin={'0 0 0 61px'} width={mobileMatches ? '80px' : '200px'} onClick={() => approve(item.votes)} bg={'#DB3E6DCF'}>Approve</Button>
                            <Button size={mobileMatches ? '0.8em' :'1.15em'} weight={'800'} margin={'0 0 0 61px'} width={mobileMatches ? '80px' : '200px'} onClick={() => buy(item.votes)}>Buy now</Button>
                            <Typography variant="body2" sx={{fontSize: mobileMatches ? '0.9em' : '1.4em', ml: '10px'}}>
                                = {Number(item.votes * voteCost)} $HD
                            </Typography>
                        </VotesWrapper>
                    )}
                </div>
                <ImageWrapper><Image src={assets} /></ImageWrapper>
            </ModalCard>
        </Wrapper>
    );
};

export default Modal;

