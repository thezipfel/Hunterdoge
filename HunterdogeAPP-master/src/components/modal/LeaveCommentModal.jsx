import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useParams } from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {Card, Input, Stack} from '@mui/material';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import React, {useState} from 'react';
import styled from 'styled-components';
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
import {Button, Flex, Image} from '../common';
import PickModal from './PickModal';
import { postComment } from '../../connection/functions';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FFF599',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: '1em',
        border: '1px solid #dadde9',
        borderRadius: '20px'
    },
}));

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
        padding: '15px 5px',
        width: 'calc(100vw - 10px)',
        height: '260px',
        background: 'rgba(255, 248, 204, 0.85);',
        border: '3px solid  #AB882E',
        boxSizing: 'border-box',
        borderRadius: '40px',
        transform: 'translateX(-50%)'
    },
    content: {
        backgroundColor: '#FFF',
        borderRadius: '20px',
        padding: '10px'
    },
    btnClose: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '30px',
        height: '25px',
        fontWeight: 'bold',
        fontSize: '25px',
        lineHeight: '25px',
        borderRadius: '50%',
        border: 'transparent',
        backgroundColor: '#000',
        color: '#FFF',
        cursor: 'pointer',
    },
    input: {
        resize: 'none',
        width: '100%',
        padding: '5px',
        margin: '5px auto',
        border: '2px solid #B78300',
        "&:before": {
            border: 'none!important'
        },
        "&:after": {
            border: 'none'
        },
        "&::placeholder": {
            color: '#AB882E',
            fontWeight: '600',
            opacity: 0.5
        }
    },
    inputBox: {
        width: '60%'
    }
});

const LeaveCommentModal = ({ setIsOpen }) => {
    const { address } = useParams()
    const { account } = useWallet()
    const [username, setUsername] = useState('')
    const [message, setMessge] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [avatarId, setAvatarId] = useState(0)
    const classes = useStyles();
    const [isModal, setIsModal] = useState(false)

    const addComment = () => {
        if (username === '') {
            alert("Input username")
            return
        }
        if (subjectName === '') {
            alert("Input subject")
            return
        }
        if (message === '') {
            alert('Input message')
            return
        }
        console.log("post comment")
        postComment(address, username, avatarId, message, account)
    }

    return (
        <Card className={classes.modal}>
            <button className={classes.btnClose} onClick={() => setIsOpen(false)}>X</button>
            <Flex className={classes.content} margin={'30px auto 10px auto'}>
                <Flex direction={'column'} mwidth={'35%'} margin={'0'}>
                    {/* <Image src={logo} width={`${window.innerWidth / 3}px`} /> */}
                    {avatarId === 0 && <Image src={logo} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 1 && <Image src={logo1} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 2 && <Image src={logo2} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 3 && <Image src={logo3} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 4 && <Image src={logo4} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 5 && <Image src={logo5} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 6 && <Image src={logo6} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 7 && <Image src={logo7} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 8 && <Image src={logo8} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 9 && <Image src={logo9} width={`${window.innerWidth / 6}px`} />}
                    {avatarId === 10 && <Image src={logo10} width={`${window.innerWidth / 6}px`} />}
                    <Button onClick={() => setIsModal(!isModal)} width={'100%'} margin={'5px auto 0'} size={'8px'} height={'12px'} bg={'#AB882E'}>Pick another picture
                        {isModal && <PickModal getAvatarID={setAvatarId} setIsOpen={setIsModal} />}
                    </Button>
                </Flex>
                <Flex direction={'column'} mwidth={'60%'} className={classes.inputBox}>
                    <Input
                        className={classes.input}
                        sx={{ height: '20px' }}
                        onChange={(e) => setUsername(e.target.value)}
                        inputProps={{ sx: { padding: '3px', fontSize: '10px' } }}
                        placeholder='Your nickname' size='small'></Input>
                    {/* <Input
                        className={classes.input}
                        sx={{ height: '25px' }}
                        onChange={(e) => setSubjectName(e.target.value)}
                        inputProps={{ sx: { padding: '3px', fontSize: '10px' } }}
                        placeholder='Subject' size='small'></Input> */}
                    <Stack onChange={(e) => setMessge(e.target.value)} className={classes.input} sx={{ height: '60px', color: '#AB882E', fontSize: '10px' }} component="textarea" placeholder='Your comment'></Stack>
                </Flex>
            </Flex>
            <Stack component='div' sx={{ width: 257, mx: 'auto' }}>
                <Button width={'130px'} margin={'auto'} size={'14px'} height={'20px'} bg={'#AB882E'} onClick={addComment}>add comment</Button>
            </Stack>
        </Card>
    )
}

export default LeaveCommentModal;
