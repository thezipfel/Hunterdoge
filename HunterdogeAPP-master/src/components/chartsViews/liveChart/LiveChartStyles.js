import styled from "styled-components";

export const Wrapper = styled.div`
  display: ${({isMobile}) => isMobile ? 'block' : 'flex'};
  justify-content: space-between;
  max-width: 1039px;
  background: ${({ isMobile }) => isMobile ? '#FFF8CC' : '#FFFFFF'};
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: ${({isMobile}) => isMobile ? '20px 10px 10px 10px' : '62px 21px 25px 30px'};
`

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: auto;
  width: 100%;
`
export const LiveChartTitle = styled.p`
  font-family: Raleway,sans-serif;
  font-weight: 800;
  color: #B78300;
  margin-right: 22px;
  font-size: ${({size}) => size || '21px'};
  line-height: ${({size}) => size || '21px'};
`

export const LiveChartSubtitle = styled.p`
  font-family: Raleway,sans-serif;
  font-weight: 300;
  color: #B78300;
  font-style: italic;
  font-size: ${({size}) => size || '21px'};
  line-height: ${({size}) => size || '21px'};
`

export const Title = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '400'};
  font-size: ${({size}) => size || '15.57px'};
  line-height: ${({size}) => size || '15px'};
  color: #B78300;
  margin: ${({margin}) => margin || '0 0 5px 0'};
`

export const Value = styled.p`
  margin: ${({margin}) => margin || '0 0 19px 0'};
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '700'};
  font-size: ${({size}) => size || '16px'};
  line-height: ${({size}) => size || '15.7px'};
  color: #B78300;
`

export const Changes24 = styled.p`
  font-family: Raleway;
  color: ${({up}) => up ? '#32C130' : '#FF0000'};
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 11.8px;
  margin: ${({margin}) => margin || '5px 0 0 20px'};
`;

export const Good = styled.h5`
  color: #4EC505;
  font-family: ArmagedaWide, sans-serif;
  text-transform: uppercase;
  font-size: 19px;
  line-height: 18.6px;
  margin-left: 17px;
`;

export const LinkWrapper = styled.a`
  height: 22px;
  color: ${({disable}) => disable ? 'unset' : ''};
  border: ${({disable}) => disable ? 'unset' : '0.7px solid #B78300'};
  box-shadow: ${({disable}) => disable ? 'unset' : '1.8px 1.8px 0 rgba(0, 0, 0, 0.1)'};
  border-radius: 9px;
  padding: 4px 5px;
  display: flex;
  align-items: center;
  
  p {
    font-family: Raleway;
    font-style: normal;
    font-weight: 800;
    font-size: 13px;
    line-height: 13px;
    text-transform: uppercase;
    color: #B78300;
    margin-right: 7px;
  }
`;

export const Tab = styled.div`
  width: 129px;
  height: 19px;
  background: transparent;
  box-shadow: 1.8px 1.8px 0 rgba(0, 0, 0, 0.1);
  border: 0.7px solid #B78300;
  box-sizing: border-box;
  border-radius: 9px;
  
  margin-top: 10px;

  font-family: Raleway, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 9px;
  text-transform: uppercase;
  color: #B78300;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p:first-child {
    position: relative;
    padding: 0 10px;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 19px;
      background-color: #B78300;
      transform: translateY(-5px);
    }
  }
  
  p:last-child {
    padding: 0 10px;
  }
`;
