import styled from "styled-components";
import {Link} from "react-router-dom";

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  width: 100%;
`
export const Link_ = styled(Link)`
  text-decoration: none;
  font-family: Raleway;
  font-weight: 700;
  color: #B78300;
  font-size: ${({size}) => size || '30px'};
  line-height: ${({size}) => size || '30px'};
  margin: ${({margin}) => margin || '0'};
  text-transform: uppercase;
  transition: 0.4s;

  &:hover {
    color: #282c34;
  }
`

export const Text = styled.h3`
  font-family: Raleway;
  font-weight: ${({weight}) => weight || 700};
  font-size: ${({size}) => size || '30px'};
  line-height: ${({size}) => size || '30px'};
  margin: ${({margin}) => margin || '0'};
  font-style: ${({font}) => font || 'normal'};
  text-transform: uppercase;
`

export const Button = styled.button`
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '36px'};
  border: ${({border}) => border || 'none'};
  cursor: pointer;
  background: ${({bg}) => bg || '#B78300'};
  box-sizing: border-box;
  border-radius: 25px;
  font-size: ${({size}) => size || '15px'};
  line-height: ${({size}) => size || '15px'};
  margin: ${({margin}) => margin || '0'};
  position: ${({position}) => position || 'relative'};
  right: ${({right}) => right || 'unset'};
  bottom: ${({bottom}) => bottom || 'unset'};
  left: ${({left}) => left || 'unset'};

  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '700'};

  text-align: center;
  text-transform: uppercase;
  box-shadow: ${({boxShadow}) => boxShadow || '1px 3px 0 rgba(0, 0, 0, 0.1)'};
  color: ${({color}) => color || '#FFFFFF'};

  transition: hover 0.5s;

  &:disabled {
    cursor: not-allowed;
    background: #E7D4A4 !important;
  }

  &:hover {
    background-color: #d5b562
  }
`

export const ButtonGreen = styled.button`
  width: ${({big}) => big ? '160px' : '100%'};
  height: ${({big}) => big ? '36px' : '22px'};
  border: none;
  cursor: pointer;
  background: rgba(50, 193, 48, 0.62);
  border-radius: 25px;
  font-size: ${({big}) => big ? '15px' : '13px'};
  line-height: ${({big}) => big ? '15px' : '13px'};
  margin: ${({margin}) => margin || '0'};

  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '600'};

  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 1px 3px 0 rgba(0, 0, 0, 0.1);
  color: #FFFFFF;

  transition: 0.5s;

  &:hover {
    background: #32C130;
  }
`

export const ButtonYellow = styled.button`
  width: ${({big}) => big ? '160px' : '100%'};
  height: ${({big}) => big ? '36px' : '22px'};
  border: none;
  cursor: pointer;
  background: rgba(255, 218, 1, 0.81);
  border-radius: 25px;
  font-size: ${({big}) => big ? '15px' : '13px'};
  line-height: ${({big}) => big ? '15px' : '13px'};
  margin: ${({margin}) => margin || '0'};

  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '600'};

  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 1px 3px 0 rgba(0, 0, 0, 0.1);
  color: #fff;

  transition: 0.5s;

  &:hover {
    background: #FFDA01;
  }
`

export const ButtonRed = styled.button`
  width: ${({big}) => big ? '160px' : '100%'};
  height: ${({big}) => big ? '36px' : '22px'};
  border: none;
  cursor: pointer;
  background: rgba(255, 0, 0, 0.63);
  border-radius: 25px;
  font-size: ${({big}) => big ? '15px' : '13px'};
  line-height: ${({big}) => big ? '15px' : '13px'};
  margin: ${({margin}) => margin || '0'};

  font-family: Raleway;
  font-style: normal;
  font-weight: ${({big}) => big ? '600' : '500'};
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  box-shadow: 1px 3px 0 rgba(0, 0, 0, 0.1);
  color: #FFFFFF;

  transition: 0.5s;

  &:hover {
    background: #FF0000;
  }
`

export const VoteWrapper = styled.div`
  position: relative;
  width: ${({big}) => big ? '180px' : '91px'};
  height: ${({big}) => big ? '56px' : '100%'};
  /*margin: 0 20px;*/
  gap: 7px;
  display: flex;
  text-align: center;
    //align-items: ${({big}) => big ? 'center' : 'stretch'};
  align-items: center;
  flex-direction: ${({big}) => big ? 'row' : 'column'};
`
export const MoreButton = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  font-size: 45px;
  line-height: 12px;
  font-weight: 500;
  font-family: Raleway;

  @media screen and (max-width: 600px) {
    width: 15px;
    height: 15px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 900;
    font-size: 10px;
    line-height: 98.1%;
    text-align: center;
    text-transform: uppercase;
    padding-bottom:4px;
  }
`

export const More = styled.button`
  position: relative;
  padding: 0 0 25px 0;
  width: 35px;
  height: 35px;
  border: none;
  cursor: pointer;
  background: #B78300;
  border-radius: 25px;
  font-size: 45px;
  line-height: 12px;
  font-weight: 500;
  font-family: Raleway;
  box-shadow: 1px 3px 0 rgba(0, 0, 0, 0.1);
  color: #FFFFFF;
  transition: 0.5s;

  &:hover {
    background-color: #d5b562
  }
  @media screen and (max-width: 600px) {
    width: 15px;
    height: 15px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 900;
    font-size: 10px;
    line-height: 98.1%;
    text-align: center;
    text-transform: uppercase;
    padding-bottom:4px;
  }
`

export const Flex = styled.div`
  display: flex;
  justify-content: ${({justify}) => justify || 'space-between'};
  flex-direction: ${({direction}) => direction || 'row'};
  align-items: ${({items}) => items || 'center'};
  margin: ${({margin}) => margin || '0'};
  margin-left: ${({left}) => left ? 'auto' : '0'};
  max-width: ${({mwidth}) => mwidth};
`

export const Image = styled.img.attrs(props => ({
    src: props.src || Image,
}))`
  width: ${({width}) => width};
  height: ${({height}) => height || '100%'};
  margin: ${({margin}) => margin || '0'};
  cursor: pointer;
`;

export const Changes24 = styled.p`
  color: ${({up}) => up > 0 ? '#32C130' : '#FF0000'};
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 11.8px;
  margin-left: 8px;
`;