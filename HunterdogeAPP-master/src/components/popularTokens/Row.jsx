import React, {useEffect, useState} from 'react';
import {Stack, TableCell, TableRow, Typography} from "@material-ui/core";
import {Box} from "@mui/system";
import styled from "styled-components";

import {ReactComponent as Kyc} from "../../images/KYC.svg";
import {ReactComponent as Audit} from "../../images/Audit.svg";
import {ReactComponent as Utility} from "../../images/Utility.svg";
import {ReactComponent as Memecoin} from "../../images/Memecoin.svg";

import arrowUp from "../../images/arrow-up.svg";
import {Changes24, Flex, Image, LinkWrapper, More, MoreButton} from "../common";
import {Votes} from "../common/votes";
import {getMCap} from '../../connection/functions'
import {CheckPopup} from '../checkPopup/checkPopup';
import arrowDown from "../../images/arrow-down.svg";
import {useWallet} from "@binance-chain/bsc-use-wallet";
import {Badges} from "../common/badges/Badges";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoLogoImage from '../../images/nologo.jpg'
import { NumberFormatter } from '../../utils/changeFormatter';

const Row = ({ data, index }) => {
    // const {chainId} = useWeb3React()
    const { account, chainId } = useWallet();
    // const {votes, error, isLoading} = useVotesPerProject(data.Project_Address)
    const [mcap, setMCap] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [votes, setVotes] = useState(0)
    const mobileMatches = useMediaQuery('(min-width:600px)');

    const tokenData = [
        { key: 'Project_ISKYC', text: 'KYC verified', image: mobileMatches ? <Kyc /> : <Kyc width='12px' height='12px' /> },
        { key: 'Project_ISDOX', text: 'Audited token', image: mobileMatches ? <Audit /> : <Audit width='12px' height='12px' /> },
        { key: 'Project_HasUtility', text: 'Usecase token', image: mobileMatches ? <Utility /> : <Utility width='12px' height='12px' /> },
        { key: 'Project_IsMemeCoin', text: 'Meme token', image: mobileMatches ? <Memecoin /> : <Memecoin width='12px' height='12px' /> }]

    useEffect(() => {
        // const fetchData = async () => {
        //     const address = toChecksumAddress(data.Project_Address)
        //     const res = await getVotesPerProject(address)
        //     try {
        //         setVotes(parseInt(res[0]) * 2 + parseInt(res[2]) - parseInt(res[1]))
        //     } catch (e) {
        //         console.log(e)
        //     }
        // };
        // fetchData()
        setVotes(data.Project_Upvotes * 2 + data.Project_MedVotes - data.Project_Downvotes)
    }, [data])

    // useEffect(() => {
    //     const getMarketCap = async () => {
    //         const mcap = await getMCap(data.Project_Address, data.Project_Price)
    //         // console.log(mcap)
    //         setMCap(mcap)
    //     }
    //     getMarketCap()
    // }, [data.Project_Price])

    return (
        <TableRow>
            {mobileMatches &&
                <TableCell component="th" scope="row">
                    <Stack direction="row" alignItems="center">
                        <Typography variant="h6" sx={{ mr: '36px' }}>
                            {index + 1}.
                        </Typography>
                        <Box component="img" src={data.Project_Logo || NoLogoImage} sx={{ width: '66px' }} />
                    </Stack>
                </TableCell>
            }

            <TableCell style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                {!mobileMatches && <Box component="img" src={data.Project_Logo || NoLogoImage} sx={{ width: '20px', height: '20px', marginRight: '4px' }} />}
                <LinkWrapper to={`/token/${data.Project_Address}`}>
                    <Stack>
                        <Typography sx={{width:mobileMatches?'11em':'5em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {mobileMatches && data.Project_Name}
                            {!mobileMatches &&
                                <small style={{ fontSize: '0.5rem' }}>{data.Project_Name}</small>
                            }
                        </Typography>
                        <Stack direction="row" sx={{ gap: mobileMatches ? 2 : 1, mt: mobileMatches ? '14px' : '2px' }}>
                            {/*{data.KYC === 'TRUE' && */}
                            {/*    <Kyc/>*/}
                            {/*}*/}
                            {/*{data.Audit === 'TRUE' && */}
                            {/*    <Audit/>*/}
                            {/*}*/}
                            {/*{data.Utility === 'TRUE' && */}
                            {/*    <Utility/>*/}
                            {/*}*/}
                            {/*{data.Memecoin === 'TRUE' && */}
                            {/*    <Memecoin/>*/}
                            {/*}*/}
                            {data && tokenData.map(((el, idx) => data[el.key] === 'TRUE' &&
                                <Badges key={idx * 10 * 2} children={el.image} text={el.text} />))}
                        </Stack>
                    </Stack>
                </LinkWrapper>
            </TableCell>

            <TableCell style={{maxWidth:mobileMatches?'':'55px',overflow:'hidden'}}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {mobileMatches && data.Project_Symbol}
                    {!mobileMatches &&
                        <small style={{ fontSize: '0.45rem' }}>{data.Project_Symbol}</small>
                    }
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="table">
                    {mobileMatches && <label>${NumberFormatter(parseInt(data.Project_MarketCap))}</label>}
                    {!mobileMatches &&
                        <small style={{ fontSize: '0.5rem' }}>${NumberFormatter(parseInt(data.Project_MarketCap))}</small>
                    }
                </Typography>
            </TableCell>
            <TableCell>
                <Stack>
                    <Typography variant="table">
                        {mobileMatches && <label>${data.Project_Price}</label>}
                        {!mobileMatches &&
                            <small style={{ fontSize: '0.5rem' }}>${data.Project_Price}</small>
                        }
                    </Typography>
                    {data.Project_Price_24h !== 0 && data.Project_Price_24h !== '0.00' && <Flex margin={'6px 0 0 0'} justify={'center'}>
                        <Image src={data.Project_Price_24h > 0 ? arrowUp : arrowDown } style={{width:mobileMatches?'':'12px'}}/>
                        <Changes24 up={data.Project_Price_24h} style={{fontSize:mobileMatches?'12px':'7px',marginLeft:mobileMatches?'8px':'0px'}}>24H={data.Project_Price_24h}%</Changes24>
                    </Flex>}
                </Stack>
            </TableCell>
            <TableCell>
                <Typography>
                    <small style={{ fontSize: mobileMatches ? '1rem' : '0.5rem' }}>{votes}</small>
                </Typography>
            </TableCell>
            <TableCell>
                <Stack direction="row" alignItems="center">
                    {mobileMatches && <Votes address={data.Project_Address} height={'36px'} />}
                    <More>
                        {isOpen && <CheckPopup item={data} setIsOpen={setIsOpen} />}
                        <MoreButton onClick={() => setIsOpen(!isOpen)}>...</MoreButton>
                    </More>
                </Stack>
            </TableCell>
        </TableRow>
    )
};

export default Row;

export const WrapperIco = styled.div`
  width: 20px;
  height: 20px;
`