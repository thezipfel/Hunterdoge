import React from "react";
import styled from "styled-components";

export const Badges = ({children, text}) => {
    return (
        <BadgeWrapper>
            {children}
            <BadgePopup className='badge'>{text}</BadgePopup>
        </BadgeWrapper>
    )
}

export const BadgeWrapper = styled.span`
  position: relative;

  &:hover > .badge {
    opacity: 1;
    visibility: visible;
  }
`;

export const BadgePopup = styled.div`
  &.badge {
    position: absolute;
    width: 115px;
    height: 28px;
    padding: 5px 8px;
    background: #FFF599;
    border: 3px solid #FAF0CB;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: Raleway, sans-serif;
    font-style: normal;
    font-weight:  700;
    font-size: 13px;
    line-height: 13px;
    color: #AB882E;
    top: 6px;
    right: -117px;
    z-index: 20;
    text-transform: none;
    transition: opacity 0.3s ease-in-out;
    
    visibility: hidden;
    opacity: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      border: 8px solid transparent;
      border-right: 8px solid #FFF599;
    }
  }
`