import {useContext, useState} from 'react';
import {Box} from '@mui/system';
import {Button, Input, MenuItem, Stack, Typography} from '@mui/material';
import hunterdogeSearch from '../../images/hunterdoge_search.png';
import SearchInput from '../searchInput';
import SelectForm from '../selectForm';
import ButtonCheckbox from '../buttonCheckbox';
import {ModalContext} from '../../contexts/ModalProvider';

const marketCap = [
  { value: 'mcap', label: 'Market Cap' },
  { value: 'price', label: 'Price' },
  { value: 'ratio', label: 'Liq./Mcap-Ratio' },
  { value: 'holder', label: 'Holders' },
  { value: 'votes', label: 'Votes' },
]
const descending = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
]

const projects = [
  { value: 'mcap', label: 'Marketcap' },
  { value: 'ratio', label: 'Liq./Mcap-Ratio' },
  { value: 'holder', label: 'Holders' },
  { value: 'votes', label: 'Votes' },
]

const condList = [
  { value: 'high', label: 'Higher' },
  { value: 'low', label: 'Lower' },
]

const SearchOrFilter = () => {
  const context = useContext(ModalContext)
  const [search, setSearch] = useState('')
  const [field, setField] = useState('votes')
  const [direct, setDirect] = useState('desc')
  const [project, setProject] = useState('')
  const [value, setValue] = useState(70)
  const [cond, setCond] = useState('high')
  const [securityAudit, setSecurityAudit] = useState(false)
  const [doxxedTeam, setDoxxedTeam] = useState(false)
  const [useCase, setUseCase] = useState(false)
  const [memeCoin, setMemeCoin] = useState(false)

  const startSearch = () => {
    context.setSearchOption({
      id: (new Date).valueOf(),
      search: search,
      field: field,
      direct: direct,
      project: project,
      value: value,
      cond: cond,
      securityAudit: securityAudit,
      doxxedTeam: doxxedTeam,
      useCase: useCase,
      memeCoin: memeCoin,
    })
  }

  return (
    <Box
      sx={{

        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        // textAlign: 'start'
      }}>
      <Box component='h2' sx={{ fontSize: '44px', ml: 2 }}>
        Search or filter your tokens
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: 'calc(100vw - 500px)',
          backgroundColor: '#FAF0CB',
          bdirectRadius: '25px',
          boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          mt: '19px',
          // mr: 7,
          py: '21px',
          pl: '22px',
          pr: '18px'
        }}
      >

        <Stack direction="row"
          sx={{
            mb: 2,
            mx: 'auto',
            width: '417px'
          }}>
          <SearchInput value={search} setValue={setSearch} mr={'11px'} padding={'0 5px 0 15px'} />
        </Stack>
        <Stack direction="row" alignItems="end" gap="13px">
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
          <SelectForm label="Sort tokens by:" defaultValue={direct}>
            {
              descending.map((item, key) => {
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
          <SelectForm label="Display projects with:" defaultValue={project}>
            {
              projects.map((item, key) => {
                return (
                  <MenuItem
                    onClick={() => setProject(item.value)}
                    value={item.value}
                    key={key}
                    sx={{ backgroundColor: (item.value == project ? '#FAF0CB' : 'unset') }}
                  >
                    {item.label}
                  </MenuItem>
                )
              })
            }
          </SelectForm>
          <Typography>of</Typography>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputProps={{
              sx: {
                textAlign: 'center !important',
                minWidth: '80px',
                p: '4px'
              },
              min: 0,
              max: (project === 'mcap' || project === 'ratio') ? 100 : null,
              type: 'number'
            }}></Input>
          <Typography sx={{ whiteSpace: 'nowrap' }}> {(project === 'ratio') && '%'} and</Typography>
          <SelectForm defaultValue={cond}>
            {
              condList.map((item, key) => {
                return (
                  <MenuItem
                    onClick={() => setCond(item.value)}
                    value={item.value}
                    key={key}
                    sx={{ backgroundColor: (item.value == cond ? '#FAF0CB' : 'unset') }}
                  >
                    {item.label}
                  </MenuItem>
                )
              })
            }
          </SelectForm>
        </Stack>
        <Stack direction="row" alignItems="end" gap="13px">
          <Typography sx={{ mx: 'auto', mt: '10px' }}>Show only tokens with:</Typography>
        </Stack>
        <Stack direction="row" alignItems="start" gap="13px">
          <ButtonCheckbox mr='15px' active={securityAudit} setActive={setSecurityAudit}>
            Security Audit
          </ButtonCheckbox>
          <ButtonCheckbox mr='15px' active={useCase} setActive={setUseCase}>
            Usecase
          </ButtonCheckbox>
          <ButtonCheckbox mr='15px' active={doxxedTeam} setActive={setDoxxedTeam}>
            Doxxed Team
          </ButtonCheckbox>
          <ButtonCheckbox mr='15px' active={memeCoin} setActive={setMemeCoin}>
            Memecoin
          </ButtonCheckbox>
          <Box component="img" src={hunterdogeSearch} />
        </Stack>
        <Button sx={{ px: '40px' }} onClick={startSearch}>
          SEARCH
        </Button>
      </Box>
    </Box>
  )
}


export default SearchOrFilter;