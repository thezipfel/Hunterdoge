import styled from "styled-components";

export const ExtraSmall = styled.span`
  font-family: Raleway;
  font-style: normal;
  font-weight: 900;
  font-size: 7px;
  line-height: 7px;
  margin: 0 3px;
`

export const Input = styled.input`
    // width: ${({ big }) => big ? '75px' : '100%'};
  // height: 27px;
  width: 91px;
  height: 37px;
  text-align: center;
  border: 1px solid rgba(183, 131, 0, 0.67);
  color: #AB882E;
  font-weight: 500;
  font-size: 20px;
  background-color: #FAF0CB;
  transition: 0.4s;
  margin-top: 5px;
  padding: 8px 13px;

  &::placeholder {
    width: 61px;
    position: absolute;
    top: 7px;
    font-weight: 500;
    font-size: 10px;
    color: rgba(171, 136, 46, 0.5);
    white-space: pre-wrap;
    @media screen and (max-width: 600px) {
      position: absolute;
      left:-4px;
      top: 5px;
    }
  }

  &:active {
    color: red;
  }

  &:focus {
    outline: none;
  }
`

export const Modal = styled.div`
  position: absolute;
  top: ${({ big }) => big ? '0' : '-9px'};
  right: ${({ big }) => big ? '200px' : '105px'};
  width: 140px;
  height: 105px;
  background: #FFFFFF;
  border: 3px solid #FAF0CB;
  box-sizing: border-box;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 11px 18px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    &::before {
      content: ''; 
      position: absolute;
      left: 133px;
      top: 10px; 
      border: 20px solid transparent;
      border-left: 20px solid #fff;
    }
  
  // @media screen and (min-width: 1800px) {
  //   right: ${({ big }) => big ? '200px' : '-155px'};
  //     &::before {
  //       left: ${({ big }) => big ? '133px' : '-37px'};
  //       border: 20px solid transparent;
  //       ${({ big }) => big ? 'border-left: 20px solid #fff;' : 'border-right: 20px solid #fff;'}
  //     }
  // }
`
