import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import {
    ContentWrapper,
    DescText,
    DescTextWrapper,
    HeadSubTitle,
    HeadTitle,
    RightContent,
    Upcoming,
    Wrapper
} from "./TokenInfoStyled";
import {Button} from "../../common";
import {Title, Value} from "../upcomingPreSale/PreSaleStyled";
import {useMediaQuery} from '@material-ui/core';
import ReportTokenModal from '../../modal/ReportToken';
import { NumberFormatter } from '../../../utils/changeFormatter';

const useStyles = makeStyles({
	root: {
		width: '100vw',
		height: '100vh',
		margin: '0 auto'
	},
    headTitle: {
        fontSize: ({ isMobile }) => isMobile ? '1em' : '1.35em',
        textAlign: 'center',
        margin: '20px 0px'
    },
    label: {
        fontSize: ({ isMobile }) => isMobile ? '0.85em' : '1.15em',
    },
    value: {
        fontSize: ({ isMobile }) => isMobile ? '0.9em' : '1.15em',
        margin: ({ isMobile }) => isMobile ? '10px 0px' : '0 0 19px 0',
    }
});

const TokenInformation = ({ tokenData = {} }) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
    const classes = useStyles({ isMobile: mobileMatches });
    const [isModal, setIsModal] = useState(false)
   const MoneyFormat =  (a) =>
   {    const b=Number(a.replace(',', ''))
         // Nine Zeroes for Billions
         return Math.abs(b) >= 1.0e+9

              ? Math.abs(b) / 1.0e+9 + "B"
              // Six Zeroes for Millions 
              : Math.abs(b) >= 1.0e+6

              ? Math.abs(b) / 1.0e+6 + "M"
              // Three Zeroes for Thousands
              : Math.abs(b) >= 1.0e+3

              ? Math.abs(b) / 1.0e+3 + "K"

              : Math.abs(b);
  }

    return (
        <Wrapper isMobile={mobileMatches}  position={!mobileMatches?'relative':undefined}>
            <ContentWrapper margin={mobileMatches ? '0px' : '0px 38px 0px 0px'}>
                <HeadTitle className={classes.headTitle} >PROJECT DESCRIPTION</HeadTitle>
                <DescTextWrapper margin={mobileMatches ? '10px 0px' : '14px 0 69px 0'}>
                    {!tokenData?.Project_Description && <HeadSubTitle>(coming soon)</HeadSubTitle>}
                    <DescText height={'auto'} size={mobileMatches ? '0.9em' : '1.15em'}>
                        {tokenData?.Project_Description}
                    </DescText>
                </DescTextWrapper>
                <Button onClick={() => setIsModal(true)} size={'14px'} margin={'20px 0px'} width={'277px'} height={ mobileMatches ? '25px' : undefined} position={!mobileMatches?'absolute':undefined}  bottom={!mobileMatches?'20px' : undefined} left={!mobileMatches ? '180px': '20px'}>report this token to staff</Button>
            </ContentWrapper>
            <RightContent width={mobileMatches ? '100%' : undefined} >
                <HeadTitle className={classes.headTitle} margin={'0px 0px 15px'}>TOKENOMICS</HeadTitle>
                <Title className={classes.label}>MAX SUPPLY</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_Max?MoneyFormat(tokenData?.Project_Token_Max):''}</Value>
                <Title className={classes.label}>BURN SUPPLY</Title>
                <Value className={classes.value}>{NumberFormatter(Number(tokenData?.Project_Token_Burn))}%</Value>
                <Title className={classes.label}>TEAM TOKENS IN % OF MAX SUPPLY</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_Team}</Value>
                <Title className={classes.label}>LIQUIDITY LOCK DATE</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_LiquidityLockDate}</Value>
                <Title className={classes.label}>DATE OF LAUNCH</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_LaunchDate}</Value>
                <HeadTitle className={classes.headTitle} margin={'0px 0px 15px'}>TRANSACTION FEES</HeadTitle>
                <Title className={classes.label}>BUY / SELL TAXES</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_BuyTax}% / {tokenData?.Project_Token_SellTax}%</Value>
                <Title className={classes.label}>HOLDER REWARDS</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_RewardFee}% <Upcoming>(Rewards in {tokenData?.Project_Token_RewardsCurr})</Upcoming></Value>
                <Title className={classes.label}>LIQUIDITY FEES / MARKETING FEES</Title>
                <Value className={classes.value}>{tokenData?.Project_Token_LiqFee}% / {tokenData?.Project_Token_MarketingFee}%</Value>
                {/*<button className={classes.stockBtn} onClick={pancakeSwap}>PANCAKESWAP*/}
                {/*    <Image src={Pancake} margin={'0 0 0 18px'}/>*/}
                {/*</button>*/}
            </RightContent>
            {isModal && <ReportTokenModal setIsOpen={setIsModal} />}
        </Wrapper>
    );
};

export default TokenInformation;
