import styled from "styled-components";
import close from '../../images/close_ico.svg';
import {Box} from '@mui/system';
import {useMediaQuery} from "@material-ui/core";

const TabsStyled = ({ setPartActive, partActive, data, closeTab }) => {
	const mobileMatches = useMediaQuery('(max-width:600px)');
	return (
		<Part>
			{data.map((item, index) => {
				return (
					<Tab key={index} isMobile={mobileMatches} className={(item.id ? item.id === partActive : partActive === index + 1) ? 'active' : ''} onClick={() => setPartActive(item.id ? item.id : index + 1)}>
						<span>{item.label}</span>
						{
							item.close
								?
								<Box component="img"
									src={close}
									onClick={() => closeTab(item.id)}
									sx={{
										position: 'absolute',
										width: (mobileMatches ? '1em' : '1.5em'),
										right: (mobileMatches ? '0px' : '3px'),
										top: (mobileMatches ? '0px' : '3px')
									}}
								/>
								:
								false
						}
					</Tab>
				)
			})}
		</Part>
	)
}

export default TabsStyled;

const Part = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px

`

const Tab = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 20px;
    background: ${({ isMobile }) => isMobile ? 'rgba(183, 131, 0, 0.24)' : 'rgba(183, 131, 0, 0.1)'};
    border-radius: 15px 15px 0 0;
    cursor: pointer;
    &:hover {
      border: 1px solid #B78300;
      border-bottom: 1px solid rgba(183, 131, 0, 0.5);
      font-weight: 800;
      & span{
        font-weight: 800;
      }
    }

    &:hover > span {
        font-weight: 800;
    }
    &.active {
        box-shadow: 5px 0px 0px rgba(0, 0, 0, 0.1);
        background: ${({ isMobile }) => isMobile ? '#FFF8CC' : '#FFF'};
        height: 30px;
        border: 3px solid #FAF0CB;
        border-bottom: 1px solid ${({ isMobile }) => isMobile ? '#FFF8CC' : '#FFF'};
        transform: translateY(4px);
    }
    &.active > span {
        font-weight: 900;
    }
    @media screen and (min-width: 600px) {
      width: 163.24px;
      height: 38px;
      &.active {
        height: 50px;
      }
    }

    span {
      font-family: Raleway;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 98.1%;
      text-transform: uppercase;
      color: #B78300;
      transition: 0.4s;
      text-align: center;
      @media screen and (min-width: 600px) {
        font-size: 16px;
      }
    }
`