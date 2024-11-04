import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'

const GoTop = (props) => {
    const [intervalId, setIntervalId] = useState(0);
    const [thePosition, setThePosition] = useState(false);
    
    const timeoutRef = useRef(null);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                setThePosition(true)
            } else {
                setThePosition(false);
            }
        });
        // window.scrollTo(0, 0);
    }, [])
    
    const onScrollStep = () => {

        if (window.pageYOffset === 0){
            clearInterval(timeoutRef.current);
        }
        window.scroll(0, window.pageYOffset - props.scrollStepInPx);
    }

    const scrollToTop = () => {
        timeoutRef.current = setInterval(onScrollStep, props.delayInMs);
 
    }

  return (
      <Wrapper onClick={scrollToTop}>
        GO TO TOP
        <DoubleArr>{`>>`}</DoubleArr>
      </Wrapper>
  );
};
export default GoTop;

const Wrapper = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 98.1%;
  text-transform: uppercase;
  color: #B78300;
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: end;
    &:hover {
        color: #d5b562
    }
    &:hover > div {
        color: #d5b562
    }
`

const DoubleArr = styled.div`
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
    margin-left: 11px;
    text-align: center;
    color: #B78300;
    cursor: pointer;
    transform: rotate(270deg);
`