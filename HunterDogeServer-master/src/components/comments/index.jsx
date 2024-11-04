import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useWallet} from "@binance-chain/bsc-use-wallet";
import styled from 'styled-components';
import logo from '../../images/hunter_logo.png';
import logo1 from '../../images/Amazed.png';
import logo2 from '../../images/Angel.png';
import logo3 from '../../images/Coolio.png';
import logo4 from '../../images/Confident.png';
import logo5 from '../../images/Disappointed.png';
import logo6 from '../../images/Evil_.png';
import logo7 from '../../images/Glasses.png';
import logo8 from '../../images/Happy.png';
import logo9 from '../../images/Thinking.png';
import logo10 from '../../images/Unhappy.png';
import dots from '../../images/dots.png';
import up from '../../images/arr_up.png';
import down from '../../images/arr_down.png';
import {Button, Flex, Image} from '../common';
import {reportComment, votePostComment} from '../../connection/functions';
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery} from '@mui/material';

import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider)

const useStyles = makeStyles({
  container: {
    padding: ({ isMobile }) => isMobile ? '10px 20px' : '20px 39px 19px 47px',
  },
  blockComment: {
    padding: ({ isMobile }) => isMobile ? '10px 15px' : '15px 30px',
  },
  userName: {
    fontSize: ({ isMobile }) => isMobile ? '7px' : '13px',
  },
  message: {
    fontSize: ({ isMobile }) => isMobile ? '8px' : '15px',
  },
  button: {
    fontSize: ({ isMobile }) => isMobile ? '8px' : '15px',
    height: ({ isMobile }) => isMobile ? '16px' : '36px',
  },
  buttonCircle: {
    width: ({ isMobile }) => isMobile ? '16px' : '36px',
  },
  rotateText: {
    fontSize: ({ isMobile }) => isMobile ? '10px' : '20px',
  },
  count: {
    fontSize: ({ isMobile }) => isMobile ? '14px' : '24px',
    marginLeft: ({ isMobile }) => isMobile ? '8px' : '22px',
    marginRight: ({ isMobile }) => isMobile ? '8px' : '19px',
  },
  date: {
    fontSize: ({ isMobile }) => isMobile ? '8px' : '15px',
  },
	image: {
		width: ({ isMobile }) => isMobile ? '30px' : '103px',
		height: ({ isMobile }) => isMobile ? '30px' : '94px',
    marginBottom: '4px'
	},
  title: {
    fontSize: ({ isMobile }) => isMobile ? '14px' : '40px',
    textAlign: ({ isMobile }) => isMobile ? 'center' : 'left',
  }
});

const Comment = ({store}) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
	  const classes = useStyles({ isMobile: mobileMatches });
    const {address} = useParams()
    const {account} = useWallet()
    const [monthDifferece, setMonthDifferece] = useState(0)
    const [dayDifferece, setDayDifferece] = useState(0)
    const [hourDifferece, setHourDifferece] = useState(0)
    const [minuteDifferece, setminuteDifferece] = useState(0)
    const report = () => {
        reportComment(address, parseInt(store[0].hex), account)
    }
    const increment = () => {
        votePostComment(address, parseInt(store[0].hex), true, account)
    }
    const decrement = () => {
        votePostComment(address, parseInt(store[0].hex), false, account)
    }

    useEffect(() => {
        let timeDifference = new window.Date() - new window.Date(parseInt(store[5].hex) * 1000)
        console.log(timeDifference)
        setMonthDifferece(Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 30))
        setDayDifferece(Math.floor(timeDifference / 1000 / 60 / 60 / 24))
        setHourDifferece(Math.floor(timeDifference / 1000 / 60 / 60))
        setminuteDifferece(Math.floor(timeDifference / 1000 / 60))
    }, [store])

    return (
        <BlockComment className={classes.blockComment}>
            <Flex>
                <Flex direction={'column'} margin={mobileMatches ? '0 8px 0 0': '0 25px 0 0'}>
                    {/* <Image src={logo} width={'103'}/> */}
                    {parseInt(store[1].hex) === 0 && <Image src={logo} className={classes.image} />}
                    {parseInt(store[1].hex) === 1 && <Image src={logo1} className={classes.image} />}
                    {parseInt(store[1].hex) === 2 && <Image src={logo2} className={classes.image} />}
                    {parseInt(store[1].hex) === 3 && <Image src={logo3} className={classes.image} />}
                    {parseInt(store[1].hex) === 4 && <Image src={logo4} className={classes.image} />}
                    {parseInt(store[1].hex) === 5 && <Image src={logo5} className={classes.image} />}
                    {parseInt(store[1].hex) === 6 && <Image src={logo6} className={classes.image} />}
                    {parseInt(store[1].hex) === 7 && <Image src={logo7} className={classes.image} />}
                    {parseInt(store[1].hex) === 8 && <Image src={logo8} className={classes.image} />}
                    {parseInt(store[1].hex) === 9 && <Image src={logo9} className={classes.image} />}
                    {parseInt(store[1].hex) === 10 && <Image src={logo10} className={classes.image} />}
                    <UserName className={classes.userName}>{store[4]}</UserName>

                </Flex>

                <BlockMessage>

                    {/* <Date>one month ago</Date> */}
                    <Message className={classes.message}>
                        {store[8]}
                        <br/>
                    </Message>
                    {/* {show && (
                        <Flex mt={'14px'}>
                            <Show size={'12px'} mr={'8px'}>Show all</Show>
                            <ButtonDown height={'25px'} width={'25px'}/>
                        </Flex>
                    )} */}
                </BlockMessage>
            </Flex>

            <Actions>
                <Flex>
                    <Button className={classes.button} onClick={report} width={mobileMatches ? '42px': '86px'} bg={'#AB882E'} margin={'0 10px 0 0'}>
                        Report
                    </Button>
                    <RotateText rotate={'rotate(90deg)'} size={mobileMatches? '18px' :'25px'}>...</RotateText>
                    <ButtonCircle className={[classes.button, classes.buttonCircle]} onClick={decrement}><RotateText className={classes.rotateText}>V</RotateText></ButtonCircle>
                    <Count className={classes.count}>
                        {parseInt(store[9].hex) - parseInt(store[10].hex) > 0 ? `+` : ``}
                        {parseInt(store[9].hex) - parseInt(store[10].hex)}
                    </Count>
                    <ButtonCircle className={[classes.button, classes.buttonCircle]} onClick={increment}><RotateText
                        rotate={'rotate(180deg)'} className={classes.rotateText}>V</RotateText></ButtonCircle>
                    {/* <ButtonCircle />
                    <ButtonUp onClick={increment}/>
                    <Count> +3 </Count>
                    <ButtonDown onClick={decrement} height={'35px'} width={'35px'}/> */}
                </Flex>
                <Date className={classes.date}>
                    {monthDifferece > 0 ? monthDifferece + ` months ago` : dayDifferece > 0 ? dayDifferece + ` days ago` : hourDifferece > 0 ? hourDifferece + ` hours ago` : minuteDifferece + ` minutes ago`} ///
                    ID: {parseInt(store[0].hex)}
                </Date>
            </Actions>
        </BlockComment>
    )
}

const Comments = ({commentStore, commentCount}) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
	  const classes = useStyles({ isMobile: mobileMatches });
    const [showMore, setShowMore] = useState(false)

    return (
        <Block className={classes.container}>
            <Title className={classes.title}>COMMENTS ({commentCount}) </Title>
            {Array.from(Array(commentCount), (e, key) => {
                return (
                    <Fragment key={key}>
                        {(showMore ? key >= 0 : key < 2) &&
                          <Comment store={commentStore[Object.keys(commentStore)[key]].callsReturnContext[0].returnValues} />}
                    </Fragment>
                )
            })}
            {/* <Comment show/> */}
            <CenterWrapper>
                <Button width={mobileMatches ? '100px' : '161px'} size={mobileMatches ? '10px' : '15px'} height={mobileMatches ? '20px' : '36px'} bg={'#AB882E'} onClick={() => setShowMore(!showMore)}>
                    {showMore ? `Show less` : `Show more`}
                </Button>
                {/* <ButtonDown height={'35px'} width={'35px'}/> */}
            </CenterWrapper>
        </Block>
    )
}

export default Comments;

const Block = styled.div`
  background: #FFFFFF;
  border: 2px solid rgba(183, 131, 0, 0.3);
  border-radius: 25px;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  margin-top: 120px;
  margin-bottom: 40px;
  padding: 20px 39px 19px 47px;
  max-width: 1039px
`

const Title = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 98.1%;
  color: #B78300;
  /* padding: 29px 0 24px 50px; */
`

const BlockComment = styled.div`
  margin-top: 17px;
  background: #FFFFFF;
  /* border-bottom: 2px solid #FAF0CB; */
  display: flex;
  padding: 15px 30px;
  background: #FFF8CC;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
`


const BlockMessage = styled.div`
  margin: 0 0;
`

const UserName = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  word-break: break-all;
  text-align: center;
  font-size: 13px;
  line-height: 98.1%;
  text-transform: uppercase;
  color: #B78300;
`;

const Date = styled.div`

  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 98.1%;

  color: #B78300;
  margin-left: auto;
  margin-top: auto;
`

const Message = styled(Date)``

const Actions = styled.div`
  margin-top: 0;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-space-between
`

/* const Button = styled.button`
    width: 107px;
    height: 38px;
    background: #fff;
    box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    font-family: Raleway;
    font-style: normal;
    font-weight: 900;
    font-size: 17px;
    line-height: 17px;
    text-align: center;
    color: #EE7541;
    margin-right: 13px;
` */

const ButtonCircle = styled.button`
  width: 35px;
  height: 35px;
  background: #AB882E;
  box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  margin: ${({margin}) => margin || '0'};
    /* font-size: ${({size}) => size || '20px'};
    line-height: 98.1%; */
  /* identical to box height, or 20px */

  text-align: center;

  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
    /* width: 35px;
    height: 35px;
    background-color: #fff;
    box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-family: Raleway;
    font-style: normal;
    font-weight: 900;
    font-size: 17px;
    line-height: 17px;
    text-align: center;
    color: #EE7541;
    background-image: url(${dots});
    margin-right: 29px; */

  &:hover {
    background-color: #d5b562
  }
`

const RotateText = styled.p`
  transform: ${({rotate}) => rotate || 'rotate(0deg)'};
  font-size: ${({size}) => size || '20px'};
  line-height: ${({size}) => size || '20px'};
  padding-bottom: ${({pb}) => pb || '0'};
`

const ButtonUp = styled.button`
  width: 35px;
  height: 35px;
  background-color: #fff;
  box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  color: #EE7541;
  background-image: url(${up});
`

const ButtonDown = styled.button`
  width: ${({width}) => width};
  height: ${({height}) => height};
  background-color: #fff;
  box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #EE7541;
  background-image: url(${down});
  background-size: contain;
`

const Count = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 98.1%;
  text-align: center;
  text-transform: uppercase;
  color: #B78300;
  margin-left: 22px;
  margin-right: 19px;
`
/* const Flex = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${({mt}) => mt || '0'};
` */

const CenterWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;
`

const Show = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: ${({size}) => size || '17px'};
  line-height: 98.1%;
  text-transform: uppercase;
  color: #B78300;
  margin-right: ${({mr}) => mr || '0'};
`;
