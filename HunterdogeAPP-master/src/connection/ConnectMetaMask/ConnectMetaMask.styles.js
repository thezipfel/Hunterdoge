import styled from "styled-components";

export const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    text-decoration: none;
    color: inherit;
    font-family: Raleway,sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 8px;
    border-radius: 4px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #1976d2;
    font-size: 15px;
    color: #FFFFFF;
    background-color: #AB882E;
    border-radius: 25px;
    padding: 10px 16px;
    line-height: 15px;
    -webkit-filter: drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.1));
    filter: drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.1));
    width: 100%;

    @media screen and (max-width: 725px) {
        display: flex;
        align-items: center;
        width: 148px;
        height: 32px;
    }
`;

export const AccountDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 25px;
    padding: 2px 2px 2px 1.6rem;
    height: 40px;
    /* width: 230px; */
    border: 2px solid #B78300;
    background-color: #fff;
    color: #B78300;
    font-size: 14px;
    box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 725px) {
        .account {
            display: none;
        }
    }
`;

export const WalletSpan = styled.span`
    display: block;
    margin-left: 10px;
    border-radius: 25px;
    padding: 10px;
    background-color: #FAF0CB;
`;
export const WalletMobileSpan = styled.span`
    display: none;
    margin-left: 10px;
    border-radius: 25px;
    padding: 10px;
    color: #ffffff;
    width: 145px;
    height: 40px;
    background-color: #FAF0CB;
    
    @media screen and (max-width: 725px) {
        .account-wallet-mobile {
            /* display: block; */
            display: flex;
            align-items: center;
            height: 32px;
        }
    }
`;
