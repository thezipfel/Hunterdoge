import * as React from 'react';
import arrowLeft from '../../images/left.png';
import arrowRight from '../../images/right.png';
import styled from "styled-components";
import {Image} from "../common";
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Pagination({ start, end, page, pageHandler, showPageNumber = true, ...rest }) {
	const mobileMatches = useMediaQuery('(min-width:600px)');
	const handleLeft = () => {
		pageHandler((page) => page - 1)
	}
	const handleRight = () => {
		pageHandler((page) => page + 1)
	}
	return (
		<Wrapper {...rest}>
			<Button disabled={page === 1} onClick={handleLeft}>
				<Image src={arrowLeft} width={mobileMatches ? 'auto' : '16px'} />
			</Button>
			<Count>
				{showPageNumber ? `${page} / ${end}` : ''}
			</Count>
			<Button disabled={page === end} onClick={handleRight}>
				<Image src={arrowRight} width={mobileMatches ? 'auto' : '16px'} />
			</Button>
		</Wrapper>
	);
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
export const Count = styled.h6`
  font-size: 44px;
  margin: 0 11px;
  color: #B78300;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 44px;
  }
`