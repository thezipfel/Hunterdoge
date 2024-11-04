import { useMediaQuery } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import styled from 'styled-components';

import { SHEET_ID_BANNER } from "../../constants";
import { useGoogleSheet } from '../../hooks/useGoogleSheet';

const BlockHunt = () => {
    const { data } = useGoogleSheet(SHEET_ID_BANNER)
    const mobileMatches = useMediaQuery('(max-width:600px)');
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                pt: 2,
                width: '100vw',
                maxWidth: '1720px',
                borderRight: '2px solid #FFFBE2',
                flexShrink: 0,
                justifyContent: 'space-around',
            }}>
            {data.length > 0 ? (
                data.map((banner, index) => {
                    if (index < 3) {
                        return (
                            <Link key={index} target="_blank" href={mobileMatches ? banner.Link_Website_Mobile : banner.Link_Website_Dekstop}>
                                <Banner url={mobileMatches ? banner.Link_Banner_Mobile : banner.Link_Banner_Desktop} />
                            </Link>

                        )
                        
                    }
                })) : null}
        </Stack>
    )
}

export default BlockHunt;

const Banner = styled.div`
  width: 470px;
  height: 80px;
  background-image: url(${({ url }) => url});
  border-right: 2px solid #FFFBE2;
`
const Link = styled.a`
  display: block;
`