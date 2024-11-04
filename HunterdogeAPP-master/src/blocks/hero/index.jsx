import React, {useContext, useEffect, useState} from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {Box} from "@mui/system";
import styled from 'styled-components'

import logo from '../../images/hunter_logo.png';

import {SHEET_ID_BANNER} from "../../constants";
import {useGoogleSheet} from '../../hooks/useGoogleSheet';
import {Image, LinkWrapper} from "../../components/common";
import likeDark from "../../images/like_dark.svg";
import chart from "../../images/chart_ico.svg";
import {getPair, getUserVotes, isManager, returnMembership} from "../../connection/functions";
import {useWallet} from "@binance-chain/bsc-use-wallet";
import RegisterModal from '../../components/modal/RegisterModal';
// import {usePrice} from "../../hooks/usePrice";
import {bscTokenContact, bscWBNBContact} from '../../connection/contracts'
import TokenEditModal from "../../components/modal/TokenEditModal/TokenEditModal";
import ConnectWallet from '../../connection/ConnectWallet';
// import { useBNBPrice } from '../../hooks/useBNBPrice';
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import { useMediaQuery } from '@material-ui/core';

const AdsToken = () => (
    <Stack direction="row"
           sx={{
               pt: '21px',
               pl: '51px',
               pr: '13px',
               position: 'relative',
               borderRight: '3px solid #FFFBE2',
           }}
    >
        <Typography
            sx={{
                position: 'absolute',
                top: 0,
                left: '6%',
                fontFamily: 'ArmagedaWide',
                fontSize: 23,
                color: 'rgba(171, 136, 46, 0.7)',
            }}
        >
            #2
        </Typography>
        <Box component='img' src={logo}
             sx={{
                 height: '68px',
                 width: '68px',
                 mr: '12px'
             }}
        />
        <Box>
            <Typography variant='h4'>
                $hunt | HunterDoge
            </Typography>
            <Box
                sx={{
                    width: '152px',
                    mt: 1
                }}
            >
                <Stack direction="row" justifyContent="space-between"
                       sx={{mb: '8px'}}
                >
                    <Typography variant="body2">
                        Price changes (24h)
                    </Typography>
                    <Typography variant="body2"
                                sx={{fontWeight: 700}}
                    >
                        +106.54%
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between"
                       sx={{mb: '8px'}}
                >
                    <Typography variant="body2">
                        Votes last 24h
                    </Typography>
                    <Typography variant="body2"
                                sx={{fontWeight: 700}}
                    >
                        +1’034
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">
                        Votes last 72h
                    </Typography>
                    <Typography variant="body2"
                                sx={{fontWeight: 700}}
                    >
                        +5’555
                    </Typography>
                </Stack>
            </Box>
        </Box>
        <Typography
            sx={{
                position: 'absolute',
                top: '33%',
                right: '7%',
                fontSize: 55,
                color: '#FF0000',
                fontWeight: 900
            }}
        >
            ?
        </Typography>
    </Stack>
)

const Hero = ({setIsOpen, register}) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
    const {account, ethereum} = useWallet();
    // const state = usePrice(bscTokenContact)
    const {data} = useGoogleSheet(SHEET_ID_BANNER)
    const [votes, setVotes] = useState(0)
    const [isModal, setIsModal] = useState(false)
    const [isTokenEditModal, setIsTokenEditModal] = useState(false)
    const [checkManager, setCheckManager] = useState(false)
    const [pairAddress, setPairAddress] = useState('')
    // const bnbPrice = useBNBPrice()
    const [price, setPrice] = useState(0)
    const { data: tokens } = useContext(GoogleSheetContext)

    useEffect(()=> {
        const hunter = tokens.find(e=> e.Project_Address.toLocaleLowerCase() === bscTokenContact.toLocaleLowerCase())
        if(hunter){
            setPrice(hunter.Project_Price)
        }
    }, [tokens])
    // useEffect(()=>{
    //     if(state.price && bnbPrice.price) {
    //         setPrice(state.price * bnbPrice.price)
    //     }
    // }, [state.price, bnbPrice.price])

    useEffect(() => {
        const call = async () => {
            const votes = await getUserVotes(account)
            setVotes(votes)
        }
        const getIsManager = async () => {
            const is_manager = await isManager(account)
            setCheckManager(is_manager)
        }
        // const getPairContract = async () => {
        //     const pair = await getPair(bscTokenContact)
        //     setPairAddress(pair)
        // }
        if (account) {
            getIsManager()
            call()
            // getPairContract()
        } else setCheckManager(false)
    }, [account])

    return (
        <Block>
            <Box sx={{flexShrink: 0}}>
                <Stack direction="row">
                    <LinkWrapper to='/'>
                        <Box component='img' src={logo}
                             sx={{
                                 height: '61px',
                                 width: '61px',
                             }}/>
                    </LinkWrapper>
                    <LinkWrapper to='/'>
                        <Box component='h2'
                             sx={{
                                 fontSize: 40,
                                 pl: 3
                             }}
                        >
                            HunterDoge
                        </Box>
                    </LinkWrapper>
                </Stack>
                <Stack direction="row" alignItems='center' justifyContent="center"
                       sx={{
                           pt: '14px',

                       }}
                >
                    <Box component='img' src={chart}
                         sx={{
                             height: '30px',
                             width: '30px',
                             mr: '21px'
                         }}
                    />
                    <Typography variant='body1'
                                sx={{
                                    fontSize: 16,
                                    mr: '28px'
                                }}
                    >
                        {`1 HD = $ ${price}`}
                    </Typography>
                    <Button target="_blank" href={`https://pancakeswap.finance/swap?inputCurrency=${bscWBNBContact}&outputCurrency=${bscTokenContact}`}>
                        Buy $HD
                    </Button>
                </Stack>
            </Box>
            {/* <Content> */}
            <Link target="_blank" href={mobileMatches ? data[3]?.Link_Website_Mobile : data[3]?.Link_Website_Dekstop}>
                <Banner url={mobileMatches ? data[3]?.Link_Banner_Mobile : data[3]?.Link_Banner_Desktop}/>
            </Link>
            {/* <AdsToken />
        <AdsToken /> */}
            {/* </Content> */}


            <Container>
                {/* <ConnectMetaMask setIsOpen={setIsOpen}/> */}
                <ConnectWallet/>
                {register ? (
                    <>
                        <Button
                            onClick={() => returnMembership(ethereum, account)}
                            fullWidth sx={{mt: 1.5}}>
                            unregister
                        </Button>
                        <Flex>
                            <Text>{votes > 0 ? 'votes' : 'No.of votes'}</Text>
                            <Text>{votes}</Text>
                            <Image src={likeDark}/>
                            <Button onClick={() => setIsOpen(true)}>buy votes</Button>
                        </Flex>
                    </>
                ) : (
                    <Button
                        onClick={() => setIsModal(true)}
                        fullWidth sx={{mt: 1.5}}>
                        register
                    </Button>
                )}
                {checkManager &&
                    <Button
                        onClick={() => setIsTokenEditModal(true)}
                        fullWidth sx={{mt: 1.5}}>
                        add your token
                    </Button>
                }

            </Container>
            {isModal && <RegisterModal setIsOpen={setIsModal}/>}
            {isTokenEditModal && <TokenEditModal setIsOpen={setIsTokenEditModal} tokenAddress={null} tokenData={null}/>}
        </Block>
    )
}


export default Hero;

const Container = styled.div`
  width: 286px;
  margin-left: 44px;
  padding-top: 8px;
  flex-shrink: 0;
`

const Flex = styled.div`
  margin: ${({margin}) => margin || '14px 0 0 0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  color: #B78300;
  font-family: Raleway, sans-serif;

`

const Block = styled.div`
  margin-top: 20px;
  padding: 0 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Content = styled.div`
  display: flex;
  overflow: auto;
  background: linear-gradient(270deg, rgba(250, 240, 203, 0) 0%, #FAF0CB 14.35%, #FAF0CB 83.68%, rgba(250, 240, 203, 0) 99.33%);
  filter: drop-shadow(0px 5px 0px rgba(0, 0, 0, 0.1));
`

const Banner = styled.div`
  margin-left: 20px;
  width: 100%;
  max-width: 900px;
  height: 100px;
  background-image: url(${({url}) => url});
`
const Link = styled.a`
  display: block;
  width: 100%;
  max-width: 900px;;
`