import React, { useEffect, useState } from 'react';
import { Stack, TableCell, TableRow, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import styled from "styled-components";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ReactComponent as Kyc } from "../../images/KYC.svg";
import { ReactComponent as Audit } from "../../images/Audit.svg";
import { ReactComponent as Utility } from "../../images/Utility.svg";
import { ReactComponent as Memecoin } from "../../images/Memecoin.svg";
import arrowUp from "../../images/arrow-up.svg";
import { Changes24, Flex, Image, LinkWrapper, More } from "../common";
import { Votes } from "../common/votes";
import { CheckPopup } from '../checkPopup/checkPopup';
import arrowDown from "../../images/arrow-down.svg";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Badges } from "../common/badges/Badges";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoLogoImage from '../../images/nologo.jpg'
import { NumberFormatter } from '../../utils/changeFormatter';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FFF599',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: '12px',
        border: '1px solid #dadde9',
        borderRadius: '20px'
    },
}));

const Row = ({ data, index, bnbPrice }) => {
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const [votes, setVotes] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setVotes(data.Project_Upvotes * 2 + data.Project_MedVotes - data.Project_Downvotes)
    }, [data])


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

            <TableCell style={{ textAlign: 'left', display: mobileMatches ? 'table-cell' : 'flex', alignItems: 'center' }}>
                {!mobileMatches && <Box component="img" src={data.Project_Logo || NoLogoImage} sx={{ width: '20px', height: '20px', marginRight: '4px' }} />}
                <LinkWrapper to={`/token/${data.Project_Address}`}>
                    <Stack>
                        <Typography sx={{ width:mobileMatches?'11em':'5em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {mobileMatches && data.Project_Name}
                            {!mobileMatches &&
                                <small style={{ fontSize: '0.5rem' }}>{data.Project_Name}</small>
                            }
                        </Typography>
                        {mobileMatches &&
                            <Stack direction="row"
                                sx={{ gap: mobileMatches ? 2 : 1, mt: mobileMatches ? '14px' : '2px' }}>
                                {
                                    data.Project_ISKYC === 'TRUE' &&
                                    <HtmlTooltip
                                        title={<React.Fragment><Typography>KYC verified</Typography></React.Fragment>}>
                                        <Kyc />
                                    </HtmlTooltip>
                                }
                                {
                                    data.Project_ISDOX === 'TRUE' &&
                                    <HtmlTooltip
                                        title={<React.Fragment><Typography>Audited token</Typography></React.Fragment>}>
                                        <Audit />
                                    </HtmlTooltip>
                                }
                                {
                                    data.Project_HasUtility === 'TRUE' &&
                                    <HtmlTooltip
                                        title={<React.Fragment><Typography>Usecase token</Typography></React.Fragment>}>
                                        <Utility />
                                    </HtmlTooltip>
                                }
                                {
                                    data.Project_IsMemeCoin === 'TRUE' &&
                                    <HtmlTooltip
                                        title={<React.Fragment><Typography>Meme token</Typography></React.Fragment>}>
                                        <Memecoin />
                                    </HtmlTooltip>
                                }
                            </Stack>
                        }
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
                        <Image src={data.Project_Price_24h > 0 ? arrowUp : arrowDown} style={{width:mobileMatches?'':'12px'}} />
                        <Changes24 up={data.Project_Price_24h} style={{fontSize:mobileMatches?'12px':'7px',marginLeft:mobileMatches?'8px':'0px'}}>24H={data.Project_Price_24h}%</Changes24>
                    </Flex>}
                </Stack>
            </TableCell>
            {mobileMatches && <TableCell>
                <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, color: "#16DF42" }}>
                    {mobileMatches && <label>{NumberFormatter(Number(data.Project_LiqMcapRatio).toFixed(2))}%</label>}
                    {!mobileMatches &&
                        <small style={{ fontSize: '0.5rem' }}>{NumberFormatter(Number(data.Project_LiqMcapRatio).toFixed(2))}%</small>
                    }
                </Typography>
            </TableCell>}
            {mobileMatches && <TableCell>
                <Typography variant="table">
                    {mobileMatches && <label>{NumberFormatter(Number(data.Project_Holder))}</label>}
                    {!mobileMatches &&
                        <small style={{ fontSize: '0.5rem' }}>{NumberFormatter(Number(data.Project_Holder))}</small>
                    }
                </Typography>
            </TableCell>}
            {mobileMatches && <TableCell>
                <Typography variant="table">
                    {mobileMatches && <label>{NumberFormatter(Number(data.Project_HolderGrowth))}</label>}
                    {!mobileMatches &&
                        <small style={{ fontSize: '0.5rem' }}>{NumberFormatter(Number(data.Project_HolderGrowth))}</small>
                    }
                </Typography>
            </TableCell>}

            {mobileMatches &&
                <>
                    <TableCell>
                        <Typography variant="table" sx={{ width: mobileMatches ? '50px' : '20px', fontsize: '15px' }}>
                            {NumberFormatter(Number(votes))}
                        </Typography>
                    </TableCell>
                </>
            }
            {!mobileMatches && <TableCell style={{padding:mobileMatches?'':'0px'}}>
                <Typography>
                    <small style={{ fontSize: mobileMatches ? '1rem' : '0.5rem' }}>{NumberFormatter(Number(votes))}</small>
                </Typography>
            </TableCell>}
            <TableCell>
                <Stack direction="row" alignItems="center">
                    {mobileMatches && <Votes address={data.Project_Address} height={'36px'} />}
                    <More>
                        {isOpen && <CheckPopup item={data} setIsOpen={setIsOpen} />}
                        <span onClick={() => setIsOpen(!isOpen)}>...</span>
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