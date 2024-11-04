import {Box} from '@mui/system';

const Divider = ({top, color}) => {
  return (
    <Box component='span'
    sx={{
      height: '3px',
      width: '100%',
      backgroundColor: '#FFFBE2',
      position: 'absolute',
      left: 0,
      top: {top}
    }}
  />
  )
}

export default Divider