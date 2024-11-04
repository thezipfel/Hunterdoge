import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material';
import AllTokensTable from '../components/AlltokensTable';
import PopularPreSales from '../components/popularPreSales';
import SearchOrFilter from '../components/searchOrFilter';
import { isMember } from '../connection/functions';
import { useWallet } from "@binance-chain/bsc-use-wallet";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import QuickFilter from '../components/quickFilter';
import CheckLiguidity from '../components/checkLiquidity';
const AllTokens = ({ register }) => {
    const mobileMatches = useMediaQuery('(min-width:600px)');

    return (
        <Box
            sx={{
                mx: !mobileMatches ? '0px' : '65px',
                mt: !mobileMatches ? '60px' : '0',
                display: 'flex',
                flexWrap: 'wrap',
                width: !mobileMatches ? '100%' : 'calc(100vw - 500px)',
                justifyContent: 'center'
            }}>
            <Stack sx={{ mx: mobileMatches ? '60px' : 'auto' }}>
                {mobileMatches && <SearchOrFilter />}
            </Stack>
            {!mobileMatches && <Stack direction={{ xs: 'column' }}
                spacing={6}>
                <CheckLiguidity />
                <QuickFilter />
            </Stack>
            }
            <AllTokensTable />
            <PopularPreSales />
           

        </Box>
    )
}

export default AllTokens;