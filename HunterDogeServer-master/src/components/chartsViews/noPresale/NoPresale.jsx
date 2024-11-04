import React from 'react';
import {Grid, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import NoPresale from "../../../images/noPresale.png";
import {Box} from "@mui/system";
import ConnectMetaMask from "../../../connection/ConnectMetaMask";

const useStyles = makeStyles({
    root: {},
    content: {
        maxWidth: '1039px',
        height: '762px',
        background: '#FFFFFF',
        boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: '25px',
        alignItems: 'center',
    },
    wrapper: {
        marginTop: '40px'
    },
    btn: {
        width: '123px',
    },
    breadCrumb: {
        color: '#B78300'
    }
});

const NoPresaleView = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.content}>
            <Typography sx={{
                fontSize: '21px',
                lineHeight: '20.8px',
                mt: '82px',
                fontWeight: '800'
            }}>
                There are no pre-sale information to this token.
            </Typography>
            <Box component='img' src={NoPresale}
                 sx={{width: "318px", height: "318px", my: '62px'}}/>
            <Typography sx={{
                fontSize: '19px',
                textAlign: 'center',
                lineHeight: '22.8px',
                fontWeight: '500'
            }}>
                If this is your token, you can edit pre-sale information by clicking <Link href="#" sx={{
                color: '#B78300',
                fontWeight: '600'
            }}>here</Link>
                <br/>
                or
                <br/>
                use our DxSale API feed to connect your pre-sale section with the API.
            </Typography>
            <div className={classes.wrapper}>
                <ConnectMetaMask className={classes.btn} text={'connect'}/>
            </div>
        </Grid>

    );
};

export default NoPresaleView;
