import React, { useState } from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from '../../images/hunter_logo.png';
import logo1 from '../../images/Amazed.png';
import logo2 from '../../images/Angel.png';
import logo3 from '../../images/Coolio.png';
import logo4 from '../../images/Confident.png';
import logo5 from '../../images/Disappointed.png';
import logo6 from '../../images/Evil_.png';
import logo7 from '../../images/Glasses.png';
import logo8 from '../../images/Happy.png';
import logo9 from '../../images/Thinking.png';
import logo10 from '../../images/Unhappy.png';
import styled from 'styled-components'
import {Image} from '../common';
import {useMediaQuery} from '@mui/material';

const useStyles = makeStyles({

	root: {
		width: '100vw',
		height: '100vh',
		margin: '0 auto'
	},

	modal: {
		zIndex: 100,
		position: ({ isMobile }) => isMobile ? 'fixed' : 'absolute',
		top: ({ isMobile }) => isMobile ? '0%' : 'unset',
		bottom: ({ isMobile }) => isMobile ? '0%' : '100%',
		left: ({ isMobile }) => isMobile ? '50%' : '310%',
		// right: 0,
		margin: '0 auto',
		padding: ({ isMobile }) => isMobile ? '15px 5px' : '46px 50px 30px',
		width: ({ isMobile }) => isMobile ? 'calc(100vw - 10px)' : '701px',
		height: ({ isMobile }) => isMobile ? '100%' : '394px',
		background: '#FFF599',
		border: '3px solid #FAF0CB',
		boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
		borderRadius: '25px',
		transform: 'translateX(-50%)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		"&:before": {
			content: '""',
			position: "absolute",
			bottom: '20px',
			left: '-40px',
			border: '15px solid transparent',
			borderRight: '35px solid #FFF599',
		}
	},
	btn: {
		fontSize: '10px',
		padding: '6.5px 12px'
	},
	btnClose: {
		position: 'absolute',
		top: ({ isMobile }) => isMobile ? '10px' : '35px',
		right: ({ isMobile }) => isMobile ? '15px' : '35px',
		fontWeight: 'bold',
		fontSize: ({ isMobile }) => isMobile ? '1.8em' : '2.6em',
		lineHeight: '1em',
		border: 'transparent',
		backgroundColor: 'transparent',
		color: '#B78300',
		cursor: 'pointer',
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	image: {
		width: ({ isMobile }) => isMobile ? 'calc(100vw / 4 - 25px)' : '103px',
		height: ({ isMobile }) => isMobile ? 'calc(100vw / 4 - 30px)' : '94px',
	},
	imageActive: {
		border: '1px solid red'
	}
});

const PickModal = ({ getAvatarID, setIsOpen }) => {
	const mobileMatches = useMediaQuery('(max-width:600px)');
	const classes = useStyles({ isMobile: mobileMatches });
	const [avatarId, setAvatarId] = useState(null);

	return (
		<Popup className={classes.modal} onClick={(e) => e.stopPropagation()}>
			<button className={classes.btnClose} onClick={() => setIsOpen(false)}>X</button>
			<div className={classes.wrapper}>
				<Typography sx={{ fontSize: (mobileMatches ? '1.7em' : '2.4em'), textAlign: 'center', lineHeight: '1em', mb: '1em', textTransform: 'uppercase' }}>
					pick your picture
				</Typography>
			</div>
			<WrapperPicture>
				<Image src={logo1} className={[classes.image, avatarId == 1 ? classes.imageActive : '']} onClick={() => setAvatarId(1)} />
				<Image src={logo2} className={[classes.image, avatarId == 2 ? classes.imageActive : '']} onClick={() => setAvatarId(2)} />
				<Image src={logo3} className={[classes.image, avatarId == 3 ? classes.imageActive : '']} onClick={() => setAvatarId(3)} />
				<Image src={logo4} className={[classes.image, avatarId == 4 ? classes.imageActive : '']} onClick={() => setAvatarId(4)} />
				<Image src={logo5} className={[classes.image, avatarId == 5 ? classes.imageActive : '']} onClick={() => setAvatarId(5)} />
				<Image src={logo6} className={[classes.image, avatarId == 6 ? classes.imageActive : '']} onClick={() => setAvatarId(6)} />
				<Image src={logo7} className={[classes.image, avatarId == 7 ? classes.imageActive : '']} onClick={() => setAvatarId(7)} />
				<Image src={logo8} className={[classes.image, avatarId == 8 ? classes.imageActive : '']} onClick={() => setAvatarId(8)} />
				<Image src={logo9} className={[classes.image, avatarId == 9 ? classes.imageActive : '']} onClick={() => setAvatarId(9)} />
				<Image src={logo10} className={[classes.image, avatarId == 10 ? classes.imageActive : '']} onClick={() => setAvatarId(10)} />
			</WrapperPicture>
			<Box component='div' sx={{ mt: (mobileMatches ? '10px' : '35px'), width: 257, mx: 'auto' }}>
				<Button
					onClick={() => {
						getAvatarID(avatarId)
						setIsOpen(false)
					}}
					fullWidth sx={{ fontSize: 15, py: 1, height: '30px', width: '161px' }}>choose</Button>
			</Box>
		</Popup>
	);
};

export default PickModal;


const InputMessage = styled.textarea`
  width: 604px;
  height: 311px;
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

const WrapperPicture = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 206px;
  gap: 20px;
  overflow-y: auto;
`
const Popup = styled.div`
    /* &::before {
      content: ''; 
      position: absolute;
      top: 0;
      left: -40px;
      border: 15px solid transparent;
      border-left: 35px solid #FFF599;
    } */
`