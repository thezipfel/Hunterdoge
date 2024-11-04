import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import {Checkbox, Input, Stack} from '@mui/material';
import {Button, Flex, Text} from "../components/common/index";

import {GoogleSheetContext} from '../contexts/GoogleSheetProvider';

const GeneralLinks = [
    {name: 'Project_Name', label: 'Project name'},
    {name: 'Project_Symbol', label: 'Token Ticker'},
    {name: 'Project_Address', label: 'Contract address'},
    {name: 'Project_Website', label: 'Website'},
    {name: 'Project_Telegram', label: 'Telegram link'},
    {name: 'Project_Twitter', label: 'Twitter link'},
    {name: 'Project_Discord', label: 'Discord link'},
    {name: 'Project_Instagram', label: 'Instagram link'},
    {name: 'Project_Reddit', label: 'Reddit link'},
    {name: 'Project_Medium', label: 'Medium link'},
    {name: 'Project_Logo', label: 'Logo link'},
    {name: 'Project_Description', label: 'Project description', isTextarea: true},
]

const TokennoicsLinks = [
    {name: 'Project_Token_Max', label: 'Max supply'},
    {name: 'Project_Token_Burn', label: 'Burn supply'},
    {name: 'Project_Token_PreSale', label: 'Pre-sale supply'},
    {name: 'Project_Token_Team', label: 'Team tokens (%)'},
    {name: 'Project_Token_LiquidityLockDate', label: 'Liquidity lock date'},
    {name: 'Project_Token_LaunchDate', label: 'Launch date'},
    {name: 'Project_Token_BuyTax', label: 'Buy taxes (%)'},
    {name: 'Project_Token_SellTax', label: 'Sell taxes (%)'},
    {name: 'Project_Token_RewardFee', label: 'Holder rewards (%)'},
    {name: 'Project_Token_RewardsCurr', label: 'Rewards currency'},
    {name: 'Project_Token_LiqFee', label: 'Liquidity fees (%)'},
    {name: 'Project_Token_MarketingFee', label: 'Market fees (%)'}
]

const PresaleLinks = [
    {name: 'Project_Presale_Launchpad', label: 'Launchpad'},
    {name: 'Project_Presale_Link', label: 'Presale link'},
    {name: 'Project_Presale_SC', label: 'Soft cap'},
    {name: 'Project_Presale_HC', label: 'Hard cap'},
    {name: 'Project_Presale_MinContr', label: 'Min contribution'},
    {name: 'Project_Presale_MaxContr', label: 'Max contribution'},
    {name: 'Project_Presale_LiqLock', label: 'Liquidity lock (%)'},
    {name: 'Project_Presale_LiqLockTime', label: 'Liquidity lock period'},
    {name: 'Project_Presale_Price', label: 'Presale price'},
    {name: 'Project_Presale_ListingPrice', label: 'Listing price'},
    {name: 'Project_Presale_Start', label: 'Presale start'},
    {name: 'Project_Presale_End', label: 'Presale end'},
    {name: 'Project_Presale_Banner', label: 'Banner link'}
]


const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        width: '100%',
        padding: '20px'
    },
    inputGroup: {
        width: '100%',
        '& > p': {
            padding: '5px 10px 0px 10px',
            fontSize: '0.8em'
        },
        '& input': {
            fontSize: '0.8em',
            padding: '1px 5px'
        },
        '& textarea': {
            fontSize: '0.8em',
            resize: 'none',
            height: '5em',
            width: '100%',
            borderRadius: '1em',
            padding: '0.5em'
        }
    }
});

const TokenEditPage = () => {
    let history = useHistory();
    const {address} = useParams()
    const {data} = useContext(GoogleSheetContext)
    const classes = useStyles()
    const [openPresale, setOpenPresale] = useState(false)

    const [generalInfo, setGeneralInfo] = useState({
        Project_Name: '',
        Project_Symbol: '',
        Project_Address: '',
        Project_Website: '',
        Project_Telegram: '',
        Project_Twitter: '',
        Project_Discord: '',
        Project_Instagram: '',
        Project_Reddit: '',
        Project_Medium: '',
        Project_Logo: '',
        Project_Description: '',
        Project_PancakeLink: '',
        Project_CMCLink: '',
        Project_CGLink: '',
    })

    const [tokenomics, setTokenomics] = useState({
        Project_Token_Max: '',
        Project_Token_Burn: '',
        Project_Token_PreSale: '',
        Project_Token_Team: '',
        Project_Token_LiquidityLockDate: '',
        Project_Token_LaunchDate: '',
        Project_Token_BuyTax: '',
        Project_Token_SellTax: '',
        Project_Token_RewardFee: '',
        Project_Token_RewardsCurr: '',
        Project_Token_LiqFee: '',
        Project_Token_MarketingFee: '',
    })

    const [presales, setPresales] = useState({
        Project_Presale_Launchpad: '',
        Project_Presale_Link: '',
        Project_Presale_SC: '',
        Project_Presale_HC: '',
        Project_Presale_MinContr: '',
        Project_Presale_MaxContr: '',
        Project_Presale_Banner: '',
        Project_Presale_LiqLock: '',
        Project_Presale_LiqLockTime: '',
        Project_Presale_Price: '',
        Project_Presale_ListingPrice: '',
        Project_Presale_Start: '',
        Project_Presale_End: '',
    })

    const handleChangeGeneralInfo = (value, key) => {
        setGeneralInfo(state => ({...state, [key]: value}))
    }

    const handleChangeTokenomics = (value, key) => {
        setTokenomics(state => ({...state, [key]: value}))
    }

    const handleChangePresales = (value, key) => {
        setPresales(state => ({...state, [key]: value}))
    }

    const handleOpenPresale = (e) => {
        setOpenPresale(e.target.checked)
    }

    useEffect(() => {
        data.map((row) => {
            if (row?.Project_Address?.toLowerCase() === address.toLowerCase()) {
                for (let i in generalInfo) {
                    generalInfo[i] = row[i]
                }
                for (let i in tokenomics) {
                    tokenomics[i] = row[i]
                }
                for (let i in presales) {
                    presales[i] = row[i]
                }

                setGeneralInfo(state => ({...state, generalInfo}))
                setTokenomics(state => ({...state, tokenomics}))
                setPresales(state => ({...state, presales}))
            }
            return row
        })
    }, [data, address])

    return (
        <Stack className={classes.root}>
            <Button
                onClick={() => history.goBack()}
                size={'20px'}
                height={'30px'}
                width={'100px'}
                weight={700}
                margin={'30px 0 0 0'}
                bg={'transparent'}
                boxShadow={'unset'}
                color={'#B78300'}
            >{`<< BACK`}</Button>
            <Text size={'1em'} margin={'20px auto 10px auto'}>edit your token information</Text>
            <Stack className={classes.container}>
                <Text size={'0.8em'} margin={'0px auto 15px auto'} font={'italic'}>1. General information</Text>
                {
                    GeneralLinks.map((item, index) =>
                        <Stack key={index} className={classes.inputGroup}>
                            <Typography>{item.label}</Typography>
                            {
                                item.isTextarea
                                    ?
                                    <Stack component='textarea' defaultValue={generalInfo[item.name]} onChange={(e) => {
                                        handleChangeGeneralInfo(e.target.value, item.name)
                                    }}/>
                                    :
                                    <Input value={generalInfo[item.name]} onChange={(e) => {
                                        handleChangeGeneralInfo(e.target.value, item.name)
                                    }}/>
                            }
                        </Stack>
                    )
                }
                <Text size={'0.8em'} margin={'20px auto 10px auto'} font={'italic'}>2. Tokenomics</Text>
                {
                    TokennoicsLinks.map((item, index) =>
                        <Stack key={index} className={classes.inputGroup}>
                            <Typography>{item.label}</Typography>
                            <Input value={tokenomics[item.name]} onChange={(e) => {
                                handleChangeTokenomics(e.target.value, item.name)
                            }}/>
                        </Stack>
                    )
                }
                <Text size={'0.8em'} margin={'20px auto 10px auto'} font={'italic'}>3. Pre-sale information</Text>
                <Flex>
                    <Typography sx={{fontSize: '0.8em'}}>Do you have an upcoming pre-sale?</Typography>
                    <Checkbox onChange={handleOpenPresale}></Checkbox>
                </Flex>
                {
                    openPresale && PresaleLinks.map((item, index) =>
                        <Stack key={index} className={classes.inputGroup}>
                            <Typography>{item.label}</Typography>
                            <Input value={presales[item.name]} onChange={(e) => {
                                handleChangePresales(e.target.value, item.name)
                            }}/>
                        </Stack>
                    )
                }
            </Stack>
        </Stack>
    );
};

export default TokenEditPage;
