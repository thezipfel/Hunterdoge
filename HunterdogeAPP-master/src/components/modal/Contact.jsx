import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import styled from 'styled-components'
import {useMediaQuery} from '@mui/material';

const useStyles = makeStyles({

    root: {
        width: '100vw',
        height: '100vh',
        margin: '0 auto'
    },

    modal: {
        zIndex: 100,
        position: "fixed",
        top: '10%',
        left: ({ isMobile }) => isMobile ? '0%' : '50%',
        right: 0,
        margin: '0 auto',
        padding: ({ isMobile }) => isMobile ? '15px 5px' : '66px 0px 52px',
        width: ({ isMobile }) => isMobile ? 'calc(100% - 20px)' : '700px',
        height: ({ isMobile }) => isMobile ? '400px' : '600px',
        background: '#FFF',
        border: '6px solid  #AB882E',
        boxSizing: 'border-box',
        borderRadius: ({ isMobile }) => isMobile ? '40px' : '60px',
    },
    btn: {
        fontSize: '10px',
        padding: '6.5px 12px'
    },
    btnClose: {
        position: 'absolute',
        top: ({ isMobile }) => isMobile ? '10px' : '35px',
        right: ({ isMobile }) => isMobile ? '10px' : '35px',
        width: ({ isMobile }) => isMobile ? '30px' : '68px',
        height: ({ isMobile }) => isMobile ? '25px' : '51px',
        fontWeight: 'bold',
        fontSize: ({ isMobile }) => isMobile ? '1.65em' : '2.5em',
        lineHeight: '1em',
        borderRadius: '50%',
        border: 'transparent',
        backgroundColor: '#000',
        color: '#FFF',
        cursor: 'pointer',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

const ContactModal = ({ setIsOpen }) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
    const classes = useStyles({ isMobile: mobileMatches });

    function sendMail() {
        var link = "mailto:info@hunterdoge.com"
            + "?cc="
            + "&subject=" + escape("Information")
            + "&body=" + escape(`${document.getElementById('Message').value} \n My e-mail: ${document.getElementById('Email').value}`);

        window.open(link, '_blank');
    }

    return (
        <Card className={classes.modal}>
            <button className={classes.btnClose} onClick={() => setIsOpen(false)}>X</button>
            <div className={classes.wrapper}>
                <Box component='h4' sx={{ fontSize: (mobileMatches ? '1.8em' : '3.75em'), mb: '26px', textAlign: 'center', lineHeight: '1em', color: '#000000' }}>
                    contact us
                </Box>
                <Typography sx={{ fontSize: (mobileMatches ? '0.8em' : '1.6em'), textAlign: 'center', lineHeight: '1em', mb: '24px', textTransform: 'uppercase', color: '#000000' }}>
                    Please leave your message below.
                </Typography>
                <label>
                    <InputMessage
                        isMobile={mobileMatches}
                        id="Message"
                    />
                </label>
                <Typography sx={{ fontSize: (mobileMatches ? '0.8em' : '1.6em'), textAlign: 'center', lineHeight: '1em', mb: '14px', mt: (mobileMatches ? '10px' : '34px'), textTransform: 'uppercase', color: '#000000' }}>
                    your e-mail
                </Typography>
                <InputEmail isMobile={mobileMatches} id="Email" />
            </div>
            <Box component='div' sx={{ mt: (mobileMatches ? '10px' : '38px'), width: (mobileMatches ? '150px' : '257px'), mx: 'auto' }}>
                <Button
                    onClick={() => sendMail()}
                    fullWidth sx={{ fontSize: (mobileMatches ? '1em' : '24px'), py: 1, height: (mobileMatches ? '2em' : '47px') }}>send now</Button>
            </Box>
        </Card>
    );
};

export default ContactModal;


const InputMessage = styled.textarea`
  width: ${({ isMobile }) => isMobile ? 'calc(100vw - 50px)' : '550px'};
  height: 150px;
  padding: ${({ isMobile }) => isMobile ? '5px' : '15px'};
  background: #FFF599;
  border: 2.72138px solid #9F7E04;
  box-sizing: border-box;
  border-radius: ${({ isMobile }) => isMobile ? '15px' : '27.2138px'};
  font-size: 1em;
  resize: none;
`
const InputEmail = styled.input`
  width: ${({ isMobile }) => isMobile ? 'calc(100vw - 80px)' : '446px'};
  height: ${({ isMobile }) => isMobile ? '1.8em' : '47px'};
  background: #FFF599;
  border: 2.72138px solid #9F7E04;
  box-sizing: border-box;
  border-radius: 27.2138px;
  font-size: 1em;
  padding: 5px;
`
