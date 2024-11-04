import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import hunterdoge from '../../images/hunterdoge.png';
import TabPanel from '../TabPanel';
import Row from "./Row";
import TabsStyled from '../Tabs/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getVotesPerProject, getAllVotes } from '../../connection/functions';
import { useWallet } from "@binance-chain/bsc-use-wallet";

const tabs = [
    { label: "all-time" },
    { label: "Today’s best" },
    { label: "This week’s" }
]

// const ChangePart = ({setPartActive, partActive}) => (
//     <Part>
//         <Tab className={partActive === 1 ? 'active' : ''} onClick={() => setPartActive(1)}>
//             <span>all-time</span>
//         </Tab>
//         <Tab className={partActive === 2 ? 'active' : ''} onClick={() => setPartActive(2)}>
//             <span>Today’s best</span>
//         </Tab>
//         <Tab className={partActive === 3 ? 'active' : ''} onClick={() => setPartActive(3)}>
//             <span>This week’s</span>
//         </Tab>
//     </Part>
// )

const PopularTokens = () => {
    const mobileMatches = useMediaQuery('(min-width:600px)');
    const { account } = useWallet()
    const [value, setValue] = useState(0)
    const { data } = useContext(GoogleSheetContext)
    const [sortedData, setSortedData] = useState([])
    const [partActive, setPartActive] = useState(1)

    const getVotes = async () => {
        if (data.length > 0) {
            let _data = [...data]
            const _votes = await getAllVotes(data)
            _votes.forEach((_vote, idx) => {
                _data[idx].Project_MedVotes = parseInt(_vote.returnValues[3]['hex'])
                _data[idx].Project_Upvotes = parseInt(_vote.returnValues[1]['hex'])
                _data[idx].Project_Downvotes = parseInt(_vote.returnValues[2]['hex'])
            }) 
			_data.sort((a, b) => {
				return calcVotes(b) - calcVotes(a)
			})
			setSortedData(_data)
        }
    }
    
	const calcVotes = (item) => {
		return parseInt(item.Project_Upvotes) * 2 + parseInt(item.Project_MedVotes) - parseInt(item.Project_Downvotes)
	}

    useEffect(() => {
        data && getVotes()
    }, [data])

    const { filterOneDay, filterWeek } = useMemo(() => {
        const getWeekNumber = (date) => {
            date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
            var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        }
        const filterOneDay = sortedData.filter((token) => { 
            if (token.Project_added_date) return Date.parse(token.Project_added_date) >= new Date() - (24 * 60 * 60 * 1000)
            else return false
        })
        const filterWeek = sortedData.filter((token) => { 
            if (token.Project_added_date) return Date.parse(token.Project_added_date)>= new Date() - (7 * 24 * 60 * 60 * 1000)
            else return false
        })
        return { filterOneDay, filterWeek }
    }, [sortedData])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }


    return (
        <Box sx={{ mt: '30px', width: '100%', textAlign: 'center', position: 'relative', width:'100%' }}>
            {mobileMatches &&
                <Box component="img" src={hunterdoge}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '0%'
                    }}
                />
            }

            <Box component='h2' sx={{ fontSize: mobileMatches ? '60px' : '25px', mb: 3 }}>
                Most popular Tokens
            </Box>
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
                <TableContainer>
                    <Table responsive='true'>
                        <TableHead>
                            <TableRow>
                                {mobileMatches && <TableCell>#Rank</TableCell>}
                                <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px' }}>name</TableCell>
                                <TableCell sx={{ fontSize: mobileMatches ? '20px' : '10px',maxWidth:mobileMatches?'':'10px'}}>Ticker</TableCell>
                                <TableCell sx={{ fontSize: mobileMatches ? '20px' : '10px' }}>MCAP</TableCell>
                                <TableCell sx={{ fontSize: mobileMatches ? '20px' : '10px' }}>Price</TableCell>
                                <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px',padding:mobileMatches?'':'0px'}}>Votes</TableCell>
                                <TableCell sx={{ textAlign: 'left', fontSize: mobileMatches ? '20px' : '10px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'hidden' }}>
                            <TabPanel value={value} index={0}>
                                {partActive === 1 && sortedData && sortedData.slice(0, 25).map((row, index) => <Row key={index * 10} index={index} data={row} />)}
                                {partActive === 2 && filterOneDay.slice(0, 25).map((row, index) => <Row key={index * 9} index={index} data={row} />)}
                                {partActive === 3 && filterWeek.slice(0, 25).map((row, index) => <Row key={index * 11} index={index} data={row} />)}
                            </TabPanel>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Button component={Link} to="/allTokens"
                sx={{ mt: 5, minWidth: '187px' }}
            >
                see all tokens
            </Button>
        </Box>
    )
}

export default PopularTokens;

