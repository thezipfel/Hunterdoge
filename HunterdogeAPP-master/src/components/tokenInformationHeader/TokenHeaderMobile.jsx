import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useWallet } from "@binance-chain/bsc-use-wallet";
import NoLogoImage from '../../images/nologo.jpg'
import M from '../../images/m_white.png'
import Lizard from '../../images/lizard_ico.svg'
import Pancakeswap from '../../images/pancakeswap.png'
import {ReactComponent as Kyc1} from '../../images/KYC_ns.svg'
import {ReactComponent as Audit1} from '../../images/Audit_ns.svg'
import {ReactComponent as Utility1} from '../../images/Utility_ns.svg'
import {ReactComponent as Memecoin1} from '../../images/Memecoin_ns.svg'
import Like from '../../images/like_ico.svg'
import {
    BadgesWrapper,
    HeadTitle,
    InfoWrapper,
    LinkStyled,
    Popup,
    SocialWrapper,
    Text,
    TextPopup,
    Wrapper,
    WrapperBadges
} from './TokeHeaderStyled'
import {Button, Flex, Image} from '../common'
import {Votes} from "../common/votes";
import {getMCap, getVotesPerProject, isProjectManager} from '../../connection/functions'
import Telegram from "../../images/table/telegram.svg";
import Twitter from "../../images/table/twitter.svg";
import Instagram from "../../images/insta.svg";
import Reddit from "../../images/reddit.svg";
import Medium from "../../images/medium.svg";
import Discord from "../../images/discord.svg";
import { NumberFormatter } from '../../utils/changeFormatter';

const TokenHeaderMobile = ({ tokenData = {} }) => {
    const { address } = useParams()

    const { account, chainId } = useWallet();
    const [checkProjectManager, setCheckProjectManager] = useState(false)
    const [price, setPrice] = useState(0)
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
        setPrice(tokenData.Project_Price)
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

    const handleTokenEdit = () => {
        window.location.href = `/token/edit/${address}`
    }

    const goToExternal = (url) => {
        window.open(url, '_blank');
    }

    return (
        <Wrapper isMobile={true}>
            <BadgesWrapper isMobile={true}>
                <Image src={tokenData.Project_Logo ? tokenData.Project_Logo : NoLogoImage} width={`${window.innerWidth / 4 - 10}px`} height={`${window.innerWidth / 4 - 10}px`} margin={'5px 0 8px 10px'} />
                <HeadTitle size={'18x'}>{tokenData.Project_Symbol}</HeadTitle>
                <Flex margin={'10px 0'}>
                    {tokenData.Project_CMCLink && <Image onClick={()=>{goToExternal(tokenData.Project_CMCLink)}} width={'32%'} src={M} />}
                    {tokenData.Project_CGLink && <Image onClick={()=>{goToExternal(tokenData.Project_CGLink)}} width={'32%'} src={Lizard} />}
                    {tokenData.Project_PancakeLink && <Image onClick={()=>{goToExternal(tokenData.Project_PancakeLink)}} width={'32%'} src={Pancakeswap} />}
                </Flex>
                <HeadTitle size={'12px'}>
                    earned badges
                    <Button onClick={handleBadges} size={'13px'} weight={'700'} width={'13px'} height={'13px'} cursor={'pointer'} style={{textTransform: 'lowercase', padding: '0px'}}>
                        i
                        {openBadges && <Popup left={'40px'} width={'200px'} height={'auto'}>
                            <TextPopup mb={'7px'}>What are Badges?</TextPopup>
                            <TextPopup color="rgba(171, 136, 46, 0.7)" fw={700}>Badges are added by our staff and stand for: 1) KYC 2) Audited 3) Usecase 4) Meme Token</TextPopup>
                        </Popup>}
                    </Button>
                </HeadTitle>
                <WrapperBadges isMobile={true}>
                    {tokenData.Project_ISKYC === 'TRUE' &&
                        <Kyc1 style={{ margin: '0', width: '50%' }} />
                    }
                    {tokenData.Project_ISDOX === 'TRUE' &&
                        <Audit1 style={{ margin: '0', width: '50%' }} />
                    }
                    {tokenData.Project_HasUtility === 'TRUE' &&
                        <Utility1 style={{ margin: '0', width: '50%' }} />
                    }
                    {tokenData.Project_IsMemeCoin === 'TRUE' &&
                        <Memecoin1 style={{ margin: '0', width: '50%' }} />
                    }
                </WrapperBadges>
            </BadgesWrapper>
            <InfoWrapper isMobile={true}>
                <Flex>
                    {!checkProjectManager &&
                        <Button right={'5px'} position={'absolute'} height={'20px'} margin={'35px 15px 0 0'} width={'60px'} size={'10px'} weight={'700'} onClick={handleInfo}>
                            edit
                            {openInfo && <Popup isTop={true} height={'auto'} width={'180px'} left={'-100px'}>
                                <TextPopup color="rgba(171, 136, 46, 0.7)" fw={700} lh={'15px'}>Connect the manager wallet first in order to edit token information.</TextPopup>
                            </Popup>}
                        </Button>
                    }
                    {checkProjectManager &&
                        <Button right={'5px'} position={'absolute'} height={'20px'} margin={'35px 15px 0 0'} width={'60px'} size={'10px'} weight={'700'} onClick={ handleTokenEdit }>
                            edit
                        </Button>
                    }
                </Flex>
                <Flex margin={'30px 0px 0px 0px'} style={{ borderBottom: 'solid #B78300' }}>
                    <HeadTitle margin={'0 auto 0 10px'} size={'20px'}>{tokenData?.Project_Name}</HeadTitle>
                    <Flex>
                        <Image height={'20px'} src={Like} />
                        <Text margin={'0 0 0 7px'} size={'12px'}>{votes}</Text>
                    </Flex>
                </Flex>

                <Flex>
                    <Text size={'9px'} margin={'3px 0px'} >Network</Text>
                    <Text size={'9px'} margin={'3px 0px'} >BSC
                        <Button
                            disabled={!address}
                            height={'15px'}
                            onClick={bscScan}
                            color={'#B78300'}
                            width={'60px'}
                            boxShadow={'unset'}
                            bg={'transparent'}
                            size={'9px'}
                            style={{}}
                        >BSC-SCAN</Button>
                    </Text>
                </Flex>

                <Flex>
                    <Text size={'9px'} margin={'3px 0px'} >Contract Address</Text>
                    <Text size={'9px'} margin={'3px 0px'} style={{ paddingRight: '6px', height: '15px' }}>{address.slice(0, 5) + '...' + address.slice(-4)}</Text>
                </Flex>

                <Flex>
                    <Text size={'9px'} margin={'3px 0px'} >Token Price</Text>
                    <Text size={'9px'} margin={'3px 0px'} style={{ paddingRight: '6px', height: '15px' }}>${price}</Text>
                </Flex>

                <Flex>
                    <Text size={'9px'} margin={'3px 0px'} >Market Cap</Text>
                    <Text size={'9px'} margin={'3px 0px'} style={{ paddingRight: '6px', height: '15px' }}>${NumberFormatter(parseInt(mcap))}</Text>
                </Flex>

                <Flex>
                    <Text size={'9px'} margin={'3px 0px'} >Ø Holder growth per day</Text>
                    <Text size={'9px'} margin={'3px 0px'} style={{ paddingRight: '6px', height: '15px' }}>{tokenData?.Project_HolderGrowth}</Text>
                </Flex>
                <Flex justify={'center'} margin={'5px 0px 10px 0px'}>
                    <Button height='25px' size={'12px'} width={'calc(100% / 2)'} style={{ whiteSpace: 'nowrap' }} disabled={!tokenData.Project_Website} onClick={visitWebsite}>
                        visit website
                    </Button>
                    <Votes height={'25px'} size={'12px'} address={address} />
                </Flex>
                <Flex justify={'center'}>
                    <SocialWrapper width={'calc(100% - 10px)'}>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Telegram}
                            disabled={!tokenData.Project_Telegram}
                            target="_blank"><Image src={Telegram} width={'15px'} /></LinkStyled>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Twitter}
                            disabled={!tokenData.Project_Twitter}
                            target="_blank"><Image src={Twitter} width={'15px'} /></LinkStyled>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Instagram}
                            disabled={!tokenData.Project_Instagram}
                            target="_blank"><Image src={Instagram} width={'15px'} /></LinkStyled>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Reddit}
                            disabled={!tokenData.Project_Reddit}
                            target="_blank"><Image src={Reddit} width={'15px'} /></LinkStyled>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Medium}
                            disabled={!tokenData.Project_Medium}
                            target="_blank"><Image src={Medium} width={'15px'} /></LinkStyled>
                        <LinkStyled
                            width={'25px'}
                            height={'25px'}
                            href={tokenData.Project_Discord}
                            disabled={!tokenData.Project_Discord}
                            target="_blank"><Image src={Discord} width={'15px'} /></LinkStyled>
                    </SocialWrapper>
                </Flex>
            </InfoWrapper>
        </Wrapper>
    );
};

export default TokenHeaderMobile;
