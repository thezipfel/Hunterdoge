import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import {Button, ButtonGroup} from '@mui/material';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Typography} from "@material-ui/core";
import {approveTokens, membership, membershipCosts} from "../../connection/functions";
import {useWallet} from "@binance-chain/bsc-use-wallet";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        margin: '0 auto'
    },
    modal: {
        zIndex: 100,
        position: "fixed",
        top: ({isMobile}) => isMobile ? '10%' : '25%',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: ({isMobile}) => isMobile ? '926px' : '95%',
        height: ({isMobile}) => isMobile ? '454px' : '230px',
        background: '#FFF',
        border: '6px solid  #AB882E',
        boxSizing: 'border-box',
        borderRadius: ({isMobile}) => isMobile ? '60px' : '40px',
        padding: ({isMobile}) => isMobile ? '60px' : '10px',
    },
    flexLine: {

        height: '23px',
        display: 'flex',
        marginRight: '150px',
        justifyContent: 'right'
    },
    value: {
        width: '94px',
        marginRight: '15px',
        fontWeight: 'bold',
        fontSize: '18px',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    btn: {
        fontSize: '10px',
        padding: '6.5px 12px'
    },
    btnClose: {
        position: 'absolute',
        top: ({isMobile}) => isMobile ? '35px' : '10px',
        right: ({isMobile}) => isMobile ? '35px' : '10px',
        width: ({isMobile}) => isMobile ? '68px' : '30px',
        height: ({isMobile}) => isMobile ? '51px' : '25px',
        fontWeight: 'bold',
        fontSize: ({isMobile}) => isMobile ? '2.5em' : '1.65em',
        lineHeight: '1em',
        borderRadius: '50%',
        border: 'transparent',
        backgroundColor: '#000',
        color: '#FFF',
        cursor: 'pointer',
    },
});

const RegisterModal = ({setIsOpen}) => {
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const [cost, setCost] = useState('0')
    // const {account, chainId} = useWeb3React()
    const {account, chainId, ethereum} = useWallet();
    const classes = useStyles({isMobile: mobileMatches});

    const approve = async () => {
        if (account) {
            await approveTokens(ethereum, account)
        } else {
            alert('You need to connect wallet')
        }
    }

    const buy = async () => {
        if (account) {
            await membership(ethereum, account)
        } else {
            alert('You need to connect wallet')
        }
    }

    useEffect(() => {
        const call = async () => {
            const res = await membershipCosts()
            console.log(res)
            setCost(res)
        }
        {
            chainId === 56 && call()
        }
    }, [account])

    return (
        <Card className={classes.modal}>
            <button className={classes.btnClose} onClick={() => setIsOpen(false)}>X</button>
            <div>
                <Box component='h4' sx={{
                    fontSize: (mobileMatches ? '3.75em' : '1.8em'),
                    mb: (mobileMatches ? '26px' : '10px'),
                    textAlign: 'center',
                    lineHeight: '1em',
                    color: '#000000'
                }}>
                    register
                </Box>
                <Typography sx={{
                    fontSize: (mobileMatches ? '1.75em' : '0.8em'),
                    textAlign: 'center',
                    lineHeight: '1em',
                    mb: (mobileMatches ? '35px' : '15px'),
                    textTransform: 'uppercase',
                    color: '#000000'
                }}>
                    get a membership to support your favorite projects
                </Typography>
                <Typography sx={{
                    fontSize: (mobileMatches ? '1.75em' : '0.8em'),
                    textAlign: 'center',
                    lineHeight: '1em',
                    mb: (mobileMatches ? '17px' : '10px'),
                    textTransform: 'uppercase',
                    color: 'rgba(183, 131, 0, 0.6)'
                }}>
                    membership costs
                </Typography>
                <Typography sx={{
                    fontSize: (mobileMatches ? '1.85em' : '1em'),
                    textAlign: 'center',
                    lineHeight: '1em',
                    textTransform: 'uppercase',
                    color: '#000000'
                }}>
                    {cost} $HD
                </Typography>
            </div>
            <ButtonGroup 
                disableElevation variant="center"
                sx={{mt:'20px', textAlign:'center', ml:mobileMatches? '200px': 'auto', display:'flex', justifyContent:'center'}}>
                <Button onClick={()=> approve()}
                        fullWidth sx={{
                    fontSize: (mobileMatches ? '1.75em' : '0.9em'),
                    py: 1,
                    width: mobileMatches ? '200px' : '130px',
                    height: (mobileMatches ? '47px' : '2em')
                }}
                style={{cursor:'pointer',
                padding:'0px'}}>Approve
                </Button>
                <Button onClick={()=> buy()}
                        fullWidth sx={{
                    fontSize: (mobileMatches ? '1.75em' : '0.9em'),
                    py: 1,
                    width: mobileMatches ? '200px' : '130px',
                    height: (mobileMatches ? '47px' : '2em'),
                }} style={{cursor:'pointer',padding:'0px'}}>Buy
                </Button>
            </ButtonGroup>
        </Card>
    );
};

export default RegisterModal;
