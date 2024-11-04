import {Box} from '@mui/system';
import {Typography} from '@material-ui/core';


const News =() => {
  return (
    <Box
      sx={{
        height: '350px',
        width: '320px',
        backgroundColor: '#FAF0CB',
        borderRadius: '25px',
        boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
        mt: '46px',
        textAlign: 'center',
        pt: '32px',
        position: 'relative'
      }}
    >
      <Typography variant='h3'
        sx={{borderBottom: '3px solid #FFFBE2', pb: '51px'}}
      >
        News
      </Typography>
    </Box>
  )
}

export default News;