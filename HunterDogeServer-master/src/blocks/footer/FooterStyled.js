import styled from "styled-components";
import {Link} from "react-router-dom";

export const FooterMain = styled.div`
  position: relative;
  z-index: 1;
  height: auto;
  max-width: 100vw;
  width: 100%;
  background-color:  rgba(171, 136, 46, 0.25);
  margin-top: 46px;
  padding: 20px 10px;
  
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 600px) {
    padding: 59px 30px 64px 30px;
    height: 323px;
    background-color: #775600;
  }
`
export const Text = styled(Link)`
  font-family: Raleway;
  font-style: ${({fontStyle}) => fontStyle || 'normal'};
  font-weight: ${({weight}) => weight || '500'};;
  font-size: ${({size}) => size || '21px'};
  line-height: ${({size}) => size || '21px'};
  text-decoration: none;
  margin: ${({margin}) => margin || '25px 0 0 0'};
  color: #B78300;
  @media (min-width: 600px) {
    color: #FFFFFF;
  }
`

export const Title = styled.h3`
  text-transform: uppercase;
  font-size: ${({size}) => size || '30px'};
  line-height: ${({size}) => size || '30px'};
  margin-top: ${({mtop}) => mtop || '0'};
`

export const Button = styled.button`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #B78300;
  padding: 10px;
  width: 50%;
  margin-top: 5px;
  text-align: center;
  background: #FFF8CC;
  border: 2px solid #B78300;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  transition: 0.4s;

  @media (min-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
  &:hover {
    background: #d5b562;
  }
`

export const ImageWrapper = styled.div`
  margin-left: 20px;
  transform: translateY(60px);
  @media (min-width: 1600px) {
    margin-left: 40px;
  }
`

export const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  margin-top: 5px;
  @media (min-width: 1600px) {
    justify-content: space-between;
    margin-top: 35px;
  }
`

export const LinkStyled = styled.a`
  display: block;
  text-decoration: none;
`

export const LinkFooter = styled.a`
  display: block;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: ${({size}) => size || '21px'};
  line-height: 21px;
  margin: ${({margin}) => margin || '25px 0 0 0'};
  color: #B78300;
  text-decoration: underline;
  @media (min-width: 600px) {
    color: #FFFFFF;
    text-decoration: none;
  }
`
export const MarketingTitle =styled.h3`
  width: 230px;
  font-family: Raleway;
  font-style: italic;
  font-weight: 300;
  font-size: 18px;
  line-height: 31px;
  margin-top: 12px;
  color: #FFFFFF;
`
