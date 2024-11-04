import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@mui/system";
import {Image} from "../common";

const useStyles = makeStyles({
    root: {

        backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    flexLine: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    des: {
        fontSize: '16px',
        color: '#D6B050',
        lineHeight: '15.7px',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    value: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#AB882E',
        textTransform: 'uppercase'
    },
    content: {
        padding: '5px 10px 0 10px',
    },
    headerContent: {
        position: 'relative',

        background: 'linear-gradient(180deg, #D9B354 0%, rgba(14, 13, 10, 0.1) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const data = [
    {id: '123', des: 'TOTAL Quantity', value: '355'},
    {id: '124', des: 'issued quantity', value: '230'},
    {id: '125', des: 'availability', value: 'very rare'},
    {id: '126', des: 'cost per NFT', value: '0.01 BNB'},
]

const CardNft = ({image}) => {
    const classes = useStyles();

    const buy = () => console.log('buy') 
    const sell = () => console.log('sell')

    return (
        <Card className={classes.root}>
            <div className={classes.headerContent}>
                <Image src={image} width={'317px'} height={'309px'}/>
            </div>
            <Box component='h5' sx={{fontSize: '25px', mt: '17px', textAlign: 'center'}}>
                Hunter chasing hotdogs
            </Box>
            <CardContent className={classes.content}>
                {data.map((item) =>
                    <Box key={item.id} component='div' className={classes.flexLine} sx={{mt: '12px'}}>
                        <Typography variant="body2" component="p" className={classes.des}>
                            {item.des}
                        </Typography>
                        <Typography variant="body2" component="p" className={classes.value}>
                            {item.value}
                        </Typography>
                    </Box>
                )}
                <Box component='div' className={classes.flexLine} sx={{mt: '18px'}}>
                    <Button size="small" onClick={() => buy()}>Buy this nft</Button>
                    <Button size="small" onClick={() => sell()}>Sell your nft</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardNft;
