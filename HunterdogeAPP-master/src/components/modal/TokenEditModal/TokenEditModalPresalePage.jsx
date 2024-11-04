import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Grid, InputBase} from "@material-ui/core";
import styled from 'styled-components';
import {Checkbox} from '@mui/material';

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
    perBNB: {
        fontSize: '12px',
        marginLeft: '2px'
    },
    bannerInput: {
        marginTop: '80px'
    }
});

const InfoLinks = [
    { name: 'Project_Presale_Launchpad', label: 'Launchpad' },
    { name: 'Project_Presale_Link', label: 'Presale link' },
    { name: 'Project_Presale_SC', label: 'Soft cap' },
    { name: 'Project_Presale_HC', label: 'Hard cap' },
    { name: 'Project_Presale_MinContr', label: 'Min contribution' },
    { name: 'Project_Presale_MaxContr', label: 'Max contribution' },
    { name: 'Project_Presale_Banner', label: 'Banner link' },
    { name: 'Project_Presale_LiqLock', label: 'Liquidity lock (%)' },
    { name: 'Project_Presale_LiqLockTime', label: 'Liquidity lock period' },
    { name: 'Project_Presale_Price', label: 'Presale price' },
    { name: 'Project_Presale_ListingPrice', label: 'Listing price' },
    { name: 'Project_Presale_Start', label: 'Presale start' },
    { name: 'Project_Presale_End', label: 'Presale end' }   
]

const TokenEditModalPresalePage = ({value, changeValue}) => {
    const classes = useStyles();
    const [data, setData] = useState({})
    useEffect(() => {
        if (value) setData(value)
        else setData({})
    }, [value])

    const onChangeValue = (name, value) => {
        const data_temp = {...data}
        data_temp[name] = value
        setData(data_temp)
        changeValue(name, value)
    }

    return (
        <div>
            <Box component='h4' sx={{fontSize: '32px', fontWeight: '700',mb: '26px', textAlign: 'center', lineHeight: '32.4px', color: '#B78300'}}>
                3. Presale information
            </Box>
            <PresaleCheckBox onClick={() => { onChangeValue('has_Presale', data.has_Presale === 'TRUE' ? 'FALSE': 'TRUE') }}>
                <span>Do you have an upcoming presale?</span>
                <Checkbox checked={data.has_Presale === 'TRUE'}
                    sx={{
                        root: {
                        color: 'red',
                        },
                        '&.Mui-checked': {
                        color: '#AB882E',
                        },
                }} />
            </PresaleCheckBox>
           
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {InfoLinks.slice(0, 7).map((link, idx) => (
                        <Grid container className={classes.inputRow + ' ' + `${link.name === 'banner' ? classes.bannerInput: ''}`} key={idx}>
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
                    {InfoLinks.slice(7, 13).map((link, idx) => (
                        <Grid container className={classes.inputRow} key={idx}>
                            <Grid item xs={5} className={classes.descriptionLabel}>
                                <label>
                                {
                                    link.name === 'presalePrice' || link.name === 'listingPrice' ?
                                    <>
                                        {link.label} 
                                        <span className={classes.perBNB}> per 1 BNB</span>
                                    </> :
                                    <>{link.label}</>
                                }
                                </label>
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

export default TokenEditModalPresalePage;

const PresaleCheckBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`