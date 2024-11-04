import {Box} from '@mui/system';
import {Button, Stack, Typography} from '@material-ui/core';
import Divider from '../divider';

const PromotedPreSales =() => {
  return (
    <Box
      sx={{
        height: '350px',
        width: '320px',
        backgroundColor: '#FAF0CB',
        borderRadius: '25px',
        boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
        mb: '59px',
        textAlign: 'center',
        p: '25px',
        pb: 1,
        position: 'relative'
      }}
    >
      <Typography variant='h3' sx={{fontSize: 23}}>
        promoted pre-sales
      </Typography>
      <Divider top="63px"/>
      <Box sx={{height: '237px', my: 1}}/>
      
      <Divider top="300px"/>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" sx={{width: '85px'}}>
          PRE-SALE STARTS IN:
        </Typography>
        <Box component="h4" sx={{fontSize: 26}}>
          3 d 22 h
        </Box>
        <Button sx={{fontSize: 11}}>
          visit
        </Button>
      </Stack>
    </Box>
  )
}

export default PromotedPreSales;