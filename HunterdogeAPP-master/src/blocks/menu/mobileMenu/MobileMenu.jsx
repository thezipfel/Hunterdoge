import React, { useContext, useEffect, useState } from 'react';
import { Button, Flex, Image, LinkWrapper, Text } from "../../../components/common";
import logo from '../../../images/hunter_logo.png';
import chart from '../../../images/mobile/chart_ico.svg';
import { Wrapp, WrappedButton, Title, Wrapper, MenuModal, CloseButton } from "./MobileMenuStyled";
import NewMenu from '../newMenu/newMenu';
import ConnectWallet from '../../../connection/ConnectWallet';
import menuIcon from '../../../images/mobile/button_menu.svg';
import Modal from '@mui/material/Modal';
import RegisterModal from '../../../components/modal/RegisterModal';
import ContactModal from "../../../components/modal/Contact";
import { GoogleSheetContext } from '../../../contexts/GoogleSheetProvider';
import { bscTokenContact, bscWBNBContact } from '../../../connection/contracts';

const MobileMenu = ({ setIsContact }) => {
    const [open, setOpen] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const { data: tokens } = useContext(GoogleSheetContext)
    const [price, setPrice] = useState(0)

    useEffect(()=> {
        const hunter = tokens.find(e=> e.Project_Address.toLocaleLowerCase() === bscTokenContact.toLocaleLowerCase())
        if(hunter){
            setPrice(hunter.Project_Price)
        }
    }, [tokens])

    const goToPancake = () => {
        window.open(`https://pancakeswap.finance/swap?inputCurrency=${bscWBNBContact}&outputCurrency=${bscTokenContact}`, '_blank')
    }

    return (
        <>
            <Wrapper>
                <div>
                    <Flex>
                        <LinkWrapper to='/' style={{ display: 'flex' }}>
                            <Image src={logo} width={'25px'} height={'25px'} />
                            <Title>HunterDoge</Title>
                        </LinkWrapper>
                    </Flex>
                    <Flex justify={'start'} margin={'1px 0 0 7px!important'}>
                        <Image src={chart} width={'10px'} height={'5px'} />
                        <Text size={'8px'}>1 $HD = ${price} </Text>
                    </Flex>
                    <Flex justify={'start'} margin={'2px 0 0 18px!important'}>
                        <Button onClick={goToPancake} width={'43px'} height={'8px'} size={'7px'}>Buy $HD</Button>
                    </Flex>

                </div>
                <div>
                    <ConnectWallet />
                </div>
                <div onClick={() => setOpen(!open)}>
                    <Image src={menuIcon} width={'24px'} height={'24px'} />
                </div>
            </Wrapper>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ display: 'flex', justifyContent: 'center', padding: '20px 10px', zIndex:'25' }}
            >
                <NewMenu setOpen={setOpen} openRegister={() => { setIsRegister(true) }} setIsContact={setIsContact} />
            </Modal>
            {isRegister && <RegisterModal setIsOpen={setIsRegister} />}
        </>
    );
};

export default MobileMenu;


