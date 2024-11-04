import React, { useContext, useState, useEffect, useCall } from "react";
import { downVoteProject, upVoteProject, medVoteProject } from "../../../connection/functions";
import { Button, ButtonGreen, ButtonRed, ButtonYellow, VoteWrapper } from "../index";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { ExtraSmall, Input, Modal } from "./VotesStyled";
import { ModalContext } from "../../../contexts/ModalProvider";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stack from '@mui/material/Stack';
export const Votes = ({ address, big = false, height, size ,changeshowlink = () => {}}) => {
    // const {account, chainId} = useWeb3React()
    const { account, chainId, ethereum } = useWallet();
    const [votes, setVotes] = useState(0)
    const [activeBtn, setActiveBtn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(ModalContext)
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const voteUp = () => {
        if (chainId === 56) {
            if (votes > 0) {
                upVoteProject(ethereum, votes, account, address)
                setActiveBtn(false)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }
    const voteUpM = () => {
        if (chainId === 56) {
            if (votes > 0) {
                upVoteProject(ethereum, votes, account, address)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }

    const voteMed = () => {
        if (chainId === 56) {
            if (votes > 0) {
                medVoteProject(ethereum, votes, account, address)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }
    const voteMedM = () => {
        if (chainId === 56) {
            if (votes > 0) {
                medVoteProject(ethereum, votes, account, address)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }

    const voteAgainst = () => {
        if (chainId === 56) {
            if (votes > 0) {
                downVoteProject(ethereum, votes, account, address)
                setActiveBtn(false)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }
    const voteAgainstM = () => {
        if (chainId === 56) {
            if (votes > 0) {
                downVoteProject(ethereum, votes, account, address)
                setIsOpen(false)
            }
        } else {
            console.warn('Please connect your wallet to Binance Smart Chain network')
        }
    }

    const activeInput = () => {
        if (context.isMember[account]) {
            setActiveBtn(!activeBtn)
            setIsOpen(false)
        } else {
            alert('You need to register yourself first(for free)')
        }
    }
    const setModalshow =()=>{
        changeshowlink();
        activeInput();
    }
    return (
        <div>
            {mobileMatches && <VoteWrapper big={big}>
                {activeBtn && <Input big={big}
                    placeholder='enter number of the votes'
                    onChange={(e) => setVotes(e.target.value)}
                    onClick={() => setIsOpen(true)}
                />}
                {isOpen &&
                    <Modal big={big}>
                        <ButtonGreen onClick={() => voteUp()} >vote <ExtraSmall> x </ExtraSmall> 2</ButtonGreen>
                        <ButtonYellow onClick={() => voteMed()}>vote <ExtraSmall> x </ExtraSmall> 1</ButtonYellow>
                        <ButtonRed onClick={()=>voteAgainst()}>vote <ExtraSmall> x </ExtraSmall> -1</ButtonRed>
                    </Modal>}
                <Button margin={big && '0 0 0 auto'}
                    width={'79px'}
                    size={size || undefined}
                    height={activeBtn ? (height || '28px') : (height || '')}
                    onClick={()=>activeInput()}>Vote</Button>

            </VoteWrapper>}
            {!mobileMatches &&
                <VoteWrapper big={big}>
                    <Button margin={big && '0 0 0 auto'}
                        width={'79px'}
                        size={size || undefined}
                        height={'28px'} boxShadow={'none'}
                        onClick={()=> setModalshow()}>Vote</Button>
                    {activeBtn &&
                        <Stack style={{position:'relative', left:'142px', top:'-32px'}} spacing={1} direction="row">
                            <Input big={big}
                                style={{ width:'52px', height:'24px',  marginTop:'0px', padding:'0px', textAlign:'none'}}
                                placeholder='Amount'
                                onChange={(e) => setVotes(e.target.value)}
                                onClick={() => setIsOpen(true)}
                            />
                            <ButtonGreen onClick={() => voteUpM()} > <ExtraSmall> x </ExtraSmall> 2</ButtonGreen>
                            <ButtonYellow onClick={() => voteMedM()}> <ExtraSmall> x </ExtraSmall> 1</ButtonYellow>
                            <ButtonRed onClick={()=> voteAgainstM()}> <ExtraSmall> x </ExtraSmall> -1</ButtonRed>
                        </Stack>
                    }
                </VoteWrapper>}
        </div>
    )
}