import {Box} from "@material-ui/system";
import {Button, Stack, Typography} from '@material-ui/core';

import logo from '../../images/hunter_logo.png';
import like from '../../images/like_ico.svg';
import {ReactComponent as IconDialogue} from '../../images/dialogue_ico.svg';
import {ReactComponent as IconReward} from '../../images/reward_ico.svg';

const DividerBlock = () => {
  return(
    <Box component='span'
    sx={{
      height: '3px',    
      backgroundColor: '#FFFBE2',
      display: 'block',
      width: '100%',
      
    }}
  />
  )
}


const PromotedSpots = () => {
  return(
    <Box component="span"
      sx={{
      height: '932px',
      width: '320px',
      backgroundColor: '#FAF0CB',
      borderRadius: '25px',
      boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      padding: '32px 0'
      }}
    >
      <Typography variant='h3' sx={{borderBottom: '3px solid #FFFBE2', pb: '26px'}}>
        promoted spots
      </Typography>
      
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        {/* <Button>
          VOTE
        </Button> */}
        <Stack direction="row">
          <Box component='img' src={like}
            sx={{mr: '3px'}}
          />
          <Typography variant="body1" sx={{fontSize: 14}}>
            156’093
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center"
        sx={{
          p: 2,
          borderBottom: '3px solid #FFFBE2',
        }}
      >
        <Box component="img" src={logo} sx={{width: '50px'}}/>
        <Stack sx={{ml: '10px', mr: '35px'}}>
          <Typography variant="h5">
            HunterDoge
          </Typography>
          <Stack direction="row" sx={{gap: 2, mt: '7px'}}>
            <IconReward/>
            <IconDialogue/>
          </Stack>   
        </Stack>
        <Button>
          VOTE
        </Button>
      </Stack>
    </Box>
  )
}

export default PromotedSpots;