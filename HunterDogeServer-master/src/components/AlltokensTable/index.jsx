import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import TabPanel from '../TabPanel'
import Pagination from '../pagination/Pagination';
import CheckboxShow from '../checkboxShow';
import Row from "./Row";
import TabsStyled from '../Tabs/Tabs';
import { paginate } from "../pagination/paginate";
import { ModalContext } from '../../contexts/ModalProvider'
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import { toChecksumAddress } from '../../connection/functions';
import { getAllVotes } from '../../connection/functions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useBNBPrice } from '../../hooks/useBNBPrice';

const fieldMap = {
	mcap: 'Project_MarketCap',
	price: 'Project_Price',
	liq: 'Project_LiqMcapRatio',
	holder: 'Project_Holder',
}

const AllTokensTable = (isTitle) => {
	const mobileMatches = useMediaQuery('(min-width:600px)');
	const { account } = useWallet()
	const bnbPrice = useBNBPrice()
	const context = useContext(ModalContext)
	const [value, setValue] = useState(0)
	const { data } = useContext(GoogleSheetContext)
	const [sortedData, setSortedData] = useState([])
	const [currentData, setCurrentData] = useState({ newData: [], currentPage: 0, endPage: 0 })
	const [partActive, setPartActive] = useState('all')
	const [perPage, setPerPage] = useState(25)
	const [page, setPage] = useState(1)

	let tabs = []
	context.searchOption.map((item, i) => {
		tabs = [...tabs, { label: `Search ${i + 1}`, close: true, id: item.id }]
	})
	tabs = [...tabs].concat([
		{ label: "All Time", id: 'all' },
		{ label: "Today’s best", id: 'today' },
		{ label: "This week’s", id: 'week' }
	])

	useEffect(() => {
        data && getVotes()
    }, [data])

	useEffect(() => {
		let result = filter()
		const res = paginate(result.length, page, perPage, result)
		setCurrentData(res)
	}, [sortedData, partActive, page, perPage])

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

	const filter = () => {
		if (projectsData[partActive]) {
			return projectsData[partActive]
		}
		let result = [...projectsData.all]
		const option = context.searchOption.filter(e => e.id == partActive)[0]
		if (option) {
			const address = option.search ? toChecksumAddress(option.search) : false
			result = result.filter(item => {
				let projectAddress = toChecksumAddress(item?.Project_Address)
				if (address && projectAddress !== address) return false;

				if (option.memeCoin && option.memeCoin.toString().toLowerCase() != item.Project_IsMemeCoin.toLowerCase()) return false;
				if (option.securityAudit && option.securityAudit.toString().toLowerCase() != item.Project_ISKYC.toLowerCase()) return false;
				if (option.doxxedTeam && option.doxxedTeam.toString().toLowerCase() != item.Project_ISDOX.toLowerCase()) return false;
				if (option.useCase && option.useCase.toString().toLowerCase() != item.Project_HasUtility.toLowerCase()) return false;

				if (option.project) {
					if (option.project == 'votes') {
						if (option.cond === 'high') {
							return calcVotes(item) >= option.value
						} else {
							return calcVotes(item) <= option.value
						}
					} else {
						if (option.cond === 'high') {
							return item[fieldMap[option.project]] >= option.value
						} else {
							return item[fieldMap[option.project]] <= option.value
						}
					}
				}
				return true
			})

			let direct = option.direct === 'asc' ? 1 : -1;
			result = result.sort((a, b) => {
				if (option.field === 'votes') {
					return ((calcVotes(a) > calcVotes(b)) ? 1 : -1) * direct
				} else {
					return (((a[fieldMap[option.field]] ? parseFloat(a[fieldMap[option.field]]) : 0) > (b[fieldMap[option.field]] ? parseFloat(b[fieldMap[option.field]]) : 0)) ? 1 : -1) * direct
				}
			})
		}

		return result
	}

	const projectsData = useMemo(() => {
		const filterOneDay = sortedData.filter((token) => {
			if (token.Project_added_date) return Date.parse(token.Project_added_date) >= new Date() - (24 * 60 * 60 * 1000)
			else return false
		})
		const filterWeek = sortedData.filter((token) => {
			if (token.Project_added_date) return Date.parse(token.Project_added_date) >= new Date() - (7 * 24 * 60 * 60 * 1000)
			else return false
		})
		return { all: sortedData, today: filterOneDay, week: filterWeek }
	}, [sortedData])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeTab = (id) => {
		context.removeSearchOption(id)
	}

	return (
		<Stack direction="row" alignItems="center" sx={{ gap: 8, width: '100%' }}>
			<Box sx={{ mt: 4, textAlign: 'center', position: 'relative', width: '100%' }}>
				{/* <Tabs
					value={value} onChange={handleChange} aria-label="sort"
				> */}
				<TabsStyled setPartActive={setPartActive} partActive={partActive} data={tabs} closeTab={closeTab} />
				{/* </Tabs> */}
				<Box
					sx={{
						backgroundColor: (mobileMatches ? '#FFF' : '#FFF8CC'),
						borderRadius: '25px',
						borderTopLeftRadius: 0,
						boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
						border: '3px solid #FFF3D4'
					}}
				>
					<TableContainer>
						<Table responsive='true'>
							<TableHead>
								<TableRow>
									{mobileMatches && <TableCell>#Rank</TableCell>}
									<TableCell sx={{
										textAlign: 'left',
										fontSize: mobileMatches ? '16px' : '10px'
									}}>name</TableCell>
									<TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>Ticker</TableCell>
									<TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>MCAP</TableCell>
									<TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>Price</TableCell>
									{mobileMatches && <TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>Liq /
										Mcap<br /> Ratio</TableCell>}

									{mobileMatches && <TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>Holders</TableCell>}
									{mobileMatches && <TableCell sx={{ fontSize: mobileMatches ? '16px' : '10px' }}>&Oslash; Holder<br />growth
										per day</TableCell>}
									<TableCell sx={{
										textAlign: 'left',
										fontSize: mobileMatches ? '16px' : '10px'
									}}>Votes</TableCell>
									{mobileMatches && <TableCell sx={{
										textAlign: 'left',
										fontSize: mobileMatches ? '16px' : '10px'
									}} />}
								</TableRow>
							</TableHead>
							<TableBody>
								<TabPanel value={value} index={0}>
									{currentData.newData.map((row, index) => <Row key={index} index={index}
										data={row} bnbPrice={bnbPrice} />)}
								</TabPanel>
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
				<Stack direction="row" justifyContent="space-between" sx={{ mt: 3, px: 2 }}>
					{mobileMatches && <CheckboxShow perPage={perPage} handleCheck={setPerPage} />}
					{!mobileMatches && <div></div>}
					<Pagination start={currentData.currentPage} end={currentData.endPage} pageHandler={setPage}
						page={page} />
				</Stack>
			</Box>
		</Stack>
	)
}

export default AllTokensTable;