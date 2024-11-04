import {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from "@binance-chain/bsc-use-wallet";
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
import {Button, Flex, Image, Text} from '../common';
import PickModal from '../modal/PickModal';
import { postComment } from '../../connection/functions';

const LeaveComment = () => {
    const { address } = useParams()
    const { account } = useWallet()
    const [isModal, setIsModal] = useState(false)
    const [username, setUsername] = useState('')
    const [message, setMessge] = useState('')
    const [avatarId, setAvatarId] = useState(0)

    const addComment = (e) => {
        if (username === '') {
            alert("Input username")
            return
        }
        if (message === '') {
            alert('Input message')
            return
        }
        console.log("post comment")
        postComment(address, username, avatarId, message, account)
    }

    return (
        <Block>
          <Flex justify={'start'}>
            <Title>leave a comment </Title>
            <TextDescr>You need to connect your wallet to leave a comment.</TextDescr>
          </Flex>
          <Flex margin={'17px 0 0 0'}>
            <Flex direction={'column'} margin={'0 25px 0 0'}>
                {/* <Image src={logo} width={'103'}/> */}
                {avatarId === 0 && <Image src={logo} width={'103'} />}
                {avatarId === 1 && <Image src={logo1} width={'103'} />}
				{avatarId === 2 && <Image src={logo2} width={'103'} />}
				{avatarId === 3 && <Image src={logo3} width={'103'} />}
				{avatarId === 4 && <Image src={logo4} width={'103'} />}
				{avatarId === 5 && <Image src={logo5} width={'103'} />}
				{avatarId === 6 && <Image src={logo6} width={'103'} />}
				{avatarId === 7 && <Image src={logo7} width={'103'} />}
				{avatarId === 8 && <Image src={logo8} width={'103'} />}
				{avatarId === 9 && <Image src={logo9} width={'103'} />}
				{avatarId === 10 && <Image src={logo10} width={'103'} />}
                <ButtonPick onClick={() => setIsModal(!isModal)}>pick another picture
                {isModal && <PickModal getAvatarID={setAvatarId} setIsOpen={setIsModal}/>}
                </ButtonPick>
            </Flex>
            <InputMessage onChange={(e) => setMessge(e.target.value)} id="Message"/>
          </Flex>
          <Flex justify={'end'} margin={'13px 0 0 0'}>
              <Text size={'13px'} weight={900}>your nickname</Text>
              <InputNick onChange={(e) => setUsername(e.target.value)}/>
              <Button width={'183px'} bg={'#AB882E'} onClick={addComment}>add comment</Button>
          </Flex>
        </Block>
    )
}

export default LeaveComment;

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
    font-size: 26px;
    line-height: 98.1%;
    color: #B78300;
    text-transform: uppercase;
    /* padding: 29px 0 24px 50px; */
`

const TextDescr = styled.p`
    font-family: Raleway;
    font-style: italic;
    font-weight: 500;
    font-size: 15.57px;
    line-height: 98.1%;
    margin-left: 30px;


    /* titel */

    color: #B78300;

`

const ButtonPick = styled.button`
    width: 183px;
    height: 31px;
    background: #FFFFFF;
    border: 2px solid rgba(183, 131, 0, 0.3);
    border-radius: 25px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 900;
    font-size: 13px;
    line-height: 98.1%;
    /* identical to box height, or 13px */
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    margin-top: 15px;
    color: #B78300;
    position: relative;
`;

const InputMessage = styled.textarea`
  width: 712px;
  height: 135px;
  padding: 15px;
  background: #FFF8CC;
  border-radius: 25px;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  border: none;
  `

const InputNick = styled.input`
    width: 183px;
    height: 31px;
    background: #FFFFFF;
    border: 2px solid rgba(183, 131, 0, 0.3);
    box-sizing: border-box;
    border-radius: 25px;
    margin: 0 44px 0 18px;
`