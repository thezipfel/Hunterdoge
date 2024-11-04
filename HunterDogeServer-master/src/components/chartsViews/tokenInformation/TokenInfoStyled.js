import styled from "styled-components";

export const Flex = styled.p`
  display: flex;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1039px;
  background: ${({ isMobile }) => isMobile ? '#FFF8CC' : '#FFF'};
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: ${({ isMobile }) => isMobile ? '15px 2px' : '37px 10px 17px 38px'};
  flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'inherit'};
  position:${({position})=>position }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({margin}) => margin || '38px'};
`

export const RightContent = styled.div`
  width: ${({width}) => width || '350px'};
  //max-width: 400px;
  //min-width: 320px;
  //word-wrap: break-word;
  margin: ${({margin}) => margin || '0'};
  padding-left: 20px;
`

export const DescTextWrapper = styled.div`
  min-width: 300px;
  max-width: 626px;
  width: 100%;
  margin: ${({margin}) => margin || '14px 0 69px 0'};
  padding: 0 15px 15px 0;
  overflow-y: auto;
`

export const DescText = styled.pre`
  font-family: Raleway;
  color: #B78300;
  font-size: ${({size}) => size || '18px'};
  line-height: 1em;
  font-weight: 400;
  height: ${({height}) => height || '432px'};
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, с 1999 года*/
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */

`

export const Title = styled.p`
    margin-bottom: 10px;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 15.57px;
    line-height: 15px;
    text-transform: uppercase;
    color: #B78300;
`

export const Divider = styled.hr`
  border: none;
  width: 2px;
  height: 592px;
  background-color: #FAF0CB;
  margin-right: 29px;
  margin-top: 23px;
`

export const HeadTitle = styled.h4`
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '800'};
  font-size: ${({size}) => size || '21px'};
  line-height: 1em;
  text-transform: ${({text}) => text || 'uppercase'};
  text-align: ${({align}) => align || 'left'};
  margin: ${({margin}) => margin || '0'};
  color: #B78300;
`
export const HeadSubTitle = styled.h4`
  font-family: Raleway;
  font-style: normal;
  font-weight: ${({weight}) => weight || '800'};
  font-size: 12px;
  line-height: 15px;
  /* text-transform: ${({text}) => text || 'uppercase'}; */
  color: #B78300;
  font-style: italic;
`



export const Value = styled.p`
  margin-bottom: 26px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 19px;
  line-height: 19px;
  text-transform: uppercase;
  color: #B78300;
`

export const Upcoming = styled.span`
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;
  margin-left: 21px;
`

