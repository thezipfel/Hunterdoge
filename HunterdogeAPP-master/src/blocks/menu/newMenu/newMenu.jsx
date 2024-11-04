import React,{useEffect,useState} from 'react';
import { LinkWrapper } from "../../../components/common";
import hunterdogeShadow from '../../../images/hunterdoge_menu.png';
import SearchInput from "../../../components/searchInput";
import SearchAutocomplet from "../../../components/searchAutocomplete";
import { CloseButton, Flex, ImageWrapper, SmallWrappedButton, Title, Wrapp, WrappedButton, Wrapper, Menubutton } from "./MenuStyled";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Stack } from '@mui/material';
import ConnectWallet from '../../../connection/ConnectWallet';
import { Button } from "../../../components/common";
import {Button as MuiButton} from "@mui/material";
const NewMenu = (props) => {
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const [address, setaddress]=useState('')
    const onClickRegister = () => {
        props.setOpen(false)
        props.openRegister()
    }
    const onClickContact = () => {
        if (props.setOpen) {
            props.setOpen(false)
        }
        props.setIsContact(true)
    }
 
        
    
    return (
        <>
            {mobileMatches &&
                <Wrapper>
                    <Wrapp style={{marginRight:'22px'}}>
                        {/* <SearchInput small setValue={()=>setmodal()} mb={'28px'} /> */}
                        <SearchAutocomplet></SearchAutocomplet>
                    </Wrapp>
                    <LinkWrapper onClick={() => {
                        props.setOpen && props.setOpen(false)
                    }} to="/allTokens">
                        <WrappedButton>all tokens</WrappedButton>
                    </LinkWrapper>
                    <a onClick={() => {
                        props.setOpen && props.setOpen(false)
                    }} href="https://t.me/huntersground" target="_blank" style={{ width: '100%' }}>
                        <WrappedButton>telegram shill bot</WrappedButton>
                    </a>
                    <WrappedButton onClick={onClickContact}>contact</WrappedButton>
                    <Flex>
                        <a onClick={() => {
                            props.setOpen && props.setOpen(false)
                        }} href="https://t.me/hunterdogeofficial" target="_blank" style={{ width: '100%' }}>
                            <SmallWrappedButton > Apply for Listing
                            </SmallWrappedButton>
                        </a>
                        <ImageWrapper src={hunterdogeShadow} />
                    </Flex>
                </Wrapper>
            }
            {!mobileMatches &&
                <Wrapper >
                    <Title>HUNTERDOGE</Title>
                    <Wrapp>
                        <CloseButton onClick={() => props.setOpen(false)}>X</CloseButton>
                    </Wrapp>
                    <Stack direction='row' sx={{mb:'20px', display:'flex', justifyContent:'space-between', width:'100%'}} >
                        <MuiButton onClick={onClickRegister} 
                            sx={{
                                width: '50%', 
                                border: '10px solid B78300', 
                                padding: `${!mobileMatches? '2px 8px': '10px 16px'}`,
                                mr: '10px',
                                fontSize: '12px',
                            }}
                        >
                            register
                        </MuiButton>
                        <ConnectWallet   mobileMenuOpen={props.setOpen}/>
                    </Stack>
                    <Wrapp sx={{mb:1.5}}>
                        {/* <SearchInput small/> */}
                        <SearchAutocomplet closeModal={() => props.setOpen(false)}/>
                    </Wrapp>
                    <LinkWrapper onClick={() => {
                        props.setOpen && props.setOpen(false)
                    }} to="/allTokens">
                        <Menubutton>all tokens</Menubutton>
                    </LinkWrapper>
                    {/* <LinkWrapper onClick={() => {
                        props.setOpen && props.setOpen(false)
                    }} to="/nft-gallery">
                        <Menubutton>NFT GALLERY</Menubutton>
                    </LinkWrapper> */}
                    <a onClick={() => {
                        props.setOpen && props.setOpen(false)
                    }} href="https://t.me/huntersground" target="_blank" style={{ width: '100%' }}>
                        <Menubutton>telegram shill bot</Menubutton>
                    </a>
                    <Menubutton onClick={onClickContact}>contact</Menubutton>
                    <Flex>
                        <a onClick={() => {
                            props.setOpen && props.setOpen(false)
                        }} href="https://t.me/hunterdogeofficial" target="_blank" style={{ width: '100%' }}>
                            <SmallWrappedButton > Apply for Listing
                            </SmallWrappedButton>
                        </a>
                        <ImageWrapper src={hunterdogeShadow} />
                    </Flex>
                </Wrapper>
            }

        </>

    );
};

export default NewMenu;


