import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
//styles
import { Flex, Image } from "../../components/common";
import { FooterMain, Text, Button, Title, ImageWrapper, SocialWrapper, LinkStyled, LinkFooter,MarketingTitle} from "./FooterStyled";
//icons
import Telegram from "../../images/socialBg/telegram.svg";
import Twitter from "../../images/socialBg/twitter.svg";
import Instagram from "../../images/socialBg/instagram.svg";
import Reddit from "../../images/socialBg/reddit.svg";
import Medium from "../../images/socialBg/medium.svg";
import Logo from '../../images/big_logo.png';
import hunterdogeBook from '../../images/hunterdoge_book.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ModalContext } from '../../contexts/ModalProvider';
import { useWallet } from '@binance-chain/bsc-use-wallet';

const Footer = ({ register }) => {
    const submit = () => console.log('submit');
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const { account, chainId } = useWallet()
    const context = useContext(ModalContext)
    useEffect(() => {
        if(account) {
            context.setIsMember(account, register)
        }
    }, [account, register])
    return (
        <FooterMain>
            <Flex direction={'column'} style={{ width: `${mobileMatches ? 'auto' : '100%'}` }}>
                <Flex mwidth={mobileMatches ? '460px' : '100%'}>
                    <LinkStyled href='/'>
                        <Image src={Logo} width={mobileMatches ? '94px' : '48px'} height={mobileMatches ? '94px' : '48px'} margin={'0 35px 0 0'} />
                    </LinkStyled>
                    <LinkStyled href='/'>
                        <Title size={mobileMatches ? '61px' : '32px'}>HunterDoge</Title>
                    </LinkStyled>
                </Flex>
                {!mobileMatches &&
                    <>
                        <Button onClick={submit}>Submit your Coin</Button>
                        <Flex direction={'row'} items={'center'} justify={'flex-start'} style={{width:'100%'}}>
                            <Text to='' size='10px' margin='10px 2px' mtop={'22px'} weight='800'>Quick links:</Text>
                            <LinkFooter href='/allTokens' size='10px' margin='10px 4px'>All Tokens</LinkFooter>
                            <LinkFooter
                                href='https://idopresales.com/presale-reviews/hunter-doge-project-review-hd-presale-ido-on-dxsale/'
                                target="_blank"
                                size='10px'
                                margin='10px 2px'
                            >
                                KYC verification
                            </LinkFooter>
                            <LinkFooter
                                href='https://content.hunterdoge.com'
                                target="_blank"
                                size='10px'
                                margin='10px 2px'
                            >
                                Download $HD contents
                            </LinkFooter>
                        </Flex>
                        <Flex direction={'row'} items={'center'} justify={'flex-start'} style={{width:'100%'}}>
                            <Text to='' size={'10px'} margin='4px' weight='800'>Documents:</Text>
                            {/* <LinkFooter href='/'>Whitepaper</LinkFooter> */}
                            <LinkFooter
                                href='https://ipfs.io/ipfs/QmdWZEMvNximaswhn3p6qTsioBASgGLx2QRMkDcXNrVxoG?filename=Techpaper_HunterDoge_v1.0.0.pdf'
                                target="_blank"
                                size='10px'
                                margin='4px'
                            >
                                Tech paper
                            </LinkFooter>
                        </Flex>
                        <Flex direction={'row'} items={'center'} justify={'flex-start'} style={{width:'100%'}}>
                            <Text to='' size={'10px'} margin='4px' weight='800'>For banner ads or AMAs:</Text>
                            <LinkFooter href="https://t.me/hunter_hans" target="_blank" size={'10px'} margin='4px'>Contact us on Telegram</LinkFooter>
                        </Flex>
                    </>
                }

                <SocialWrapper>
                    <LinkStyled href='https://t.me/hunterdogeofficial' target="_blank">
                        <Image src={Telegram} width={'48px'} margin={'auto 2px'} />
                    </LinkStyled>
                    <LinkStyled href='https://twitter.com/hunterdoge_' target="_blank">
                        <Image src={Twitter} width={'48px'} margin={'auto 2px'} />
                    </LinkStyled>
                    <LinkStyled href='https://www.instagram.com/hunterdogeofficial/' target="_blank">
                        <Image src={Instagram} width={'48px'} margin={'auto 2px'} />
                    </LinkStyled>
                    <LinkStyled href='https://www.reddit.com/user/hunterdoge_?utm_source=share&utm_medium=ios_app&utm_name=iossmf' target="_blank">
                        <Image src={Reddit} width={'48px'} margin={'auto 2px'} />
                    </LinkStyled>
                    <LinkStyled href='https://medium.com/@hunterdoge' target="_blank">
                        <Image src={Medium} width={'48px'} margin={'auto 2px'} />
                    </LinkStyled>
                    <LinkStyled href='https://medium.com/@hunterdoge' target="_blank">
                        {!mobileMatches && <LinkFooter href="mailto:info@hunterdoge.com" target="_blank" size={'10px'} margin-top='16px'>info@hunterdoge.com</LinkFooter>}
                    </LinkStyled>
                </SocialWrapper>
            </Flex>
            {mobileMatches &&
                <>
                    <Flex direction={'column'} items={'start'}>
                        <Title size={'30px'} mtop={'22px'}>Quick links</Title>
                        <LinkFooter href='/allTokens'>All Tokens</LinkFooter>
                        <LinkFooter href='https://idopresales.com/presale-reviews/hunter-doge-project-review-hd-presale-ido-on-dxsale/' target="_blank">KYC verification</LinkFooter>
                        <LinkFooter href='https://content.hunterdoge.com' target="_blank">Download $HD contents</LinkFooter>
                    </Flex>
                    <Flex direction={'column'} items={'start'}>
                        <Title size={'30px'} mtop={'22px'}>Documents</Title>
                        {/* <LinkFooter href='/'>Whitepaper</LinkFooter> */}
                        <LinkFooter href='https://ipfs.io/ipfs/QmdWZEMvNximaswhn3p6qTsioBASgGLx2QRMkDcXNrVxoG?filename=Techpaper_HunterDoge_v1.0.0.pdf' target="_blank">Tech paper</LinkFooter>
                    </Flex>
                    <Flex direction={'column'} items={'start'}>
                        <Title size={'30px'} mtop={'22px'}>Marketing</Title>
                        {/* <LinkFooter href='/'>Whitepaper</LinkFooter> */}
                        <LinkFooter href='https://t.me/hunter_hans' target="_blank">Telegram contact</LinkFooter>
                        <MarketingTitle>For banner ads or AMAs please contact us on Telegram.</MarketingTitle>
                    </Flex>
                    <Flex>
                        <Flex direction={'column'} items={'start'}>
                            <Title size={'30px'} mtop={'-16px'}>Contact</Title>
                            <LinkFooter href="mailto:info@hunterdoge.com" target="_blank" size={'19px'}>info@hunterdoge.com</LinkFooter>
                            <Button onClick={submit}>Submit your Coin</Button>
                        </Flex>
                        <ImageWrapper>
                            <Image src={hunterdogeBook} />
                        </ImageWrapper>
                    </Flex>
                </>
            }
        </FooterMain>
    );
};

export default Footer;
