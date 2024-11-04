import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Grid, InputBase} from "@material-ui/core";
import styled from 'styled-components';

const useStyles = makeStyles({
    inputRow: {
        display: 'flex',
        alignItems: 'center',
        margin: '0px',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '24px auto'
    },
    descriptionLabel: {
        marginTop: '10px'
    }
});

const InfoLinks = [
    { name: 'Project_Name', label: 'Project name' },
    { name: 'Project_Symbol', label: 'Token symbol' },
    { name: 'Project_Address', label: 'Contract address' },
    { name: 'Project_Website', label: 'Website' },
    { name: 'Project_Telegram', label: 'Telegram link' },
    { name: 'Project_Twitter', label: 'Twitter link' },
    { name: 'Project_Discord', label: 'Discord link' },
    { name: 'Project_Instagram', label: 'Instagram link' },
    { name: 'Project_Reddit', label: 'Reddit link' },
    { name: 'Project_Medium', label: 'Medium link' },
    { name: 'Project_Logo', label: 'Logo link' },
    { name: 'Project_Description', label: 'Project description' },
    { name: 'Project_PancakeLink ', label: 'PancakeSwap link' },
    { name: 'Project_CMCLink', label: 'CMC link' },
    { name: 'Project_CGLink', label: 'CG link' },
]

const TokenEditModalGeneralPage = ({value, changeValue, isNew}) => {
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
        <div>
            <Box component='h4' sx={{fontSize: '32px', fontWeight: '700',mb: '26px', textAlign: 'center', lineHeight: '32.4px', color: '#B78300'}}>
                1. General information
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {(!isNew ? InfoLinks.slice(0, 10) : [...InfoLinks.slice(0, 3), { name: 'Project_Manager', label: 'Manager Address' }, ...InfoLinks.slice(3, 10)])
                        .map((link, idx) => (
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
                                >
                                </InputBase>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    {InfoLinks.slice(10, 15).map((link, idx) => (
                        link.name != 'Project_Description' ?
                        (
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
                                    >
                                    </InputBase>
                                </Grid>
                            </Grid>
                        ):
                        (
                            <Grid container className={classes.inputRow} key={idx}>
                                <Grid item xs={12} className={classes.descriptionLabel}>
                                    <label>Project description</label>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputMessage
                                        id="Message"
                                        value={data[link.name]}
                                        onChange={(e) => { onChangeValue(link.name, e.target.value) }}
                                    />
                                </Grid>
                            </Grid>
                        )
                    ))}               
                </Grid>
            </Grid>
        </div>
    )
}

export default TokenEditModalGeneralPage;

const InputMessage = styled.textarea`
  width: 100%;
  height: 294px;
  padding: 15px;
  margin-top: 4px;
  border: 2.72138px solid #9F7E04;
  box-sizing: border-box;
  border-radius: 16px;
  filter: drop-shadow(0px 5px 0px rgba(0, 0, 0, 0.1));
  color: #B78300;
  font-size: 20px;
  font-weight: bold;
`