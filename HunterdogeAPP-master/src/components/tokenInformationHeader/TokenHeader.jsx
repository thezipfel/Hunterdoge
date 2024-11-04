import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useWallet } from "@binance-chain/bsc-use-wallet";
import NoLogoImage from '../../images/nologo.jpg'
import M from '../../images/m_white.png'
import Lizard from '../../images/lizard_ico.svg'
import Pancakeswap from '../../images/pancakeswap.png'
import TokenPrice from '../../images/tokenPrice.svg'
import MarketCap from '../../images/marketCap.svg'
import Popularity from '../../images/popularity.svg'
import Like from '../../images/like_ico.svg'
import bnbLogo from '../../images/bnb-logo.svg'
import {
    BadgesWrapper,
    Card,
    CardInfo,
    HeadTitle,
    IcoWrapper,
    InfoWrapper,
    Inner,
    LinkStyled,
    Popup,
    SocialWrapper,
    Text,
    TextPopup,
    Wrapper,
    WrapperBadges
} from './TokeHeaderStyled'
import { Button, Flex, Image, Link_, LinkWrapper } from '../common'
import { Votes } from "../common/votes";
import { isProjectManager } from '../../connection/functions'
import Telegram from "../../images/table/telegram.svg";
import Twitter from "../../images/table/twitter.svg";
import Instagram from "../../images/insta.svg";
import Reddit from "../../images/reddit.svg";
import Medium from "../../images/medium.svg";
import Discord from "../../images/discord.svg";

import { ReactComponent as Kyc1 } from "../../images/KYC_ns.svg";
import { ReactComponent as Audit1 } from "../../images/Audit_ns.svg";
import { ReactComponent as Utility1 } from "../../images/Utility_ns.svg";
import { ReactComponent as Memecoin1 } from "../../images/Memecoin_ns.svg";

import TokenEditModal from "../modal/TokenEditModal/TokenEditModal";
import { NumberFormatter } from '../../utils/changeFormatter';

const TokenHeader = ({ tokenData = {} }) => {
    const { address } = useParams()
    // const { account } = useWeb3React()
    const { account, chainId } = useWallet();
    const [isTokenEditModal, setIsTokenEditModal] = useState(false)
    const [checkProjectManager, setCheckProjectManager] = useState(false)
    const [mcap, setMCap] = useState(0)
    const [votes, setVotes] = useState(0)
    const [openBadges, setOpenBadges] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)

    const visitWebsite = () => {
        if (tokenData.Project_Website) {
            window.open(tokenData.Project_Website, '_blank');
        }
    }

    useEffect(async () => {
        setMCap(tokenData.Project_MarketCap)
        setVotes(tokenData.Project_Upvotes * 2 + tokenData.Project_MedVotes - tokenData.Project_Downvotes)
    }, [tokenData])

    useEffect(() => {
        const getIsProjectManager = async () => {
            const is_project_manager = await isProjectManager(address, account)
            setCheckProjectManager(is_project_manager)
        }
        if (account) getIsProjectManager()
        else setCheckProjectManager(false)
    }, [account])


    const handleBadges = () => {
        setOpenBadges(true)
        setTimeout(function () {
            setOpenBadges(false)
        }, 5000);
    }

    const handleInfo = () => {
        setOpenInfo(true)
        setTimeout(function () {
            setOpenInfo(false)
        }, 5000);
    }

    const bscScan = () => {
        window.open(`https://bscscan.com/address/${address}`, '_blank')
    };

    const goToExternal = (url) => {
        window.open(url, '_blank');
    }

    return (
        <Wrapper>
            <BadgesWrapper>
                <Image src={tokenData.Project_Logo ? tokenData.Project_Logo : NoLogoImage} height={'162px'} margin={'14px 0 21px 0'} />
                <HeadTitle size={'42px'}>{tokenData.Project_Symbol}</HeadTitle>
                <LinkWrapper to='#' disabled={!tokenData.Project_Website}>
                    <Button weight={'700'} height='29px' disabled={!tokenData.Project_Website} onClick={visitWebsite}>
                        visit website
                    </Button>
                </LinkWrapper>
                <Flex margin={'20px 0 19px 0'}>
                    {tokenData.Project_CMCLink && <Image onClick={() => { goToExternal(tokenData.Project_CMCLink) }} src={M} />}
                    {tokenData.Project_CGLink && <Image onClick={() => { goToExternal(tokenData.Project_CGLink) }} src={Lizard} />}
                    {tokenData.Project_PancakeLink && <Image onClick={() => { goToExternal(tokenData.Project_PancakeLink) }} src={Pancakeswap} />}
                </Flex>
                <HeadTitle size={'22px'}>earned badges</HeadTitle>
                <WrapperBadges>
                    {tokenData.Project_ISKYC === 'TRUE' &&
                        //    <Image src={Kyc}/>
                        <Kyc1 />
                    }
                    {tokenData.Project_ISDOX === 'TRUE' &&
                        <Audit1 />
                        // <Image src={Audit}/>
                    }
                    {tokenData.Project_HasUtility === 'TRUE' &&
                        // <Image src={Utility}/>
                        <Utility1 />
                    }
                    {tokenData.Project_IsMemeCoin === 'TRUE' &&
                        // <Image src={Memecoin}/>
                        <Memecoin1 />
                    }
                </WrapperBadges>
                {/* <Flex margin={'15px 0 20px 0'}>
                    <Image src={Reward}/>
                    <Image src={Dialogue}/>
                    <Image src={Guard}/>
                </Flex> */}
                <Text onClick={handleBadges} size={'13px'} weight={'700'} cursor={'pointer'}>
                    what are badges?
                    {openBadges && <Popup>
                        <TextPopup mb={'7px'}>What are Badges?</TextPopup>
                        <TextPopup color="rgba(171, 136, 46, 0.7)" fw={700}>Badges are added by our staff and stand for:
                            1) KYC 2) Audited 3) Usecase 4) Meme Token</TextPopup>
                    </Popup>}
                </Text>
            </BadgesWrapper>
            <InfoWrapper>
                {!checkProjectManager &&
                    <Text cursor={'pointer'} size={'16px'} weight={'700'} margin={'0 0 21px auto'} color={'#B78300'}
                        onClick={handleInfo}>
                        + edit your token information
                        {openInfo && <Popup height={'66px'} width={'353px'}   left={'10px'} >
                            <TextPopup color="rgba(171, 136, 46, 0.7)" fw={700} lh={'15px'}>Connect the manager wallet
                                first in order to edit token information.</TextPopup>
                        </Popup>}
                    </Text>
                }
                {checkProjectManager &&
                    <Link_ to='#' size={'16px'} weight={'700'} margin={'0 0 21px auto'} onClick={() => {
                        setIsTokenEditModal(true);
                    }}>
                        + edit your token information
                    </Link_>
                }
                <Flex justify={'center'}>
                    <HeadTitle margin={'0 auto 0 10px'} size={'50px'}>{tokenData?.Project_Name}</HeadTitle>
                    <Flex>
                        <Image height={'29px'} src={Like} />
                        <Text margin={'0 0 0 7px'} size={'24px'}>{votes}</Text>
                        <Votes big={true} address={address} />
                    </Flex>
                </Flex>
                <Inner>
                    <Flex margin={'8px 0 40px 0'} items='flex-end'>
                        <Flex items='flex-start' direction='column'>
                            <Text weight={'800'}>network</Text>
                            <Text margin={'19px 0 0 0'} weight={'800'}>contract address</Text>
                        </Flex>
                        <Flex items='flex-start' direction='column'>
                            <Flex>
                                <Text>BSC</Text>
                                <Image src={bnbLogo} margin={'0 0 0 7px'} />
                                <Button disabled={!address} onClick={bscScan} bg={'rgba(255, 218, 1, 0.33)'}
                                    color={'#B78300'} weight={700} margin={'0 79px 0 29px'} width={'116px'}
                                    border={'1.3px solid rgba(183, 131, 0, 0.5)'}>BSC-SCAN</Button>
                                <SocialWrapper>
                                    <LinkStyled
                                        href={tokenData.Project_Telegram}
                                        disabled={!tokenData.Project_Telegram}
                                        target="_blank"><Image src={Telegram} width={'19px'} /></LinkStyled>
                                    <LinkStyled
                                        href={tokenData.Project_Twitter}
                                        disabled={!tokenData.Project_Twitter}
                                        target="_blank"><Image src={Twitter} width={'18px'} /></LinkStyled>
                                    <LinkStyled
                                        href={tokenData.Project_Instagram}
                                        disabled={!tokenData.Project_Instagram}
                                        target="_blank"><Image src={Instagram} width={'18px'} /></LinkStyled>
                                    <LinkStyled
                                        href={tokenData.Project_Reddit}
                                        disabled={!tokenData.Project_Reddit}
                                        target="_blank"><Image src={Reddit} width={'19px'} /></LinkStyled>
                                    <LinkStyled
                                        href={tokenData.Project_Medium}
                                        disabled={!tokenData.Project_Medium}
                                        target="_blank"><Image src={Medium} width={'19px'} /></LinkStyled>
                                    <LinkStyled
                                        href={tokenData.Project_Discord}
                                        disabled={!tokenData.Project_Discord}
                                        target="_blank"><Image src={Discord} width={'22px'} /></LinkStyled>
                                </SocialWrapper>
                            </Flex>

                            <Text margin={'16px 0 0 0'}>{address}</Text>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Card>
                            <IcoWrapper><Image src={TokenPrice} /></IcoWrapper>
                            <span>token price</span>
                            <CardInfo mt={'20px'}>${tokenData.Project_Price}</CardInfo>
                        </Card>
                        <Card>
                            <IcoWrapper mt={'-16px'} height={'88px'}><Image src={MarketCap} /></IcoWrapper>
                            <span>market cap</span>
                            <CardInfo mt={'20px'}>${NumberFormatter(parseInt(mcap))}</CardInfo>
                        </Card>
                        <Card color={'rgba(255, 218, 1, 0.25)'}>
                            <IcoWrapper><Image src={Popularity} /></IcoWrapper>
                            <span>Ø Holder growth <br /> per day</span>
                            <CardInfo>{tokenData?.Project_HolderGrowth}</CardInfo>
                        </Card>
                    </Flex>
                </Inner>
            </InfoWrapper>
            {isTokenEditModal && checkProjectManager &&
                <TokenEditModal setIsOpen={setIsTokenEditModal} tokenAddress={address} tokenData={tokenData} />}
        </Wrapper>
    );
};

export default TokenHeader;
