import { useContext, useState } from 'react';
import { useWallet } from "@binance-chain/bsc-use-wallet";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import { Votes } from "../common/votes";
import { ModalContext } from "../../contexts/ModalProvider";
export const CheckPopup = ({ setIsOpen, big = false, item = {} }) => {
  // const {account} = useWeb3React()
  const { account, chainId } = useWallet();
  const { data } = useContext(GoogleSheetContext)
  const [showlink, setlinkshow] = useState(true);
  const context = useContext(ModalContext);

  const toggoleShowlink = () => {
    if (context.isMember[account]) {
      setlinkshow(!showlink)
    }
  }
  const mobileMatches = useMediaQuery('(min-width:600px)');
  return (
    <div>
      {mobileMatches &&
        <Modal big={big}>
          <CloseButton onClick={() => {
            setIsOpen(false)
          }}>X</CloseButton>
          {item.Project_Address && <CheckLink target={'_blank'} href={`/token/${item.Project_Address}`} onClick={() => {
            setIsOpen(false)
          }}>Check Profile</CheckLink>}
          {item.Project_Website && <CheckLink target={'_blank'} href={item.Project_Website} onClick={() => {
            setIsOpen(false)
          }}>Check Website</CheckLink>}
          {item.Project_Presale_Link && <CheckLink target={'_blank'} href={item.Project_Presale_Link} onClick={() => {
            setIsOpen(false)
          }}>Check Pre-sale</CheckLink>}
        </Modal>
      }
      {!mobileMatches &&
        <Modalmobile>
          <Stack direction="row">
            <Votes address={item.Project_Address} changeshowlink={toggoleShowlink} />
            {showlink &&
              <Stack direction={"row"}>
                {item.Project_Address && <MobileCheckLink target={'_blank'} href={`/token/${item.Project_Address}`} onClick={() => {
                  setIsOpen(false)
                }}>Check Profile</MobileCheckLink>}
                {item.Project_Website && <MobileCheckLink target={'_blank'} href={item.Project_Website} onClick={() => {
                  setIsOpen(false)
                }}>Visit Website</MobileCheckLink>}
                {item.Project_Address  && <MobileCheckLink target={'_blank'} href={`https://bscscan.com/address/${item.Project_Address}`} onClick={() => {
                  setIsOpen(false)
                }}>Check BSC-Scan</MobileCheckLink>}
              </Stack >}
            <Polygon></Polygon>
          </Stack>
        </Modalmobile>}
    </div>
  )
}
//mobile modal
const Modalmobile = styled.div`
  position: absolute;
  right:16px;
  width: 292px;
  top:-8px;
  height: 30px;
  background: #B78300;
  border: 1px solid #B78300;
  box-sizing: border-box;
  border-radius: 50px;
 `
const MobileCheckLink = styled.a`
  display: flex !important;
  align-items: center;
  padding:5px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 98.1%;
  /* identical to box height, or 8px */

  text-align: center;

  color: #FFF8CC;

`
const Polygon = styled.div`
position: absolute;
right: -4px;
top: 8px;
width: 15px;
height: 8px;
background: #B78300;
transform: rotate(45deg);

`

const Modal = styled.div`
  position: absolute;
  top: -17px;
  //right: -155px;
  right: ${({ big }) => big ? '-110px' : '50px'};
  width: 168px;
  height: 87px;
  background: #FFFFFF;
  border: 3px solid #FAF0CB;
  box-sizing: border-box;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 26px 18px 9px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

    &::before {
        content: ''; 
        position: absolute;
        left: 162px;
        top: 17px; 
        border: 15px solid transparent;
        border-left: 25px solid #fff;
      }
  
  // @media screen and (min-width: 1800px) {
  //   right: -191px;
  //   &::before {
  //       left: -37px;
  //       border: 15px solid transparent;
  //       border-right: 25px solid #fff;
  //     }
  }
`

const CloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 19px;
  height: 19px;
  top: 10px;
  right: 10px;
  border: none;
  background: #B78300;
  border-radius: 50%;
  cursor: pointer;
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 19px;
  transition: 0.5s;

  &:hover {
    background-color: #d5b562
  }
  
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;

  @media screen and (max-width: 992px) {
    font-size: 30px;
    line-height: 29px;
    width: 48px;
    height: 41px;
  }
`

const CheckLink = styled.a`
  font-size: 15px;
  font-weight: bold;
  line-height: 15px;
  text-align: center;
  color: rgba(171, 136, 46, 0.7);
  padding: 0px 5px;
  
  &:hover {
    color: #AB882E;
  }
`