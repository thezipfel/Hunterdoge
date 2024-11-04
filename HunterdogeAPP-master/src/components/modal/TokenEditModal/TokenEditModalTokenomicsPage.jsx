import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Grid, InputBase} from "@material-ui/core";

const useStyles = makeStyles({
    inputRow: {
        display: 'fles',
        alignItems: 'center',
        margin: '0px',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '24px auto'
    },
    descriptionLabel: {
        marginTop: '10px'
    },
    tokenomic: {
        marginBottom: '120px'
    }
});

const InfoLinks = [
    { name: 'Project_Token_Max', label: 'Max supply' },
    { name: 'Project_Token_Burn', label: 'Burn supply' },
    { name: 'Project_Token_PreSale', label: 'Pre-sale supply' },
    { name: 'Project_Token_Team', label: 'Team tokens (%)' },
    { name: 'Project_Token_LiquidityLockDate', label: 'Liquidity lock date' },
    { name: 'Project_Token_LaunchDate', label: 'Launch date' },
    { name: 'Project_Token_BuyTax', label: 'Buy taxes (%)' },
    { name: 'Project_Token_SellTax', label: 'Sell taxes (%)' },
    { name: 'Project_Token_RewardFee', label: 'Holder rewards (%)' },
    { name: 'Project_Token_RewardsCurr', label: 'Rewards currency' },
    { name: 'Project_Token_LiqFee', label: 'Liquidity fees (%)' },
    { name: 'Project_Token_MarketingFee', label: 'Marketing fees (%)' }
]

const TokenEditModalTokenomicsPage = ({value, changeValue}) => {
    const classes = useStyles();
    const [data, setData] = useState({})
    const onChangeValue = (name, value) => {
        const data_temp = {...data}
        data_temp[name] = value
        setData(data_temp)
        changeValue(name, value)
    }

    useEffect(() => {
        if (value) setData(value)
        else setData({})
    }, [value])

    return (
        <div className={classes.tokenomic}>
            <Box component='h4' sx={{fontSize: '32px', fontWeight: '700',mb: '26px', textAlign: 'center', lineHeight: '32.4px', color: '#B78300'}}>
                2. Tokenomics
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {InfoLinks.slice(0, 6).map((link, idx) => (
                        <Grid container className={classes.inputRow} key={idx}>
                            <Grid item xs={5}>
                                <label>{link.label}</label>
                            </Grid>
                            <Grid item xs={7}>
                                <InputBase                               
                                    fullWidth
                                    sx={{ padding: '0px 8px' }}
                                    value={data[link.name]}
                                    onChange={(e) => { onChangeValue(link.name, e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    {InfoLinks.slice(6, 12).map((link, idx) => (
                        <Grid container className={classes.inputRow} key={idx}>
                            <Grid item xs={5} className={classes.descriptionLabel}>
                                <label>{link.label}</label>
                            </Grid>
                            <Grid item xs={7}>
                                <InputBase                               
                                    fullWidth
                                    sx={{ padding: '0px 8px' }}
                                    value={data[link.name]}
                                    onChange={(e) => { onChangeValue(link.name, e.target.value) }}
                                />
                            </Grid>
                        </Grid>                        
                    ))}               
                </Grid>
            </Grid>
        </div>
    )
}

export default TokenEditModalTokenomicsPage;
