import React, {useMemo, useState} from 'react';
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import styled from "styled-components";
import {Box} from '@mui/system';
import {SHEET_ID_PRESALES} from "../../constants";
import {useGoogleSheet} from '../../hooks/useGoogleSheet';
import Row from "./Row";
import TabsStyled from '../Tabs/Tabs';
import Pagination from "../pagination/Pagination";
import {paginate} from "../pagination/paginate";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const tabs = [
    { label: "upcoming" },
    { label: "Ended" }
]

// const PopularPreSales = () => {
//     const {data} = useGoogleSheet(SHEET_ID_PRESALES)
//     const [partActive, setPartActive] = useState(1)
//     const [openPopup, setOpenPopup] = useState(false)
//     const [page, setPage] = useState(1)
//     // console.log(window.innerWidth)

//     const handleInfo = () => {
//         setOpenPopup(true)
//         setTimeout(function () {
//             setOpenPopup(false)
//         }, 5000);
//     }


//     const currentTime = Date.now()


const PopularPreSales = () => {
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const { data } = useGoogleSheet(SHEET_ID_PRESALES)
    const [partActive, setPartActive] = useState(1)
    const [openPopup, setOpenPopup] = useState(false)
    const [page, setPage] = useState(1)
    const handleInfo = () => {
        setOpenPopup(true)
        setTimeout(function () {
            setOpenPopup(false)
        }, 5000);
    }
    //   const filterUpcoming = data?.filter(({Liq_Lock_Time}) => Liq_Lock_Time >= currentTime)
    //   const filterEnded = data?.filter(({Liq_Lock_Time}) => Liq_Lock_Time <= currentTime)
    const { newData, currentPage, endPage, startIndex } = useMemo(() => {
        const currentTime = Math.round(new Date() / 1000)
        const filterUpcoming = data.filter(({ Project_Start_Time }) => Project_Start_Time >= currentTime)
        const filterEnded = data.filter(({ Project_Start_Time }) => Project_Start_Time <= currentTime)
        //paginate
        const paginateData = partActive === 1 ? filterUpcoming : filterEnded
        return paginate(paginateData.length, page, 10, paginateData.reverse())
    }, [partActive, page, data])

    return (
        <Box sx={{ mt: '55px', width: '100%', textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
                <Box component='h2' sx={{ fontSize: mobileMatches ? '60px' : '25px', mr: mobileMatches ? 4 : 0 }}>
                    Most popular pre-sales
                </Box>
                <Info onClick={handleInfo}>i
                    {openPopup &&
                        <Popup isMobile={mobileMatches} >
                            <TextPopup mb={'7px'}>Automated DxSale Presale Feed</TextPopup>
                            <TextPopup color="rgba(171, 136, 46, 0.7)" fw={700}>In the table below our feed aggregates all
                                presales listed on DxSale. We do NOT control the below listed projects. Be aware and
                                DYOR!</TextPopup>
                        </Popup>
                    }
                </Info>
            </Stack>
            <TabsStyled setPartActive={setPartActive} partActive={partActive} data={tabs} />
            <Box
                sx={{
                    backgroundColor: (mobileMatches ? '#FFF' : '#FFF8CC'),
                    borderRadius: '25px',
                    borderTopLeftRadius: 0,
                    boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
                    border: '3px solid #FFF3D4',
                    overflow: 'hidden'
                }}
            >
                <TableContainer sx={{ overflow: 'visible' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {mobileMatches && <TableCell style={{ textAlign: 'left' }}>#Rank</TableCell>}
                                <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px', paddingLeft: '0' }}>name</TableCell>
                                <TableCell sx={{ fontSize: mobileMatches ? '20px' : '10px' }}>Ticker</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontSize: mobileMatches ? '20px' : '10px' }}>Caps</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontSize: mobileMatches ? '20px' : '10px' }}>Limits</TableCell>
                                {mobileMatches && <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px' }}></TableCell>}
                                <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        {partActive === 1 ? <TableBody>
                            {newData?.map((row, index) => <Row key={index} index={startIndex + index} data={row} />)}
                        </TableBody> : <TableBody>
                            {newData?.map((row, index) => <Row key={index} index={startIndex + index} data={row} />)}
                        </TableBody>
                        }
                    </Table>
                </TableContainer>
            </Box>
            <Pagination style={{ marginTop: '23px' }} start={currentPage} end={endPage} pageHandler={setPage} page={page} />
            {/*<Button sx={{mt: 5, minWidth: '187px'}}>*/}
            {/*  see all pre-sales*/}
            {/*</Button>*/}
        </Box>
    )
}

export default PopularPreSales;

const Popup = styled.div`
  position: absolute;
  width: ${({ mobileMatches }) => mobileMatches ? '300px' : '250px'};
  height: ${({ mobileMatches }) => mobileMatches ? '130px' : 'auto'};
  left: ${({ mobileMatches }) => window.innerWidth < 1800 ? (mobileMatches ? '-300px' : '-280px') : '46px'};
  top: ${({ mobileMatches }) => window.innerWidth < 1800 ? (mobileMatches ? '-120px' : '-130px') : '-20px'};
  padding: 17px 19px 17px 32px;
  background: #FFF599;
  border: 3px solid #FAF0CB;
  box-sizing: border-box;
  text-align: start;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  @media (min-width: 600px) {
    width: 462px;
    height: 97px;
    left: ${() => window.innerWidth < 1800 ? '-480px' : '46px'};
    top: ${() => window.innerWidth < 1800 ? '-100px' : '-20px'};
  }

  &::before {
    content: '';
    position: absolute;
    top: ${({ mobileMatches }) => window.innerWidth < 1800 ? (mobileMatches ? '90px' : '120px') : '15px'};
    left: ${({ mobileMatches }) => window.innerWidth < 1800 ? (mobileMatches ? '285px' : '245px') : '-39px'};
    transform: ${() => window.innerWidth < 1800 ? 'rotate(180deg)' : 'rotate(0)'};
    border: 15px solid transparent;
    border-right: 25px solid #FFF599;
    @media (min-width: 600px) {
        top: ${() => window.innerWidth < 1800 ? '50px' : '15px'};
        left: ${() => window.innerWidth < 1800 ? '455px' : '-39px'};
        transform: ${() => window.innerWidth < 1800 ? 'rotate(180deg)' : 'rotate(0)'};
      }
  }
`

const TextPopup = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({ fw }) => fw ? fw : 800};
  font-size: 15px;
  line-height: 15px;
  color: ${({ color }) => color ? color : '#AB882E'};
  margin-bottom: ${({ mb }) => mb ? mb : 0};
`

const Info = styled.div`
  cursor: pointer;
  font-family: Raleway;
  font-weight: 900;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  background: #AB882E;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`


