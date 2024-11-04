import styled from "styled-components";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1039px;
  background: #FFFFFF;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: ${({padding}) => padding || '30px 5px 25px 52px'};
`

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({direction}) => direction || 'row'};
  justify-content: ${({content}) => content || 'evenly'};
  align-items: ${({items}) => items || 'start'};
  margin: ${({margin}) => margin};
`
export const Block = styled.div`
  margin: ${({margin}) => margin};
`

export const Title = styled.p`
  margin-bottom: 5px;
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: ${({size}) => size || '15px'};
  line-height: 1em;
  text-transform: uppercase;
  color: #B78300;    
`

export const Value = styled.p`
  margin: ${({margin}) => margin || '0 0 19px 0'};
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '800'};
  font-size: ${({size}) => size || '19px'};
  line-height: 1em;
  color: #B78300;
`

export const BannerWrapper = styled.div`
  margin: ${({margin}) => margin || '0 25px 0 0'};
  min-width: 300px;
  max-width: 577px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Banner = styled.div`
  max-width: 577px;
  width: 100%;
  height: 431px;
  background: #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
  
  h5 {
    width: 70%;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 39px;
    text-align: center;
    text-transform: uppercase;
    color: #FF0000;

    @media (min-width: 1920px) {
      font-size: 50px;
      line-height: 49px;
    }

    @media (max-width: 1600px) {
      width: 80%;
      font-size: 32px;
      line-height: 30px;
    }
  }
`

export const Text = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 29px;
  color: #B78300;
`

export const ActionWrapper = styled.div`
  padding: 26px 24px 15px 24px;
  width: 222px;
  height: 342px;
  border: 1px solid #C4C4C4;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ActionTitle = styled.p`
  width: 171px;
  height: 71px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 19px;
  text-align: center;
  color: #B78300;
`

export const ActionGoal = styled.p`
  width: 55.71px;
  height: 52px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 26px;
  line-height: 26px;
  text-align: center;
  color: #EE7541;
  text-align: center;
  margin-bottom: 8px;
`

export const ActionButton = styled.button`
  width: 160px;
  height: 30px;
  background: #EE7541;
  border-radius: 5px;
  padding: 6px 40px;
  border: none;
  margin-bottom: 13px;
  cursor: pointer;

  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  color: #FFFFFF;
`

export const SocialWrapper = styled.div`
  width: 160px;
  height: 28px;

  display: flex;
  justify-content: space-between;
`
export const ContentWrapper = styled.div`
  display: flex;
  margin-top: 18px;
`

export const ParticipationWrapper = styled.div`
  width: 217px;

  button {
    padding: 8px 19px;
    border: none;
    background: #FFFBE2;
    border-radius: 11.0353px;
    box-shadow: 2.2px 2.2px 0 rgba(0, 0, 0, 0.1);
    font-family: Raleway;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    color: #B78300;

    span {
      font-size: 30px;
      line-height: 29px;
    }
  }
`

export const ParticipationButton = styled.button`
  width: 100%;
  padding: 8px 19px;
  border: none;
  background: #FFFBE2;
  border-radius: 11.0353px;
  box-shadow: 2.2px 2.2px 0 rgba(0, 0, 0, 0.1);
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;
  color: #B78300;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 30px;
    line-height: 29px;
    text-align: center;
    text-transform: capitalize;
  }
  
  &[disabled] {
    cursor: not-allowed;
    background: #E7D4A4 !important;
  }

`

export const PerBnb = styled.span`
  font-style: normal;
  font-weight: 200;
  font-size: 13.57px;
  line-height: 13px;
  text-transform: none;
  color: #B78300;
`
export const LinkStyled = styled.a`
  display: block;
`