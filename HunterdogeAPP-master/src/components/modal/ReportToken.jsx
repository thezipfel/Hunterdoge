import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Typography, useMediaQuery} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import styled from 'styled-components'

const useStyles = makeStyles({
	root: {
		width: '100vw',
		height: '100vh',
		margin: '0 auto'
	},

	modal: {
		zIndex: 100,
		position: "fixed",
		top: '15%',
		left: '50%',
		right: 0,
		margin: '0 auto',
		padding: ({ isMobile }) => isMobile ? '15px 5px' : '66px 160px 52px',
		width: ({ isMobile }) => isMobile ? 'calc(100vw - 20px)' : '926px',
		height: ({ isMobile }) => isMobile ? '400px' : '639px',
		background: '#FFF',
		border: '6px solid  #AB882E',
		boxSizing: 'border-box',
		borderRadius: ({ isMobile }) => isMobile ? '40px' : '60px',
		transform: 'translateX(-50%)'
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
		fontSize: ({isMobile})=> isMobile ? '1em' : '2em',
		lineHeight: ({isMobile})=> isMobile ? '1.65em' : '2em',
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

const ReportTokenModal = ({ setIsOpen }) => {
	const mobileMatches = useMediaQuery('(max-width:600px)');
	const classes = useStyles({ isMobile: mobileMatches });

	function sendMail() {
		var link = "mailto:info@hunterdoge.com"
			+ "?cc="
			+ "&subject=" + escape("Information")
			+ "&body=" + escape(`${document.getElementById('Message').value}`)

		window.open(link, '_blank');
	}

	return (
		<Card className={classes.modal}>
			<button className={classes.btnClose} onClick={() => setIsOpen(false)}>X</button>
			<div className={classes.wrapper}>
				<Box component='h4' sx={{ fontSize: (mobileMatches ? '2em' : '3.75em'), mb: (mobileMatches ? '15px' : '26px'), textAlign: 'center', lineHeight: '1em', color: '#000000' }}>
					report this token
				</Box>
				<Typography sx={{ fontSize: (mobileMatches ? '1em' : '1.55em'), textAlign: 'center', lineHeight: '1em', mb: '24px', textTransform: 'uppercase', color: '#000000' }}>
					Please leave your message below.
				</Typography>
				<label>
					<InputMessage
						isMobile={mobileMatches}
						id="Message"
					/>
				</label>
			</div>
			<Box component='div' sx={{ mt: (mobileMatches ? '15px' : '38px'), width: 257, mx: 'auto' }}>
				<Button
					onClick={() => sendMail()}
					fullWidth sx={{ fontSize: (mobileMatches ? '1em' : '1.5em'), py: 1, height: (mobileMatches ? '30px' : '47px') }}>send now</Button>
			</Box>
		</Card>
	);
};

export default ReportTokenModal;


const InputMessage = styled.textarea`
  width: ${({ isMobile }) => isMobile ? 'calc(100vw - 40px)' : '604px'};
  height: ${({ isMobile }) => isMobile ? '200px' : '311px'};
  padding: 15px;
  background: #FFF599;
  border: 2.72138px solid #9F7E04;
  box-sizing: border-box;
  border-radius: 27.2138px;
  font-size: 16px;
`
const InputEmail = styled.input`
  width: 446px;
  height: 47px;
  background: #FFF599;
  border: 2.72138px solid #9F7E04;
  box-sizing: border-box;
  border-radius: 27.2138px;
  font-size: 16px;
  padding: 5px;
`
