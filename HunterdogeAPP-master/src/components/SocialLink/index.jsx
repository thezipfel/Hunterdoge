import {Stack} from '@material-ui/core'
import SvgIconStyle from '../SvgIconStyle'

import medium from '../../images/social/medium.svg';
import telegram from '../../images/social/telegram.svg';
import instagram from '../../images/social/instagram.svg';
import twitter from '../../images/social/twitter.svg';
import reddit from '../../images/social/reddit.svg';


const SocialLinks = () => {
  return (
    <Stack direction="row" spacing={2}>
      <a rel="noopener noreferrer" target="_blank" href="https://t.me/hunterdogeofficial">
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            filter: 'drop-shadow(1px 3px 0px rgba(0, 0, 0, 0.1))',
            border: '7px solid #FFEDC0',
            // borderImage: 'linear-gradient(180deg, rgba(255, 227, 154, 0.95) 0%, #FFEDC0 100%)',
            // borderImageSlice: 1,
            borderRadius: '50%',
            width: 71,
            height: 71,
            backgroundColor: '#AB882E',
            
          }}
        >
          <SvgIconStyle color="paper" src={telegram} />
        </Stack>
      </a>
      <a rel="noopener noreferrer" target="_blank" href='https://twitter.com/hunterdoge_'>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            filter: 'drop-shadow(1px 3px 0px rgba(0, 0, 0, 0.1))',
            border: '7px solid #FFEDC0',
            width: 71,
            height: 71,
            backgroundColor: '#AB882E',
            borderRadius: '50%',
          }}
        >
          <SvgIconStyle color="paper" src={twitter} />
        </Stack>
      </a>
      <a rel="noopener noreferrer" target="_blank" href='https://www.instagram.com/hunterdogeofficial/'>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            filter: 'drop-shadow(1px 3px 0px rgba(0, 0, 0, 0.1))',
            border: '7px solid #FFEDC0',
            width: 71,
            height: 71,
            backgroundColor: '#AB882E',
            borderRadius: '50%',
          }}
        >
          <SvgIconStyle color="paper" src={instagram} />
        </Stack>
      </a>
      <a rel="noopener noreferrer" target="_blank" href='https://www.reddit.com/u/hunterdoge_/?utm_source=share&utm_medium=ios_app&utm_name=iossmf'>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            filter: 'drop-shadow(1px 3px 0px rgba(0, 0, 0, 0.1))',
            border: '7px solid #FFEDC0',
            width: 71,
            height: 71,
            backgroundColor: '#AB882E',
            borderRadius: '50%',
          }}
        >
          <SvgIconStyle color="paper" src={reddit} />
        </Stack>
      </a>
      <a rel="noopener noreferrer" target="_blank" href='https://medium.com/@hunterdoge'>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            filter: 'drop-shadow(1px 3px 0px rgba(0, 0, 0, 0.1))',
            border: '7px solid #FFEDC0',
            width: 71,
            height: 71,
            backgroundColor: '#AB882E',
            borderRadius: '50%',
          }}
        >
          <SvgIconStyle color="paper" src={medium} />
        </Stack>
      </a>
    </Stack>
  )
}

export default SocialLinks;
