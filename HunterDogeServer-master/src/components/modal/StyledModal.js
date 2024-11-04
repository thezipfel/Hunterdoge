import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  width: 68px;
  height: 51px;
  top: 30px;
  right: 50px;
  border: none;
  background: #B78300;
  border-radius: 50%;
  cursor: pointer;
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 39px;
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

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 100%;
  z-index: 100;
`

export const ImageWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 50px;
`

export const Title = styled.h3`
  font-size: ${({size}) => size || '60px'};
  line-height: 1em;
  margin: ${({margin}) => margin || '0'};
  text-transform: uppercase;

  @media screen and (max-width: 992px) {
    font-size: 40px;
  }

  @media screen and (max-width: 570px) {
    font-size: 30px;
  }
`

export const VotesWrapper = styled.div`
  width: ${({width})=> width || '430px'};
  margin: 18px auto;
  display: flex;
  align-items: center;
  justify-content: ${({justify})=> justify || 'flex-end'};
`

export const Text = styled.p`
  font-family: Raleway;
  font-weight: 700;
  font-size: ${({size}) => size || '30px'};
  line-height: 1em;
  color: #B78300;
  margin: ${({margin}) => margin || '0'};
  text-transform: uppercase;

  @media screen and (max-width: 992px) {
    font-size: 22px;
  }

  @media screen and (max-width: 570px) {
    font-size: 18px;
  }
`

export const ModalCard = styled.div`
  position: relative;
  max-width: 1117px;
  width: ${({width})=> width || '75%'};
  height: 706px;
  background: #FFFFFF;
  border: 6px solid #FAF0CB;
  box-sizing: border-box;
  border-radius: 60px;
  padding: 77px 0 53px 0;
  margin: 10% auto 0 auto;
`