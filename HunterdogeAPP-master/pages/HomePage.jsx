import styled from "styled-components";
import PromotedPreSales from '../components/promotedPresales';
import {Stack} from '@mui/material';
import {Box} from '@mui/system';
import PopularTokens from '../components/popularTokens';
import PopularPreSales from '../components/popularPreSales';
import CheckLiguidity from '../components/checkLiquidity';
import QuickFilter from '../components/quickFilter';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { SHEET_ID_BANNER } from "../constants";
import { useGoogleSheet } from '../hooks/useGoogleSheet';

const HomePage = () => {
	const mobileMatches = useMediaQuery('(max-width:600px)');
	const { data } = useGoogleSheet(SHEET_ID_BANNER)

	return (
		<Box
			sx={{
				mx: mobileMatches ? '0px' : '65px',
				mt: mobileMatches ? '60px' : '0',
				display: 'flex',
				flexWrap: 'wrap',
				width: mobileMatches ? '100%' : 'calc(100vw - 500px)',
				justifyContent: 'center'
			}}>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={6}
			>
				<CheckLiguidity />
				{
					mobileMatches &&
					<Link_ target="_blank" href={data[0]?.Link_Website_Mobile}>
						<Banner url={data[0]?.Link_Banner_Mobile} />
					</Link_>
				}
				<QuickFilter />
				{
					mobileMatches &&
					<Link_ target="_blank" href={data[1]?.Link_Website_Mobile}>
						<Banner url={data[1]?.Link_Banner_Mobile} />
					</Link_>
				}
			</Stack>
			<PopularTokens />
			{
				mobileMatches &&
				<Link_ margin={'20px 0px 0px 0px'} target="_blank" href={data[2]?.Link_Website_Mobile}>
					<Banner url={data[2]?.Link_Banner_Mobile} />
				</Link_>
			}
			<PopularPreSales />
			{
				mobileMatches &&
				<Link_ margin={'20px 0px 0px 0px'} target="_blank" href={data[3]?.Link_Website_Mobile}>
					<Banner url={data[3]?.Link_Banner_Mobile} />
				</Link_>
			}
		</Box>
	)
}

export default HomePage;


const Banner = styled.div`
  width: 100%;
  max-width: 900px;
  height: 100px;
  background-image: url(${({ url }) => url});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
const Link_ = styled.a`
  margin: ${({margin}) => margin || 'inherit'};
  display: block;
  width: 100%;
  max-width: 900px;;
`