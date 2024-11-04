import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from "styled-components";

import NoPresaleView from "../components/chartsViews/noPresale/NoPresale";
import LiveChart from "../components/chartsViews/liveChart/LiveChart";
import TokenInformation from "../components/chartsViews/tokenInformation/TokenInformation";
import PreSale from "../components/chartsViews/upcomingPreSale/Presale";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import TokenHeader from "../components/tokenInformationHeader/TokenHeader";
import TokenHeaderMobile from "../components/tokenInformationHeader/TokenHeaderMobile";
import { Button } from "../components/common/index";
import PopularPreSales from "../components/popularPreSales";
import TabsStyled from '../components/Tabs/Tabs';
import LeaveComment from '../components/LeaveComment';
import Comments from '../components/comments/index';
import LeaveCommentModal from '../components/modal/LeaveCommentModal';
import { GoogleSheetContext } from '../contexts/GoogleSheetProvider';
import { useMediaQuery } from '@mui/material';

import { SHEET_ID_BANNER } from "../constants";
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { getCommentStore, getCommentCount } from '../connection/functions';


const TokenPage = () => {
	let history = useHistory();
	const { data } = useContext(GoogleSheetContext)
	const banners = useGoogleSheet(SHEET_ID_BANNER)

	const { address } = useParams()
	const mobileMatches = useMediaQuery('(max-width:600px)');

	// const { account } = useWeb3React()
	const { account, chainId } = useWallet();
	const [partActive, setPartActive] = useState(1)
	const [tokenData, setTokenData] = useState({})
	const [tabs, setTabs] = useState([
		{ label: "chart & stats" },
		{ label: "token information" }
	])
	const [commentStore, setCommentStore] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

	const isPresale = account ? <PreSale tokenData={tokenData} /> : <NoPresaleView />
	const [openLeaveCommnet, setOpenLeaveCommnet] = useState(false)

	useEffect(() => {
		data.map((row) => {
			if (row?.Project_Address?.toLowerCase() === address.toLowerCase()) {
				setTokenData(row)

				if (row?.has_Presale === 'TRUE' && tabs.length < 3) {
					setTabs(state => [...state, { label: `upcoming pre-sale` }])
				}
			}
			return row
		})
		getCommentStore(address).then(res => {
			const sorted_object = Object.entries(res)
				.sort((a, b) => {
					let aa = parseInt(a[1].callsReturnContext[0].returnValues[9].hex) - parseInt(a[1].callsReturnContext[0].returnValues[10].hex)
					let bb = parseInt(b[1].callsReturnContext[0].returnValues[9].hex) - parseInt(b[1].callsReturnContext[0].returnValues[10].hex)
					return -(aa - bb)
				})
				.reduce((a, [key, val]) => {
					a[key] = val;
					return a;
				}, {});
			setCommentStore(sorted_object)
		})
		getCommentCount(address).then(res => setCommentCount(res))
	}, [data, address])

	useEffect(() => {
		getCommentStore(address).then(res => {
			const sorted_object = Object.entries(res)
				.sort((a, b) => {
					let aa = parseInt(a[1].callsReturnContext[0].returnValues[9].hex) - parseInt(a[1].callsReturnContext[0].returnValues[10].hex)
					let bb = parseInt(b[1].callsReturnContext[0].returnValues[9].hex) - parseInt(b[1].callsReturnContext[0].returnValues[10].hex)
					return -(aa - bb)
				})
				.reduce((a, [key, val]) => {
					a[key] = val;
					return a;
				}, {});
			setCommentStore(sorted_object)
		})
		getCommentCount(address).then(res => setCommentCount(res))
	}, [])

	return (
		<Block>
			<Container isMobile={mobileMatches}>
				<Button
					onClick={() => history.goBack()}
					size={'20px'}
					height={'30px'}
					width={mobileMatches ? '100px' : '162px'}
					weight={700}
					margin={mobileMatches ? '30px 0 0 0' : '0 0 27px 0'}
					bg={mobileMatches ? 'transparent' : undefined}
					boxShadow={mobileMatches ? 'unset' : undefined}
					color={mobileMatches ? '#B78300' : undefined}
				>{`<< ${mobileMatches ? '' : 'GO'} BACK`}</Button>
				{mobileMatches ? <TokenHeaderMobile tokenData={tokenData} /> : <TokenHeader tokenData={tokenData} />}
				{
					mobileMatches &&
					<Link_ target="_blank" href={banners.data[0]?.Link_Website}>
						<Banner url={banners.data[0]?.Link_Banner} />
					</Link_>
				}
				<TabsStyled setPartActive={setPartActive} partActive={partActive} data={tabs} />
				{partActive === 1 ? <LiveChart tokenData={tokenData} /> : (partActive === 2 ?
					<TokenInformation tokenData={tokenData} /> : isPresale)}
					{commentStore[`commentContract0`] && <Comments commentStore={commentStore} commentCount={commentCount} />}
				{
					mobileMatches
						?
						<Button onClick={() => {
							setOpenLeaveCommnet(true)
						}} size={'14px'} margin={'20px 10%'} height={'25px'} width={'80%'}>Leave a Comment</Button>
						:
						<LeaveComment />
				}
				{openLeaveCommnet && <LeaveCommentModal setIsOpen={setOpenLeaveCommnet} />}
				{/* <Comments/> */}
				<PopularPreSales />
			</Container>
		</Block>
	);
};

export default TokenPage;

const Container = styled.div`
  margin: ${({ isMobile }) => isMobile ? '0 15px' : '0px 50px'};
  max-width: 1420px;
`

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Edit = styled(Link)`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: #B78300;
  transition: 0.4s;

  margin-right: 30px;

  &:hover {
    color: #d5b562;
  }
`

const Divider = styled.div`
  width: 2px;
  height: 22px;
  background: #B78300;
  font-weight: normal;
`

const Part = styled.div`
  margin: 10px auto;
  max-width: 730px;
  filter: drop-shadow(2.20706px 2.20706px 0px rgba(0, 0, 0, 0.1));
  height: 34.48px;
  background: #FFFBE2;
  border-radius: 11.0353px;
  display: flex;
  align-items: center;

  span {
    margin: auto 30px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 18.566px;
    line-height: 98.1%;
    text-transform: uppercase;
    color: #B78300;
    cursor: pointer;

    transition: 0.4s;

    &:hover {
      color: #d5b562;
    }
    &.active {
      font-weight: bold;
    }
  }
`

const Banner = styled.div`
  width: 100%;
  max-width: 900px;
  height: 100px;
  background-image: url(${({ url }) => url});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
const Link_ = styled.a`
  display: block;
  width: 100%;
  max-width: 900px;;
`