import {Button, Stack} from '@mui/material';
import {Box} from '@mui/system';
import hunterdogeShadow from '../../images/hunterdoge_menu.png';
import SearchInput from '../../components/searchInput'
import {Link} from "react-router-dom";
import ContactModal from '../../components/modal/Contact';
import {useState} from 'react';

const Menu = () => {
    const [open, setOpen] = useState(false)

    return (
        <Box
            sx={{
                position: 'sticky',
                top: '1em',
                zIndex: 2,
                paddingTop: '2em',
                width: '348px',
                height: '100%',
                backgroundColor: '#FAF0CB',
                borderRadius: '25px',
                boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
                pl: '38px',
                pr: '31px',
                pt: '36px',
                pb: 1
            }}
        >
            <Box sx={{position: 'relative'}}>
                <SearchInput small mb={'28px'}/>
            </Box>

            <Button variant="large" sx={{mb: 3}} component={Link} to="/allTokens">
                All Tokens
            </Button>
            <a href="https://t.me/huntersground" target="_blank">
                <Button variant="large" sx={{mb: 3, lineHeight: '25px', height: 71}}>
                    telegram shill bot
                </Button>
            </a>
            <Button variant="large" sx={{mb: 3}} onClick={() => {
                console.log('открыть модалку');
                setOpen(true)
            }
            }>
                Contact
            </Button>
            <Stack direction="row" alignItems="end" justifyContent="space-between" sx={{mt: '27px'}}>
                <Button variant="transparent" target="_blank"
                        onClick={() => window.open('https://t.me/hunterdogeofficial', "_blank")}>
                    + Submit your coin
                </Button>
                <Box component="img" src={hunterdogeShadow}
                     sx={{
                         bottom: '-115px'
                     }}
                />
            </Stack>
            {open && <ContactModal setIsOpen={setOpen}/>}
        </Box>
    )
}

export default Menu;