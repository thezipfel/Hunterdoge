import styled from 'styled-components'

import BlockHunt from '../../components/blockHunt'


const Header = () => {

    return (
        <Block>
            {/* <Box
                    component='h1'
                    sx={{
                        fontSize: '33px',
                        height: '62px',
                        color: '#FFFBE2',
                        textShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        borderRight: '6px solid #FFFBE2',
                        flexShrink: 0,
                    }}
                >
                    BIGGEST GAINERS
                </Box> */}
            {/* <BlockOverflow> */}
            <BlockHunt/>
            {/* <BlockHunt number={'2'}/>
                    <BlockHunt number={'3'}/>
                    <BlockHunt number={'4'}/> */}
            {/* </BlockOverflow> */}

        </Block>
    )
}

export default Header;

const Block = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-around /* background: linear-gradient(270deg, rgba(136, 109, 40, 0.5) 3.52%, #886D28 18.73%, #886D28 82.08%, rgba(136, 109, 40, 0.5) 98.54%);
    box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1); */

`;

const BlockOverflow = styled.div`
  overflow: auto;
  display: flex;
`

const RootStyle = styled('div')(({theme}) => ({
    background: 'linear-gradient(270deg, rgba(136, 109, 40, 0.5) 3.52%, #886D28 18.73%, #886D28 82.08%, rgba(136, 109, 40, 0.5) 98.54%)',
    boxShadow: '0px 5px 0px rgba(0, 0, 0, 0.1)',
    height: '62pх',
    maxWidth: '100vw'

    // overflowX: 'scroll'
    // padding: '',
    // [theme.breakpoints.down('lg')]: {
    //   paddingBottom: theme.spacing(15),
    //   paddingTop: theme.spacing(14),
    // },
}))