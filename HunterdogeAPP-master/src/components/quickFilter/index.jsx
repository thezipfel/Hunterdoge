import { MenuItem, Typography } from '@material-ui/core';
import { Button, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonCheckbox from '../buttonCheckbox';
import SelectForm from '../selectForm';
import { ModalContext } from '../../contexts/ModalProvider';
import { useHistory } from "react-router-dom";

const marketCap = [
	{ value: 'mcap', label: 'Market Cap' },
	{ value: 'price', label: 'Price ' },
	{ value: 'liq', label: 'Liq./Mcap-Ratio' },
	{ value: 'holder', label: 'Holders' },
	{ value: 'votes', label: 'Votes' },
]
const highestFirst = [
	{ value: 'desc', label: 'Highest first' },
	{ value: 'asc', label: 'Lowest first' },
]

const QuickFilter = () => {
	const history = useHistory()
	const mobileMatches = useMediaQuery('(min-width:600px)');
	const [field, setField] = useState('votes')
	const [direct, setDirect] = useState('desc')
	const [securityAudit, setSecurityAudit] = useState(false)
	const [doxxedTeam, setDoxxedTeam] = useState(false)
	const [useCase, setUseCase] = useState(false)
	const [memeCoin, setMemeCoin] = useState(false)

	const context = useContext(ModalContext)

	const search = () => {
		context.setSearchOption({
			id: (new Date).valueOf(),
			field: field,
			direct: direct,
			securityAudit: securityAudit,
			doxxedTeam: doxxedTeam,
			useCase: useCase,
			memeCoin: memeCoin,
		})
		setTimeout(() => {
			console.log(context.searchOption)
			history.push('/allTokens')
		}, 1000);
	}

	return (
		<div>
			<Stack
				sx={{
					padding: '18px 25px 22px 27px',
					width: !mobileMatches ? 'auto' : '355px',
					backgroundColor: '#FAF0CB',
					borderRadius: '25px',
					boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
					textAlign: 'center',
					mx: !mobileMatches ? '10px' : '0'
				}}
			>
				<Typography variant='h3' sx={{ mb: '13px' }}>
					Quick Filter
				</Typography>
				<Stack sx={{ mt: '12px', mx: 'auto' }}>
					<SelectForm label="Filter tokens by:" defaultValue={field}>
						{
							marketCap.map((item, key) => {
								return (
									<MenuItem
										onClick={() => setField(item.value)}
										value={item.value}
										key={key}
										sx={{ backgroundColor: (item.value == field ? '#FAF0CB' : 'unset') }}
									>
										{item.label}
									</MenuItem>
								)
							})
						}
					</SelectForm>
				</Stack>
				<Stack sx={{ mt: '12px', mx: 'auto' }}>
					<SelectForm label="Sort tokens by:" defaultValue={direct}>
						{
							highestFirst.map((item, key) => {
								return (
									<MenuItem
										onClick={() => setDirect(item.value)}
										value={item.value}
										key={key}
										sx={{ backgroundColor: (item.value == direct ? '#FAF0CB' : 'unset') }}
									>
										{item.label}
									</MenuItem>
								)
							})
						}
					</SelectForm>
				</Stack>
				<Typography variant='body1' sx={{ mb: '10px', mt: '20px', textAlign: 'center' }}>
					Show only tokens with:
				</Typography>
				<Stack direction="row" sx={{ mb: '14px', }}>
					<ButtonCheckbox mr='15px' active={securityAudit ? true : false} setActive={setSecurityAudit}>
						Security Audit
					</ButtonCheckbox>
					<ButtonCheckbox active={doxxedTeam ? true : false} setActive={setDoxxedTeam}>
						Doxxed Team
					</ButtonCheckbox>
				</Stack>
				<Stack direction="row" sx={{ mb: '14px', }}>
					<ButtonCheckbox mr='15px' active={useCase ? true : false} setActive={setUseCase}>
						Use Case
					</ButtonCheckbox>
					<ButtonCheckbox active={memeCoin ? true : false} setActive={setMemeCoin}>
						Memecoin
					</ButtonCheckbox>
				</Stack>
				<Button onClick={() => search()} sx={{ mt: '12px', mx: 'auto' }}>
					SEARCH
				</Button>
			</Stack>
		</div>
	)
}

export default QuickFilter