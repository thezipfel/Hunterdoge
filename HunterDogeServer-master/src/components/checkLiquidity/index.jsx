import { Typography } from '@material-ui/core';
import { Button, CircularProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';
import SearchInput from '../searchInput'
import { useContext, useEffect, useState } from 'react';
import { getBalanceToken, getBalanceWBNB, getPair, getPairData, isHoneypot, toChecksumAddress } from '../../connection/functions'
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import { useBNBPrice } from '../../hooks/useBNBPrice';
import { ModalContext } from '../../contexts/ModalProvider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getPrice } from '../../utils/getPrice';

const CheckLiguidity = () => {
    const context = useContext(ModalContext)
    const { data } = useContext(GoogleSheetContext)
    const bnbPrice = useBNBPrice()
    const [getMoreInfo, setGetMoreInfo] = useState(false)
    const [spin, setSpin] = useState(false)
    const [pairAddress, setPairAddress] = useState('')
    const mobileMatches = useMediaQuery('(min-width:600px)');

    const [project, setProject] = useState({
        wbnb: 0,
        token: 0,
        price: 0,
        symbol: '',
        honey: '',
        buy_tax: 0,
        sell_tax: 0,
    })

    const checkSumAddress = (addr) => {
        const callAsync = async () => {
            setSpin(true)
            console.log(addr)
            try {
                if (!addr) {
                    setProject({
                        wbnb: 0,
                        token: 0,
                        price: 0,
                        symbol: '',
                        honey: '',
                        buy_tax: 0,
                        sell_tax: 0,
                    })
                    setSpin(false)
                    return false
                }
                const address = toChecksumAddress(addr)

                const pair = await getPair(address);
                console.log(pair)
                if (!pair) {
                    setSpin(false)
                    return false
                }
                setPairAddress(pair)

                project.wbnb = await getBalanceWBNB(pair);
                if (!project.wbnb) {
                    setSpin(false)
                    return false
                }
                project.token = await getBalanceToken(pair, address);
                if (!project.token) {
                    setSpin(false)
                    return false
                }

                // const result = await getPairData(pair, address)
                // project.wbnb = result[0]
                // project.token = result[1]

                try {
                    const res = await getPrice(address)

                    project.price = res.price
                    project.name = res.name
                    project.symbol = res.symbol
                    project.totalLP = project.wbnb * bnbPrice.price

                    const honey = await isHoneypot(address)
                    project.honey = honey.is
                    project.buy_tax = honey.buy_tax
                    project.sell_tax = honey.sell_tax
                    
                    setProject(project)
                    setSpin(false)
                } catch (error) {
                    console.log('Looks like there was a problem: ', error);
                    setSpin(false)
                }

            } catch (e) {
                project.honey = true
                setProject(project)
                setSpin(false)
                //@Todo Add Error for Honeypot

                console.log(e)
            }
        }
        callAsync()
    }

    const goToDexTool = () => {
        if (!pairAddress) return false
        window.open(`https://www.dextools.io/app/bsc/pair-explorer/${pairAddress}`, '_blank')
    }

    useEffect(() => {
        if (bnbPrice.price) {
            project.totalLP = project.wbnb * bnbPrice.price
            setProject(project)
        }
    }, [bnbPrice])

    const handleGetMoreInfo = () => {
        // history.push('/token/0x04F73A09e2eb410205BE256054794fB452f0D245')
        setGetMoreInfo(true)
    }

    const formartNumber = (value) => {
        return value.toLocaleString().replace(/,/g, "'")
    }

    return (
        <Box
            sx={{
                width: !mobileMatches ? 'auto' : '612px',
                backgroundColor: '#FAF0CB',
                borderRadius: '25px',
                boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                mx: !mobileMatches ? '10px' : '0',
                py: '19px',
                px: '20px'
            }}
        >
            <Typography variant='h3'>
                Check liquidity
            </Typography>
            <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
                <SearchInput
                    setValue={checkSumAddress}
                    padding={'0 5px 0 15px'}
                    mr={2}
                />
            </Stack>
            <Stack direction="row"
                sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #B78300',
                    borderRadius: '25px',
                    px: '23px',
                    pt: '13px',
                    pb: '18px'
                }}
            >
                <Stack sx={{ width: '100%', height: '220px' }}>
                    {
                        !project.totalLP
                            ?
                            <Typography variant="h4"
                                sx={{ fontSize: 25, m: 'auto' }}
                            >
                                CONNECT YOUR WALLET TO SEARCH FOR ANY BSC TOKEN
                            </Typography>
                            :
                            <>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: '8px',
                                        pb: 1,
                                        borderBottom: '1px solid #AB882E'
                                    }}
                                >
                                    <Typography variant="h4"
                                        sx={{ fontSize: 17 }}
                                    >
                                        {project.name}
                                    </Typography>
                                    <Typography variant="body2"
                                        sx={{
                                            fontSize: 12
                                        }}
                                    >
                                        {project.symbol}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: 1.5
                                    }}
                                >
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        Total Liquidity
                                    </Typography>
                                    <Typography variant="body1">
                                        ${formartNumber(project.totalLP)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: 1.5
                                    }}
                                >
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        Pooled WBNB
                                    </Typography>
                                    <Typography variant="body1">
                                        {formartNumber(project.wbnb * 1)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: 1.5
                                    }}
                                >
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        Pooled {project.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {formartNumber(project.token)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: 1.5
                                    }}
                                >
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        Honeypot?
                                    </Typography>
                                    <Typography variant="body1">
                                        {project.honey}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        mb: 1.5
                                    }}
                                >
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        Buy / Sell taxes
                                    </Typography>
                                    <Typography variant="body1">
                                        {project.buy_tax}% / {project.sell_tax}%
                                    </Typography>
                                </Stack>
                            </>
                    }
                </Stack>
            </Stack>
            <Stack>
                {
                    pairAddress
                        ?
                        <Button onClick={goToDexTool} sx={{ mt: '12px', mx: 'auto' }}>
                            SHOW ON DEXTOOLS
                        </Button>
                        :
                        <Button onClick={handleGetMoreInfo} sx={{ mt: '12px', mx: 'auto' }}>
                            GET MORE INFO
                        </Button>
                }
            </Stack>

            {
                spin &&
                <Box sx={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#4033117d',
                    zIndex: 999
                }}>
                    <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} />
                </Box>
            }
        </Box>
    )
}

export default CheckLiguidity;